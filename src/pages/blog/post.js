import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/layout'

const BlogPost = ({ data }) => {
  const post = data.ghostPost
  return (
    <Layout pageTitle={post.title}>
      <article className="post">
        <div className="container pt-3 post-full-content">
          <h1>{post.title}</h1>
          {post.feature_image ? (
              <img src={post.feature_image} className="img-fluid py-3" alt={post.title}/>
            ) : null}
          <section dangerouslySetInnerHTML={{ __html: post.html }} />
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
  }
`