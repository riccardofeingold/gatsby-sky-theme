import { graphql, Link } from 'gatsby'
import * as React from 'react'
import Layout from '../../components/layout'

const BlogPage = ( {data} ) => {
  const posts = data.allGhostPost.edges
  return (
    <Layout pageTitle="My Blog Posts">
      <ul>
      {
          posts.map(post => (
              <article key={post.node.id}>
                  <h2>
                    <Link to={`/blog/${post.node.slug}`}>
                      {post.node.title}
                    </Link>
                  </h2>
                  <h4>{post.node.published_at_pretty}</h4>
              </article>
          ))
      }
      </ul>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allGhostPost(sort: { fields: [published_at], order: DESC }) {
      edges {
        node {
          id
          title
          slug
          excerpt
          published_at_pretty: published_at(formatString: "DD MMMM, YYYY")
        }
      }
    }
  }
`

export default BlogPage