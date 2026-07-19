// Emits schema.org JSON-LD. Built in JS so every field is properly
// JSON-escaped — front matter with quotes can't break the markup.
const SITE = {
    url: "https://www.poorna.dev",
    name: "Poorna's blog",
    logo: "https://res.cloudinary.com/poorna/image/upload/v1640502671/my-blog/poorna%20blog%20image.png",
};

const AUTHOR = {
    "@type": "Person",
    name: "Poornachandra Vivekananda",
    honorificPrefix: "Dr",
    url: SITE.url,
};

// </script> inside a JSON string would end the script element early
const toScript = (jsonLd) =>
    `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>`;

const absolute = (path) => (path.startsWith("http") ? path : SITE.url + path);

module.exports = function (eleventyConfig) {
    // Per-post BlogPosting schema; front matter is passed in explicitly
    // because Liquid shortcodes don't see the data cascade
    eleventyConfig.addShortcode("structuredData", function (title, description, image, keywords) {
        const url = SITE.url + this.page.url;
        const published = this.page.date.toISOString();
        return toScript({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: title,
            description,
            image: image ? absolute(image) : SITE.logo,
            url,
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            datePublished: published,
            dateModified: published,
            keywords,
            author: AUTHOR,
            publisher: AUTHOR,
        });
    });

    // Site-level Blog schema for the homepage
    eleventyConfig.addShortcode("structuredDataSite", function () {
        return toScript({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: SITE.name,
            url: SITE.url,
            image: SITE.logo,
            author: AUTHOR,
        });
    });
};
