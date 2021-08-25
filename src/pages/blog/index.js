import { graphql } from 'gatsby'
import * as React from 'react'
import Layout from '../../components/layout'
import Card from '../../components/card'

const BlogPage = ( {data} ) => {
  const posts = data.allGhostPost.edges
  return (
    <Layout pageTitle="My Blog Posts">
      <div className="container py-3">
        <h1>Blog</h1>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {
            posts.map(post => (
              <article key={post.node.id}>
                  <Card cardTitle={post.node.title} cardImageSrc={post.node.feature_image} cardLink={`/blog/${post.node.slug}`}/>
                </article>
              ))
            }
        </div>
      </div>
    </Layout>
  )
}

export default BlogPage

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
          feature_image
          published_at_pretty: published_at(formatString: "DD MMMM, YYYY")
        }
      }
    }
  }
`
