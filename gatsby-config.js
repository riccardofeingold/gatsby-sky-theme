
const {
  NODE_ENV,
  URL: NETLIFY_SITE_URL = 'https://www.riccardofeingold.com',
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV,
} = process.env
const isNetlifyProduction = NETLIFY_ENV === 'production'
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL

let ghostConfig

try {
    ghostConfig = require(`./.ghost`)
} catch (e) {
    ghostConfig = {
        production: {
            apiUrl: process.env.GHOST_API_URL,
            contentApiKey: process.env.GHOST_CONTENT_API_KEY,
        },
    }
} finally {
    const { apiUrl, contentApiKey } = process.env.NODE_ENV === `development` ? ghostConfig.development : ghostConfig.production

    if (!apiUrl || !contentApiKey || contentApiKey.match(/<key>/)) {
        throw new Error(`GHOST_API_URL and GHOST_CONTENT_API_KEY are required to build. Check the README.`) // eslint-disable-line
    }
}

module.exports = {
  siteMetadata: {
    siteUrl,
    title: "Riccardo Feingold - Personal Blog",
    titleTemplate: "%s | Riccardo Feingold",
    description: "Welcome to my personal blog. Here you will find posts about tech, music, designing and engineering.",
    url: "https://www.riccardofeingold.com",
    image: "/images/riccardo-cover-image.png",
    twitterUsername: "@riccardorion",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `portfolio`,
        path: `${__dirname}/portfolio`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `projectImages`,
        path: `${__dirname}/portfolio/img`,
      },
    },
    "gatsby-plugin-mdx",
    {
      resolve: "gatsby-remark-images",
      options: {
        // It's important to specify the maxWidth (in pixels) of
        // the content container as this plugin uses this as the
        // base for generating different widths of each image.
        maxWidth: 590,
        wrapperStyle: fluidResult => `flex:${_.round(fluidResult.aspectRatio, 2)};`,
      }
    },
    {
      resolve: `gatsby-transformer-rehype`,
      options: {
        plugins: [
          {
            resolve: `gatsby-rehype-prismjs`,
            options: {
              // All code blocks will be wrapped in an additional <div>
              // containter to allow for better styling. This might break
              // your current theme. You might therefore have to provide
              // additional styling classes (below is just an example).
              divClassNames: "kg-card kg-code-card",
              // Class prefix for <pre> tags containing syntax highlighting;
              // defaults to 'language-' (e.g. <pre class="language-js">).
              // If your site loads Prism into the browser at runtime,
              // (e.g. for use with libraries like react-live),
              // you may use this to prevent Prism from re-processing syntax.
              // This is an uncommon use-case though;
              // If you're unsure, it's best to use the default value.
              classPrefix: "language-",
              // This is used to allow setting a language for inline code
              // (i.e. single backticks) by creating a separator.
              // This separator is a string and will do no white-space
              // stripping.
              // A suggested value for English speakers is the non-ascii
              // character '›'.
              inlineCodeMarker: null,
              // This lets you set up language aliases.  For example,
              // setting this to '{ sh: "bash" }' will let you use
              // the language "sh" which will highlight using the
              // bash highlighter.
              aliases: {},
              // If setting this to false, the parser handles and highlights inline
              // code, i.e. single backtick code like `this`.
              noInlineHighlight: true,
              // By default the HTML entities <>&'" are escaped.
              // Add additional HTML escapes by providing a mapping
              // of HTML entities and their escape value IE: { '}': '&#123;' }
              escapeEntities: {},
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-remark-autolink-headers`],
      },
    },
    {
      resolve: `gatsby-source-ghost`,
      options: process.env.NODE_ENV === `development`
        ? ghostConfig.development
        : ghostConfig.production,
    },
    `gatsby-plugin-sass`,
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint: 'https://riccardofeingold.us7.list-manage.com/subscribe/post?u=e63d61c6a7d796fa055a300b1&amp;id=ad7c75abf1'
      }
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        resolveEnv: () => NETLIFY_ENV,
        env: {
          production: {
            policy: [{ userAgent: '*' }],
          },
          'branch-deploy': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null,
          },
          'deploy-preview': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null,
          },
        },
      },
    },
    {
      resolve: `gatsby-plugin-advanced-sitemap`,
      options: {
        query: `
        {
            allGhostPost {
                edges {
                    node {
                        id
                        slug
                        updated_at
                        feature_image
                    }
                }
            }
            allGhostPage {
                edges {
                    node {
                        id
                        slug
                        updated_at
                        feature_image
                    }
                }
            }
            allGhostTag {
                edges {
                    node {
                        id
                        slug
                        feature_image
                    }
                }
            }
            allGhostAuthor {
                edges {
                    node {
                        id
                        slug
                        profile_image
                    }
                }
            }
        }`,
        mapping: {
          // Each data type can be mapped to a predefined sitemap
          // Routes can be grouped in one of: posts, tags, authors, pages, or a custom name
          // The default sitemap - if none is passed - will be pages
          allGhostPost: {
            sitemap: `posts`,
          },
          allGhostTag: {
            sitemap: `tags`,
          },
          allGhostAuthor: {
            sitemap: `authors`,
          },
          allGhostPage: {
            sitemap: `pages`,
          },
        },
        exclude: [
          `/dev-404-page`,
          `/404`,
          `/404.html`,
          `/offline-plugin-app-shell-fallback`,
          `/thankyou`,
        ],
        createLinkInHead: true, // optional: create a link in the `<head>` of your site
        addUncaughtPages: true, // optional: will fill up pages that are not caught by queries and mapping and list them under `sitemap-pages.xml`
      }
    },
    'gatsby-plugin-offline',
  ],
};
