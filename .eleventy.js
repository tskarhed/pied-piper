

module.exports = function(eleventyConfig){

    eleventyConfig.addPlugin(require("eleventy-plugin-ignore"),
    {
        // template ignored if function returns true
        ignore: (data) =>
          data.ignore ||
          (data.draft && process.env.NODE_ENV === "production"),
        // check all templates ending with these extensions
        templateFormats: ["html", "liquid", "md", "njk"]
      });

    eleventyConfig.addPassthroughCopy("src/style.css");

    eleventyConfig.addPassthroughCopy("src/editor/index.js");
    eleventyConfig.addPassthroughCopy("src/images");


    return {
        dir: {
            input: 'src',
            output: '_site'
        }
    };
}