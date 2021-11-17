const path = require(`path`)

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
 
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
    author: "Riccardo Orion Feingold",
    keywords: ["tech", "studying", "productivity", "programming", "engineering", "mechanical engineering", "student", "entrpreneurship"],
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          process.env.GOOGLE_ANALYTICS_ID, // Google Analytics / GA
        ],
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true,
        },
      },
    },
    "gatsby-plugin-netlify",
    "gatsby-plugin-image",
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`, `avif`],
          placeholder: `blurred`,
          quality: 50,
          breakpoints: [750, 1080, 1366, 1920],
          backgroundColor: `transparent`,
          tracedSVGOptions: {},
          blurredOptions: {},
          jpgOptions: {},
          pngOptions: {},
          webpOptions: {},
          avifOptions: {},
        },
      },
    },
    "gatsby-transformer-sharp",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
          path: path.join(__dirname, `src`, `pages`),
          name: `pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
          path: path.join(__dirname, `src`, `images`),
          name: `images`,
      },
    },
    {
      resolve: `gatsby-transformer-rehype`,
      options: {
        filter: (node) => node.internal.type === `GhostPost` || node.internal.type === `GhostPage`,
        plugins: [
          {
            resolve: `gatsby-rehype-prismjs`,
          },
        ],
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
        endpoint: process.env.MAILCHIMP_API_URL,
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
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Riccardo Feingold`,
        short_name: `Riccardo`,
        start_url: `/`,
        background_color: `#007bff`,
        theme_color: `#007bff`,
        display: `standalone`,
        icon: `src/images/profile-rect.jpeg`,
      },
    },
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-offline',
  ],
};
