import { graphql, Link } from 'gatsby'
import * as React from 'react'
import Layout from '../../components/layout'
import BlogCard from '../../components/blogcard'

class BlogPage extends React.Component {
  render() {
    const {data} = this.props
    const posts = data.allGhostPost.edges

    // pagination 
    const { currentPage, numPages } = this.props.pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? "/blog" : (currentPage - 1).toString()
    const nextPage = (currentPage + 1).toString()

    return (
      <Layout pageTitle="My Blog Posts">
        <div className="container py-3">
          <h1>Blog</h1>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {
              posts.map(post => (
                <article key={post.node.id}>
                    <BlogCard cardTitle={post.node.title} featuredImage={post.node.feature_image} cardLink={`/blog/${post.node.slug}`} cardExcerpt={post.node.excerpt} authorImage={post.node.authors[0].profile_image} authorName={post.node.authors[0].name} published={post.node.published_at_pretty} readingTime={post.node.reading_time}/>
                  </article>
                ))
              }
          </div>

        </div>
        
        {/* Pagination */}
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center pt-5">
            <li className="page-item">
              {!isFirst && (
                <Link to={prevPage} rel="prev" className="page-link">
                  Previous Page
                </Link>
              )}
            </li>
            
            {Array.from({ length: numPages }, (_, i) => (
              <li className="page-item">
                <Link className="page-link" key={`pagination-number${i + 1}`} to={`/blog/${i === 0 ? "" : i + 1}`}>
                  {i + 1}
                </Link>
              </li>
            ))}

            <li className="page-item">
              {!isLast && (
                <Link to={nextPage} rel="next" className="page-link">
                  Next Page
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </Layout>
    )
  }
}

export default BlogPage

export const pageQuery = graphql`
  query pageQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allGhostPost(sort: { fields: [published_at], order: DESC}, limit: $limit, skip: $skip) {
      edges {
        node {
          id
          title
          slug
          excerpt
          feature_image
          reading_time
          published_at_pretty: published_at(formatString: "DD MMMM, YYYY")
          authors {
            profile_image
            name
          }
        }
      }
    }
  }
`
