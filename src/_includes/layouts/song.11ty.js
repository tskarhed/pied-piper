const { noteStringToHTML } = require('../noteMap');

exports.data = {
    layout: 'base.njk'
};

exports.render = function render(data){
    const noteHTML = noteStringToHTML(data.notes);
    const youtubeEmbed = data.youtube ? `<div class="youtube-embed">
    <iframe width="560" height="315"
        src="${data.youtube}"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe></div>` : "";
        

    return `
        <h1>${data.title}</h1>
        <p>${data.description}</p>
        ${youtubeEmbed}
        ${noteHTML}
    `
};