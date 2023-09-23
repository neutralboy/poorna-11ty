const htmlmin = require("html-minifier");

module.exports = function (eleventyConfig) {

  eleventyConfig.addTransform("htmlmin", function(content) {
    if( this.page.outputPath && this.page.outputPath.endsWith(".html") ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }
    return content;
  });

  eleventyConfig.addPassthroughCopy({ "public": "public" });

  eleventyConfig.addFilter("toLocaleString", function(date) {
    const dateString = new Date(date);
    const options = { month: 'long', year: 'numeric' };
    return dateString.toLocaleDateString('en-US', options);
  });

  eleventyConfig.addCollection("blogPosts", (api) => {
    // console.log(api.getAll().filter(p => p.data.layout === "post.html"))
    return api.getAll().filter(p => p.data.layout === "post.html").sort((post1, post2) =>
    (post1.data.date > post2.data.date ? -1 : 1)
    ) ;
  });

  // Eleventy configuration to generate sitemap.xml
  eleventyConfig.addPlugin(require("@quasibit/eleventy-plugin-sitemap"), {
    sitemap: {
      hostname: "https://www.poorna.dev",
    }
  })

};