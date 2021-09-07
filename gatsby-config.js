const {
  NODE_ENV,
  URL: NETLIFY_SITE_URL = 'https://www.riccardofeingold.com',
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV,
} = process.env
const isNetlifyProduction = NETLIFY_ENV === 'production'
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL

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
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-remark-autolink-headers`],
      },
    },
    {
      resolve: `gatsby-source-ghost`,
      options: {
          apiUrl: `http://localhost:2368`,
          contentApiKey: `00413922e03b8210ff9c560c8a`,
          version: `v3` // Ghost API version, optional, defaults to "v3".
                        // Pass in "v2" if your Ghost install is not on 3.0 yet!!!
      }
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
    }
  ],
};
