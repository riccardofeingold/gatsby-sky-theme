import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/layout'
import BlogCard from "../../components/blogcard"

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
        </div>

        <aside className="read-more-wrap py-3">
          <h2 className="text-light text-center py-3">Sign up for more like this.</h2>

          <div className="container">
            <div class="input-group mb-3 inner" style={{maxWidth: `500px`}}>
              <input type="text" class="form-control" placeholder="Email Address" aria-label="Email Address" aria-describedby="button-addon2"/>
              <button class="btn btn-primary" type="button" id="button-addon2">Button</button>
            </div>
          </div>

          <div className="row row-cols-1 row-cols-md-3 g-4 inner">
            {
              allPosts.slice(0,3).map(p => (
                <article key={p.node.id}>
                  <BlogCard cardTitle={p.node.title} featuredImage={p.node.feature_image} cardLink={`/blog/${p.node.slug}`} cardExcerpt={p.node.excerpt} authorImage={p.node.authors[0].profile_image} authorName={p.node.authors[0].name} published={p.node.published_at_pretty} readingTime={p.node.reading_time}/>
                </article>
              ))
            }
          </div>
        </aside>
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
    allGhostPost(sort: { fields: [published_at], order: DESC }, filter: { slug: { ne: $slug } }) {
      edges {
        node {
          authors {
            profile_image
            name
          }
          id
          title
          slug
          excerpt
          feature_image
          reading_time
          published_at_pretty: published_at(formatString: "DD MMMM, YYYY")
        }
      }
    }
  }
`