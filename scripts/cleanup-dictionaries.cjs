const fs = require('fs');
const https = require('https');
const path = require('path');

const URLS = {
    englishCommon: 'https://raw.githubusercontent.com/first20hours/google-10000-english/master/google-10000-english-usa-no-swears.txt',
    frenchCommon: 'https://raw.githubusercontent.com/nachocab/words-by-frequency/master/french.txt',
    names: 'https://raw.githubusercontent.com/dominictarr/random-name/master/first-names.txt',
    namesMale: 'https://raw.githubusercontent.com/arineng/arincli/master/lib/male-first-names.txt',
    namesFemale: 'https://raw.githubusercontent.com/arineng/arincli/master/lib/female-first-names.txt',
    places: 'https://raw.githubusercontent.com/dbouquin/IS_608/master/NanosatDB_munging/countries.csv'
};

const PATHS = {
    englishCommon: path.join(__dirname, '../src/lib/englishCommonWords.ts'),
    frenchCommon: path.join(__dirname, '../src/lib/frenchCommonWords.ts'),
    englishAll: path.join(__dirname, '../src/lib/englishWords.ts'),
    frenchAll: path.join(__dirname, '../src/lib/frenchWords.ts'),
    conundrum: path.join(__dirname, '../src/lib/conundrumWords.ts'),
};

function fetchUrl(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
            res.on('error', reject);
        }).on('error', reject);
    });
}

