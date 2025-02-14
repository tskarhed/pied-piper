const { parseABCFile } = require('./src/_includes/abcParser.js');

module.exports = function(eleventyConfig){

    eleventyConfig.addPlugin(require("eleventy-plugin-ignore"),
    {
        // template ignored if function returns true
        ignore: (data) =>
          data.ignore ||
          (data.draft && process.env.NODE_ENV === "production"),
        // check all templates ending with these extensions
        templateFormats: ["html", "liquid", "md", "njk", "abc"]
      });

    // Add ABC file support
    eleventyConfig.addTemplateFormats("abc");
    
    eleventyConfig.addExtension("abc", {
        read: true,
        getData: true,
        getInstanceFromInputPath: function(inputPath) {
            // Parse ABC file content
            const content = require('fs').readFileSync(inputPath, 'utf8');
            const abcData = parseABCFile(content);
            console.log('ABC Data for', inputPath, ':', abcData);
            
            return {
                inputPath,
                fileSlug: inputPath.split('/').pop().replace(/\.abc$/, ''),
                data: {
                    layout: 'layouts/abc-template.11ty.js',
                    tags: ['songs'],
                    title: abcData.title || 'Untitled',
                    artist: abcData.composer || 'Unknown',
                    description: `Key: ${abcData.key}, Time: ${abcData.meter}`,
                    abcData: abcData
                },
                template: {
                    frontMatter: {},
                    engine: "11ty.js"
                }
            };
        },
        compile: function(str, inputPath) {
            return function(data) {
                return '';
            };
        }
    });

    eleventyConfig.addPassthroughCopy("src/style.css");

    eleventyConfig.addPassthroughCopy("src/editor/index.js");
    eleventyConfig.addPassthroughCopy("src/editor/editor-bundle-iife.js");
    eleventyConfig.addPassthroughCopy("src/images");


    return {
        dir: {
            input: 'src',
            output: '_site'
        }
    };
}