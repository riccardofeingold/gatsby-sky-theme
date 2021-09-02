const path = require(`path`)
const _ = require("lodash")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const postTemplate = path.resolve(`./src/pages/blog/post.js`)
  const projectTemplate = path.resolve(`./src/pages/portfolio/project.js`)
  const tagTemplate = path.resolve("./src/templates/tags.js")

  // Query Ghost data
  const result = await graphql(`
    {
      allGhostPost(sort: { order: ASC, fields: published_at }) {
        edges {
          node {
            slug
          }
        }
        group(field: tags___slug) {
          fieldValue
          nodes {
            tags {
              name
              feature_image
              description
            }
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

  // Extract tag data from query
  const tags = result.data.allGhostPost.group

  // Make tag pages
  tags.forEach(tag => {
    actions.createPage({
      path: `/${_.kebabCase(tag.fieldValue)}/`,
      component: tagTemplate,
      context: {
        slug: tag.fieldValue,
        name: tag.nodes.length ? tag.nodes[0].tags[0].name : "No Posts for this tag!",
        description: tag.nodes.length ? tag.nodes[0].tags[0].description : "",
        image: tag.nodes.length ? tag.nodes[0].tags[0].feature_image : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flickr.com%2Fphotos%2Fwingedwolf%2F5471047557&psig=AOvVaw31MJdMToBgk72NXGoIC9RW&ust=1630700299917000&source=images&cd=vfe&ved=0CAkQjRxqFwoTCKj0qJWO4fICFQAAAAAdAAAAABAD",
      },
    })
  })
}