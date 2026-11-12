const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '..', 'docs');
const dataDir = path.join(__dirname, '..', 'src', 'palladium_docs');

const startRegex = /<!--\s*PALLADIUM_LIST_START\s+type="([^"]+)"\s+heading="([^"]+)"(?:\s+showFullPowerExamples="([^"]+)")?\s*-->/g;
const endRegex = /<!--\s*PALLADIUM_LIST_END\s*-->/g;

function typeToString(type) {
    if (typeof type === 'string') {
        return type;
    } else if (type && type.type === 'enum') {
        return type.values.join(' | ');
    } else if (type && type.type === 'combined') {
        return type.options.map(typeToString).join(' | ');
    } else if (type && type.name) {
        return type.name;
    }
    return '';
}

function typeBadge(type) {
    const text = typeToString(type).replace(/[<>{}]/g, '');
    return text ? ` <span className="badge badge--primary type-badge" title="Returns ${text}">${text}</span>` : '';
}

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;
    let newContent = '';
    let lastIndex = 0;

    let match;
    startRegex.lastIndex = 0;

    while ((match = startRegex.exec(content)) !== null) {
        hasChanges = true;
        const type = match[1];
        const headingLevel = match[2] || 'h3';
        const showFullPowerExamples = match[3] || 'false';
        const startTagIndex = match.index;
        const startTagLength = match[0].length;

        endRegex.lastIndex = startTagIndex;
        const endMatch = endRegex.exec(content);
        if (!endMatch) {
            console.error(`Missing END tag for START tag in ${filePath}`);
            continue;
        }

        const endTagIndex = endMatch.index;
        const headingStr = '#'.repeat(parseInt(headingLevel.replace('h', '')));

        let generatedContent = `\n`;
        const jsonPath = path.join(dataDir, `${type}.json`);

        if (fs.existsSync(jsonPath)) {
            try {
                const items = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
                items.sort((a, b) => a.name.localeCompare(b.name)).forEach(item => {
                    const anchor = `${item.namespace}:${item.path}`.replace(/[:]/g, '');
                    generatedContent += `${headingStr} ${item.name}${item.returns ? typeBadge(item.returns) : ''} {#${anchor}}\n`;
                    generatedContent += `<PalladiumObjectViewer data={require('@site/src/palladium_docs/${type}.json').find(x => x.namespace === '${item.namespace}' && x.path === '${item.path}')} heading={'${headingLevel}'} showFullPowerExamples={${showFullPowerExamples}}/>\n\n`;
                    generatedContent += `<hr/>\n\n`;
                });
            } catch (e) {
                console.error(`Error parsing JSON ${jsonPath}:`, e);
            }
        } else {
            console.error(`Data file not found: ${jsonPath}`);
        }

        newContent += content.substring(lastIndex, startTagIndex + startTagLength);
        newContent += generatedContent;
        lastIndex = endTagIndex;
    }

    if (hasChanges) {
        newContent += content.substring(lastIndex);
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Processed: ${filePath}`);
    }
}

function processDirectory(directory) {
    const files = fs.readdirSync(directory);
    files.forEach(file => {
        const fullPath = path.join(directory, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.md') || fullPath.endsWith('.mdx')) {
            processFile(fullPath);
        }
    });
}

console.log('Generating static MDX content from Palladium data...');
processDirectory(docsDir);
console.log('Done!');
