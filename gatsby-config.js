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
        name: `blog`,
        path: `${__dirname}/blog`,
      },
    }
  ],
};