function parseTsSet(content) {
    const match = content.match(/new Set\(\[\s*([\s\S]*?)\]\);/);
    if (!match) return new Set();
    const rawList = match[1];
    // Remove quotes and handle commas
    const items = rawList.split(',').map(s => s.trim().replace(/^['"`]|['"`]$/g, '')).filter(Boolean);
    return new Set(items);
}

function writeTsFile(filePath, varName, set) {
    const sortedArray = Array.from(set).sort();
    const content = `export const ${varName} = new Set([\n  '${sortedArray.join("',\n  '")}'\n]);\n`;
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Wrote ${sortedArray.length} words to ${filePath}`);
}

async function main() {
    console.log('Downloading lists...');
    const [enCommonRaw, frCommonRaw, namesRaw, namesMaleRaw, namesFemaleRaw, placesRaw] = await Promise.all([
        fetchUrl(URLS.englishCommon),
        fetchUrl(URLS.frenchCommon),
        fetchUrl(URLS.names),
        fetchUrl(URLS.namesMale),
        fetchUrl(URLS.namesFemale),
        fetchUrl(URLS.places)
    ]);

    // Process Blacklist
    const blacklist = new Set();

    // Names
    [namesRaw, namesMaleRaw, namesFemaleRaw].forEach(raw => {
        raw.split('\n').forEach(w => {
            const clean = w.trim().toLowerCase();
            if (clean) blacklist.add(clean);
        });
    });

    // Places (First column of CSV)
    placesRaw.split('\n').forEach(line => {
        const parts = line.split(',');
        if (parts[0]) {
            const clean = parts[0].replace(/"/g, '').trim().toLowerCase();
            if (clean) blacklist.add(clean);
        }
    });

    // Manual blacklist
    ['manitoba', 'ontario', 'quebec', 'alberta', 'saskatchewan', 'yukon', 'nunavut', 'amanda', 'paris', 'london', 'france', 'germany', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december', 'aaa', 'aa', 'ambien'].forEach(w => blacklist.add(w));

    console.log(`Blacklist size: ${blacklist.size}`);

    // LOAD REFERENCE DICTIONARIES FIRST
    console.log('Reading existing dictionary files to use as validators...');
    let enAllSet = new Set();
    let frAllSet = new Set();

    if (fs.existsSync(PATHS.englishAll)) {
        const enAllContent = fs.readFileSync(PATHS.englishAll, 'utf8');
        const parsed = parseTsSet(enAllContent);
        // Filter the reference set itself against the blacklist
        enAllSet = new Set([...parsed].filter(w => !blacklist.has(w.toLowerCase())));
        console.log(`English Reference Dictionary: ${enAllSet.size} words`);
        // We will rewrite this later to ensure it is clean, but we use the CLEAN version for validation
    } else {
        console.warn("WARNING: English All dictionary not found! Cannot validate common words.");
    }

    if (fs.existsSync(PATHS.frenchAll)) {
        const frAllContent = fs.readFileSync(PATHS.frenchAll, 'utf8');
        const parsed = parseTsSet(frAllContent);
        // Filter the reference set itself against the blacklist
        frAllSet = new Set([...parsed].filter(w => !blacklist.has(w.toLowerCase())));
        console.log(`French Reference Dictionary: ${frAllSet.size} words`);
    } else {
        console.warn("WARNING: French All dictionary not found! Cannot validate common words.");
    }

    // Process English Common (Top 10k)
    const enCommon = new Set();
    enCommonRaw.split('\n').forEach(w => {
        const clean = w.trim().toLowerCase();
        // RULE: Must be >= 3 chars, not in blacklist, AND present in the main dictionary
        if (clean.length >= 3 && !blacklist.has(clean)) {
            if (enAllSet.size > 0 && !enAllSet.has(clean)) {
                // Skip words not in the main dictionary
                return;
            }
            enCommon.add(clean);
        }
    });
    console.log(`New English Common Words: ${enCommon.size}`);

    // Process French Common
    const frWords = [];
    frCommonRaw.split('\n').forEach(line => {
        const parts = line.trim().split(/\s+/);
        if (parts.length >= 2) {
            // Assuming format: "count word"
            const count = parseInt(parts[0], 10);
            const word = parts[1].toLowerCase();
            if (!isNaN(count) && word) {
                frWords.push({ word, count });
            }
        } else if (parts.length === 1 && parts[0]) {
            frWords.push({ word: parts[0].toLowerCase(), count: 0 });
        }
    });

    // Sort by count descending
    frWords.sort((a, b) => b.count - a.count);

    // Create a Set of the top 20,000 most common words for Conundrum generation
    // This ensures we only picks "everyday" words for the game puzzles
    const top20kFrench = new Set(frWords.slice(0, 20000).map(x => x.word));

    const frCommon = new Set();
    let frCount = 0;
    for (const { word } of frWords) {
        if (word && word.length >= 3 && !blacklist.has(word) && !/[0-9]/.test(word)) {
            if (frAllSet.size > 0 && !frAllSet.has(word)) {
                // Skip words not in the main dictionary
                continue;
            }
            frCommon.add(word);
            frCount++;
            if (frCount >= 10000) break;
        }
    }
    console.log(`New French Common Words: ${frCommon.size}`);

    // Update Files
    writeTsFile(PATHS.englishCommon, 'ENGLISH_COMMON_WORDS', enCommon);
    writeTsFile(PATHS.frenchCommon, 'FRENCH_COMMON_WORDS', frCommon);

    // Refresh All Words Files (to apply blacklist if it changed)
    writeTsFile(PATHS.englishAll, 'ENGLISH_WORDS', enAllSet);
    writeTsFile(PATHS.frenchAll, 'FRENCH_WORDS', frAllSet);

    // Filter Conundrum Words
    console.log('Filtering Conundrum words...');
    if (fs.existsSync(PATHS.conundrum)) {
        const conundrumContent = fs.readFileSync(PATHS.conundrum, 'utf8');

        // Extract English Conundrums
        const enMatch = conundrumContent.match(/export const ENGLISH_CONUNDRUMS = \[\s*([\s\S]*?)\];/);
        if (enMatch) {
            const enList = enMatch[1].split(',').map(s => s.trim().replace(/^['"`]|['"`]$/g, '')).filter(Boolean);
            const enFiltered = enList.filter(w => !blacklist.has(w.toLowerCase()));
            console.log(`English Conundrums: ${enList.length} -> ${enFiltered.length}`);

            // Generate French Conundrums from the TOP 20k Common Words
            // We want "everyday" words, so we filter the top 20,000 most frequent words.
            const frConundrums = Array.from(top20kFrench).filter(w =>
                w.length === 9 &&
                !blacklist.has(w) &&
                !/[^a-zà-ÿ]/.test(w) // Allow french accents if they exist
            ).sort();

            console.log(`French Conundrums (Generated from Top 20k): ${frConundrums.length}`);

            let newContent = conundrumContent
                .replace(/export const ENGLISH_CONUNDRUMS = \[\s*([\s\S]*?)\];/, `export const ENGLISH_CONUNDRUMS = [\n  '${enFiltered.join("', '")}'\n];`)
                .replace(/export const FRENCH_CONUNDRUMS = \[\s*([\s\S]*?)\];/, `export const FRENCH_CONUNDRUMS = [\n  '${frConundrums.join("', '")}'\n];`);

            fs.writeFileSync(PATHS.conundrum, newContent, 'utf8');
        }
    }

    console.log('Done!');
}

main().catch(console.error);
