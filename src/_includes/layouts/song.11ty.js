const noteHoles = {
    //0-open, 1 half note, 2 covered. Last in array is octave
    "d":    [2, 2, 2, 2, 2, 2 ],
    "e":    [2, 2, 2, 2, 2, 0],
    "f#":   [2, 2, 2, 2, 0, 0],
    "g":    [2, 2, 2, 0, 0, 0],
    "a":    [2, 2, 0, 0, 0, 0],
    "b":    [2, 0, 0, 0, 0, 0],
    "c#":   [0, 0, 0, 0, 0, 0],
    "D":    [0, 2, 2, 2, 2, 2, '+'],
    "E":    [2, 2, 2, 2, 2, 0, '+'],
    "F#":   [2, 2, 2, 2, 0, 0, '+'],
    "G":    [2, 2, 2, 0, 0, 0, '+'],
    "A":    [2, 2, 0, 0, 0, 0, '+'],
    "B":    [2, 0, 0, 0, 0, 0, '+'],
    "C#":   [0, 0, 0, 0, 0, 0, '+']
};

function csvToHoles(csvNotes){
    const songHoles = [];
    const notes = csvNotes.split(',');

    notes.forEach(function(note){
        if(note==='\n'){
            songHoles.push("NEWLINE");
        } else if (note===' ') {
            songHoles.push("SPACE");
        }
        const holeMap = noteHoles[note.trim()];
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
    if(noteMap === "NEWLINE"){
        return []; //TODO
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
    const [holeMap, notes] = csvToHoles(noteString);
    const fluteElements = [];
    holeMap.forEach(function(holes, i){
        let space = holes.indexOf("SPACE") != -1;
        fluteElements.push(`<div class="note ${space ? "space" : ""}" aria-label="${notes[i]} note">${renderFluteElement(holes).join('')}</div>`);  
    });

    return fluteElements.join('');
}

exports.data = {
    layout: 'base.njk'
};

exports.render = function(data){
    const noteHTML = noteStringToHTML(data.notes);
    return `
        <h1>${data.title}</h1>
        <p>${data.description}</p>
        ${noteHTML}
    `
}