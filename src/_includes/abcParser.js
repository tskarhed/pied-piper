const { noteStringToHTML } = require('./noteMap.js');

function formatNotes(abcNotes) {
    // Just normalize whitespace and preserve line breaks
    return abcNotes
        .split('\n')
        .map(line => line.trim())
        .filter(line => line)  // Remove empty lines
        .join('\n');
}

function escapeString(str) {
    return str.replace(/"/g, '\\"');
}

function parseABCFile(content) {
    // Initialize default metadata
    let metadata = {
        title: '',
        composer: '',
        key: 'D',
        meter: '4/4',
        tempo: '180',
        noteLength: '1/4',  // Default note length
        notes: ''
    };
    
    // Split content into lines
    const lines = content.split('\n');
    let inHeader = true;
    let notesContent = [];
    let titles = [];  // Array to collect all titles
    
    // Process each line
    for (const line of lines) {
        if (inHeader && line.startsWith('X:')) {
            continue; // Skip reference number
        } else if (inHeader && line.startsWith('T:')) {
            titles.push(line.substring(2).trim());  // Collect all titles
        } else if (inHeader && line.startsWith('C:')) {
            metadata.composer = line.substring(2).trim();
        } else if (inHeader && line.startsWith('M:')) {
            metadata.meter = line.substring(2).trim();
        } else if (inHeader && line.startsWith('L:')) {
            metadata.noteLength = line.substring(2).trim();
        } else if (inHeader && line.startsWith('Q:')) {
            // Parse tempo, ensuring it's a clean number
            const tempoValue = line.substring(2).trim();
            metadata.tempo = tempoValue.split('=').pop().trim(); // Handle cases like "Q: 1/4=180"
            if (!metadata.tempo.match(/^\d+$/)) {
                metadata.tempo = '180'; // Default if not a clean number
            }
        } else if (inHeader && line.startsWith('K:')) {
            metadata.key = line.substring(2).trim();
            inHeader = false; // End of header section
        } else if (!inHeader && line.trim()) {
            notesContent.push(line.trim());
        }
    }
    
    // Join titles with newlines
    metadata.title = titles.join('\n');
    
    // Join and format notes content
    metadata.notes = formatNotes(notesContent.join(' '));
    
    // Escape all strings
    metadata.title = escapeString(metadata.title);
    metadata.composer = escapeString(metadata.composer);
    metadata.key = escapeString(metadata.key);
    metadata.meter = escapeString(metadata.meter);
    metadata.notes = escapeString(metadata.notes);
    
    console.log('Formatted notes:', metadata.notes);
    
    return metadata;
}

module.exports = {
    parseABCFile
}; 