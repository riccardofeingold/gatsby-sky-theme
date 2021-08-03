import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/layout'

const BlogPost = ({ data }) => {
  const post = data.ghostPost
  return (
    <Layout pageTitle={post.title}>
      <article className="post">
        {post.feature_image ? (
          <img src={post.feature_image} alt={post.title} />
        ) : null}
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
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