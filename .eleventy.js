const htmlmin = require('html-minifier');

module.exports = function(eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);

  // Watch our compiled assets for changes
  eleventyConfig.addWatchTarget('./src/compiled-assets/main.css');
  eleventyConfig.addWatchTarget('./src/compiled-assets/main.js');

  // Copy src/compiled-assets to /assets
  eleventyConfig.addPassthroughCopy({ 'src/compiled-assets': 'assets' });
  // Copy all
  eleventyConfig.addPassthroughCopy('src/images');

  if (process.env.ELEVENTY_ENV === 'production') {
    eleventyConfig.addTransform('htmlmin', (content, outputPath) => {
      if (outputPath.endsWith('.html')) {
        const minified = htmlmin.minify(content, {
          collapseInlineTagWhitespace: false,
          collapseWhitespace: true,
          removeComments: true,
          sortClassName: true,
          useShortDoctype: true,
        });

        return minified;
      }

      return content;
    });
  }

  return {
    dir: {
      includes: '_components',
      input: 'src',
      layouts: '_layouts',
      output: 'dist',
    },
    markdownTemplateEngine: 'ejs',
    templateFormats: [
      'ejs',
      'md',
    ],
  };
};
