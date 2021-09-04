module.exports = {
  siteMetadata: {
    siteUrl: "https://www.riccardofeingold.com",
    title: "riccardofeingold",
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
        endpoint: 'https://riccardofeingold.us7.list-manage.com/subscribe/post?u=e63d61c6a7d796fa055a300b1&amp;id=8202717079'
      }
    }
  ],
};
