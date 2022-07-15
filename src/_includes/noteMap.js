const noteMap = {
    //0-open, 1 half note, 2 covered. Last in array is octave
    "d":    [2, 2, 2, 2, 2, 2 ],
    "d#":    [2, 2, 2, 2, 2, 1 ],
    "eb":    [2, 2, 2, 2, 2, 1 ],
    "e":    [2, 2, 2, 2, 2, 0],
    "f":    [2, 2, 2, 2, 1, 0 ],
    "f#":   [2, 2, 2, 2, 0, 0],
    "gb":   [2, 2, 2, 2, 0, 0],
    "g":    [2, 2, 2, 0, 0, 0],
    "g#":    [2, 2, 1, 0, 0, 0],
    "ab":    [2, 2, 1, 0, 0, 0],
    "a":    [2, 2, 0, 0, 0, 0],
    "a#":    [2, 1, 0, 0, 0, 0],
    "bb":    [2, 1, 0, 0, 0, 0],
    "b":    [2, 0, 0, 0, 0, 0],
    "c":    [0, 2, 2, 0, 0, 0],
    "c#":   [0, 0, 0, 0, 0, 0],
    "D":    [0, 2, 2, 2, 2, 2, '+'],
    "D#":    [2, 2, 2, 2, 2, 1, '+' ],
    "Eb":    [2, 2, 2, 2, 2, 1, '+' ],
    "E":    [2, 2, 2, 2, 2, 0, '+'],
    "F":    [2, 2, 2, 2, 1, 0, '+' ],
    "F#":   [2, 2, 2, 2, 0, 0, '+'],
    "Gb":   [2, 2, 2, 2, 0, 0, '+'],
    "G":    [2, 2, 2, 0, 0, 0, '+'],
    "G#":    [2, 2, 1, 0, 0, 0, '+'],
    "Ab":    [2, 2, 1, 0, 0, 0, '+'],
    "A":    [2, 2, 0, 0, 0, 0, '+'],
    "A#":    [2, 1, 0, 0, 0, 0, '+'],
    "Bb":    [2, 1, 0, 0, 0, 0, '+'],
    "B":    [2, 0, 0, 0, 0, 0, '+'],
    "C":    [0, 2, 2, 0, 0, 0, '+'],
    "C#":   [0, 0, 0, 0, 0, 0, '+'],
};


function csvToHoles(csvNotes){
    const songHoles = [];
    const notes = csvNotes.split(',');

    notes.forEach(function(note){
        if(note==='Enter'){
            songHoles.push("NEWLINE");
        } else if (note===' ') {
            songHoles.push("SPACE");
        }
        const holeMap = noteMap[note.trim()];
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

function renderAllNotes(onClick){
    
}

function noteStringToHTML(noteString){
    const [holeMap, notes] = csvToHoles(noteString);
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
    noteMap
};