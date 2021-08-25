import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/layout'
import Card from "../../components/card"

const BlogPost = ({ data }) => {
  const post = data.ghostPost
  const allPosts = data.allGhostPost.edges
  return (
    <Layout pageTitle={post.title}>
      <article className="post">
        <div className="container py-3 post-full-content">
          <h1>{post.title}</h1>
          {post.feature_image ? (
              <img src={post.feature_image} className="img-fluid py-3" alt={post.title}/>
            ) : null}
          <section dangerouslySetInnerHTML={{ __html: post.html }} />

          <hr data-content="OTHER POSTS" className="hr-text"></hr>

          <div className="row row-cols-1 row-cols-md-3 g-4">
              {
                allPosts.map(p => (
                  <article key={p.node.id}>
                    <Card cardTitle={p.node.title} cardImageSrc={p.node.feature_image} cardLink={`/blog/${p.node.slug}`}/>
                  </article>
                ))
              }
            </div>
        </div>
      </article>
    </Layout>
  )
}

export default BlogPost

export const postQuery = graphql`
  query($slug: String) {
    ghostPost(slug: { eq: $slug }) {
      title
      slug
      feature_image
      html
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