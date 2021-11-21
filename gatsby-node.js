const path = require(`path`)
const _ = require("lodash")
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

exports.onCreateNode = async ({
  node,
  actions,
  store,
  createNodeId,
  cache
}) => {
  // Check that we are modifying right node types.
  const nodeTypes = [`GhostPost`, `GhostPage`, `GhostAuthor`, `GhostTag`];
  if (!nodeTypes.includes(node.internal.type)) {
      return;
  }
  
  const { createNode } = actions;

  // Download image and create a File node with gatsby-transformer-sharp.
  if (node.internal.type === `GhostAuthor`) {
    const fileNode = await createRemoteFileNode({
        url: node.profile_image,
        store,
        cache,
        createNode,
        parentNodeId: node.id,
        createNodeId
    });
    
    if (fileNode) {
      // Link File node to GhostPost node at field image.
      node.localProfileImage___NODE = fileNode.id;
    }
  } else {
    const fileNode = await createRemoteFileNode({
        url: node.feature_image,
        store,
        cache,
        createNode,
        parentNodeId: node.id,
        createNodeId
    });
    
    if (fileNode) {
      // Link File node to GhostPost node at field image.
      node.localFeatureImage___NODE = fileNode.id;
    }
  }
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const postTemplate = path.resolve(`./src/templates/post.js`)
  const tagTemplate = path.resolve("./src/templates/tags.js")

  // Query Ghost data
  const result = await graphql(`
    {
      posts: allGhostPost(sort: { order: ASC, fields: published_at }) {
        edges {
          node {
            slug
          }
        }
      }
      tags: allGhostTag {
        edges {
          node {
            slug
            name
            feature_image
            localFeatureImage {
              childImageSharp {
                gatsbyImageData(
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
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
        image: node.localFeatureImage,
      },
    })
  })
}