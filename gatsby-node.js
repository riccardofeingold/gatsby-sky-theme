const path = require(`path`)
const _ = require("lodash")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const postTemplate = path.resolve(`./src/templates/post.js`)
  const projectTemplate = path.resolve(`./src/templates/project.js`)
  const tagTemplate = path.resolve("./src/templates/tags.js")

  // Query Ghost data
  const result = await graphql(`
    {
      posts: allGhostPost(sort: { order: ASC, fields: published_at }, filter: {tags: {elemMatch: {slug: {ne: "portfolio"}}}}) {
        edges {
          node {
            slug
          }
        }
      }
      projects: allGhostPost(sort: { order: ASC, fields: published_at }, filter: {tags: {elemMatch: {slug: {eq: "portfolio"}}}}) {
        edges {
          node {
            slug
          }
        }
      }
      tags: allGhostTag(filter: {slug: {ne: "portfolio"}}) {
        edges {
          node {
            slug
            name
            feature_image
            description
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  if (!result.data.projects) {
    return
  }

  if (!result.data.posts) {
    return
  }

  if (!result.data.tags) {
    return
  }  


  // Create pages for each Ghost post
  const items = result.data.posts.edges
  items.forEach(({ node }) => {
    node.url = `/blog/${node.slug}/`

    actions.createPage({
      path: node.url,
      component: postTemplate,
      context: {
        slug: node.slug,
      },
    })
  })

  //create pages for each project
  const projectItems = result.data.projects.edges
  projectItems.forEach(({ node }) => {
    node.url = `/portfolio/${node.slug}/`

    actions.createPage({
      path: node.url,
      component: projectTemplate,
      context: {
        slug: node.slug,
      }
    })
  })

  // Extract tag data from query
  const tags = result.data.tags.edges
  tags.forEach(({ node }) => {
    actions.createPage({
      path: `/${_.kebabCase(node.slug)}/`,
      component: tagTemplate,
      context: {
        slug: node.slug,
        name: node.name,
        description: node.description,
        image: node.feature_image,
      },
    })
  })
}