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

  // create project list pages
  const projects = result.data.allMdx.edges
  const projectPerPage = 6
  const numProjectPages = Math.ceil(projects.length / projectPerPage)
  Array.from({ length: numProjectPages }).forEach((_, i) => {
    actions.createPage({
      path: i === 0 ? `/portfolio` : `/portfolio/${i + 1}`,
      component: path.resolve("./src/pages/portfolio/portfolio-list.js"),
      context: {
        limit: projectPerPage,
        skip: i * projectPerPage,
        numProjectPages,
        currentPage: i + 1,
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