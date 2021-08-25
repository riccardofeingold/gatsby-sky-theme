const path = require(`path`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const postTemplate = path.resolve(`./src/pages/blog/post.js`)
  const projectTemplate = path.resolve(`./src/pages/portfolio/project.js`)

  // Query Ghost data
  const result = await graphql(`
    {
      allGhostPost(sort: { order: ASC, fields: published_at }) {
        edges {
          node {
            slug
          }
        }
      }
      allMdx {
        edges {
          node {
            frontmatter {
              title
              featuredImage {
                publicURL
              }
            }
            id
            slug
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

  if (!result.data.allGhostPost) {
    return
  }

  if (!result.data.allMdx) {
    return
  }

  // Create pages for each Ghost post
  const items = result.data.allGhostPost.edges
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
  const projectItems = result.data.allMdx.edges
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
}