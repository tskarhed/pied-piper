module.exports = function(eleventyConfig){

    eleventyConfig.addPassthroughCopy("src/style.css");

    eleventyConfig.addPassthroughCopy("src/editor/index.js");

    return {
        dir: {
            input: 'src',
            output: '_site'
        }
    };
}