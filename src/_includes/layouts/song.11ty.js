const { noteStringToHTML } = require('../noteMap');

exports.data = {
    layout: 'base.njk'
};

exports.render = function render(data){
    const noteHTML = noteStringToHTML(data.notes);

    return `
        <h1>${data.title}</h1>
        <p>${data.description}</p>
        ${noteHTML}
    `
};