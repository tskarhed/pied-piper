const simpleAbcRegex = /(?:[\^_]?[a-gA-G]|\|)/g;
const simpleAbcNoteMap = {
    //0-open, 1 half note, 2 covered. Last in array is octave
    "D":    [2, 2, 2, 2, 2, 2 ],
    "^D":    [2, 2, 2, 2, 2, 1 ],
    "_E":    [2, 2, 2, 2, 2, 1 ],
    "E":    [2, 2, 2, 2, 2, 0],
    "F":    [2, 2, 2, 2, 0, 0 ],// F is usually interpreted as F# in the key of D
    "^F":   [2, 2, 2, 2, 0, 0],
    "_G":   [2, 2, 2, 2, 0, 0],
    "G":    [2, 2, 2, 0, 0, 0],
    "^G":    [2, 2, 1, 0, 0, 0],
    "_A":    [2, 2, 1, 0, 0, 0],
    "A":    [2, 2, 0, 0, 0, 0],
    "^A":    [2, 1, 0, 0, 0, 0],
    "_B":    [2, 1, 0, 0, 0, 0],
    "B":    [2, 0, 0, 0, 0, 0],
    "C":    [0, 2, 2, 0, 0, 0],
    "^C":   [0, 0, 0, 0, 0, 0],
    "d":    [0, 2, 2, 2, 2, 2, '+'],
    "^d":    [2, 2, 2, 2, 2, 1, '+' ],
    "_e":    [2, 2, 2, 2, 2, 1, '+' ],
    "e":    [2, 2, 2, 2, 2, 0, '+'],
    "f":    [2, 2, 2, 2, 0, 0, '+' ], // F is usually interpreted as F# in the key of D
    "^f":   [2, 2, 2, 2, 0, 0, '+'],
    "_g":   [2, 2, 2, 2, 0, 0, '+'],
    "g":    [2, 2, 2, 0, 0, 0, '+'],
    "^g":    [2, 2, 1, 0, 0, 0, '+'],
    "_a":    [2, 2, 1, 0, 0, 0, '+'],
    "a":    [2, 2, 0, 0, 0, 0, '+'],
    "^a":    [2, 1, 0, 0, 0, 0, '+'],
    "_b":    [2, 1, 0, 0, 0, 0, '+'],
    "b":    [2, 0, 0, 0, 0, 0, '+'],
    "c":    [0, 2, 2, 0, 0, 0, '+'],
    "^c":   [0, 0, 0, 0, 0, 0, '+'],
};



function abcToHoles(abcNotes){
    console.log('Processing notes:', abcNotes);
    if (!abcNotes) {
        console.error('No notes provided to abcToHoles');
        return [[], []];
    }
    const songHoles = [];
    const notes = abcNotes.match(simpleAbcRegex) || [];
    console.log('Matched notes:', notes);
    notes.forEach(function(note){
        if(note==='|'){
            songHoles.push("SPACE");
        }
        const holeMap = simpleAbcNoteMap[note.trim()];
        if(holeMap){
            songHoles.push(holeMap);
        }
        // Ignore input if no cases match
    });


    return [songHoles,notes];
}




function renderFluteElement(noteMap){
    if(noteMap === "SPACE"){
        return [];
    }
    return noteMap.map(function(holeState){
        switch(holeState){
            case 0:
                return `<div class="open"></div>`;
            case 1:
                return `<div class="half covered"></div>`;
            case 2:
                return `<div class="covered"></div>`;
            case '+':
                return `<div class="plus">+</div>`;
        }
    })
}



function noteStringToHTML(noteString){
    console.log('Converting to HTML:', noteString);
    if (!noteString) {
        console.error('No note string provided to noteStringToHTML');
        return '';
    }
    const [holeMap, notes] = abcToHoles(noteString);
    const fluteElements = [];
    holeMap.forEach(function(holes, i){
        let space = holes.indexOf("SPACE") != -1;

        if(holes === "NEWLINE"){
            fluteElements.push(`<div class="break"><hr/></div>`);
        } else {
            fluteElements.push(`<div class="note ${space ? "space" : ""}" aria-label="${notes[i]} note">${renderFluteElement(holes).join('')}</div>`);  
        }
    });

    return fluteElements.join('');
}

module.exports = {
    noteStringToHTML,
    simpleAbcNoteMap
};