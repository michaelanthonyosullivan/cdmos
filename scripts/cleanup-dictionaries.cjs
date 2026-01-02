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
    ['manitoba', 'ontario', 'quebec', 'alberta', 'saskatchewan', 'yukon', 'nunavut', 'amanda', 'paris', 'london', 'france', 'germany', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december', 'aaa', 'aa'].forEach(w => blacklist.add(w));

    console.log(`Blacklist size: ${blacklist.size}`);
    console.log(`Blacklist contains 'aaron'? ${blacklist.has('aaron')}`);

    // Process English Common (Top 10k)
    const enCommon = new Set();
    enCommonRaw.split('\n').forEach(w => {
        const clean = w.trim().toLowerCase();
        if (clean.length >= 3 && !blacklist.has(clean)) {
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
    console.log(`Top French word: ${frWords[0]?.word} (${frWords[0]?.count})`);

    const frCommon = new Set();
    let frCount = 0;
    for (const { word } of frWords) {
        if (word && word.length >= 3 && !blacklist.has(word) && !/[0-9]/.test(word)) {
            frCommon.add(word);
            frCount++;
            if (frCount >= 10000) break;
        }
    }
    console.log(`New French Common Words: ${frCommon.size}`);

    // Update Files
    writeTsFile(PATHS.englishCommon, 'ENGLISH_COMMON_WORDS', enCommon);
    writeTsFile(PATHS.frenchCommon, 'FRENCH_COMMON_WORDS', frCommon);

    // Filter All Words
    console.log('Reading existing dictionary files...');

    if (fs.existsSync(PATHS.englishAll)) {
        const enAllContent = fs.readFileSync(PATHS.englishAll, 'utf8');
        const enAll = parseTsSet(enAllContent);
        const enAllFiltered = new Set([...enAll].filter(w => !blacklist.has(w.toLowerCase())));
        console.log(`English All: ${enAll.size} -> ${enAllFiltered.size}`);
        writeTsFile(PATHS.englishAll, 'ENGLISH_WORDS', enAllFiltered);
    }

    if (fs.existsSync(PATHS.frenchAll)) {
        const frAllContent = fs.readFileSync(PATHS.frenchAll, 'utf8');
        const frAll = parseTsSet(frAllContent);
        const frAllFiltered = new Set([...frAll].filter(w => !blacklist.has(w.toLowerCase())));
        console.log(`French All: ${frAll.size} -> ${frAllFiltered.size}`);
        writeTsFile(PATHS.frenchAll, 'FRENCH_WORDS', frAllFiltered);
    }

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

            // Extract French Conundrums
            const frMatch = conundrumContent.match(/export const FRENCH_CONUNDRUMS = \[\s*([\s\S]*?)\];/);
            let frList = [];
            if (frMatch) {
                frList = frMatch[1].split(',').map(s => s.trim().replace(/^['"`]|['"`]$/g, '')).filter(Boolean);
            }
            const frFiltered = frList.filter(w => !blacklist.has(w.toLowerCase()));
            console.log(`French Conundrums: ${frList.length} -> ${frFiltered.length}`);

            let newContent = conundrumContent
                .replace(/export const ENGLISH_CONUNDRUMS = \[\s*([\s\S]*?)\];/, `export const ENGLISH_CONUNDRUMS = [\n  '${enFiltered.join("', '")}'\n];`)
                .replace(/export const FRENCH_CONUNDRUMS = \[\s*([\s\S]*?)\];/, `export const FRENCH_CONUNDRUMS = [\n  '${frFiltered.join("', '")}'\n];`);

            fs.writeFileSync(PATHS.conundrum, newContent, 'utf8');
        }
    }

    console.log('Done!');
}

main().catch(console.error);
