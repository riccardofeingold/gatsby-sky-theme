import { graphql, Link } from 'gatsby'
import React, {useRef, useState } from 'react'
import Layout from '../../components/layout'
import BlogCard from '../../components/blogcard'
import { StaticImage } from 'gatsby-plugin-image'
import { faSearch } from '@fortawesome/free-solid-svg-icons'



  // const searchField = useRef(null);
  // const [isActive, setActive] = useState("false");

  // const ToggleClass = () => {
  //     searchField.current.value = '';
  //     searchField.current.focus();
  //     setActive(!isActive);
  // }

  // const [state, setState] = useState({
  //     filteredPosts: [],
  //     query: "",
  // });
  
  // const handleInputChange = event => {
  //     const query = event.target.value;
  //     const filteredPosts = allPosts.filter(post => {
  //       const { description, title, tags } = post.node.frontmatter;
  //       return (
  //         description.toLowerCase().includes(query.toLowerCase()) ||
  //         title.toLowerCase().includes(query.toLowerCase()) ||
  //         (tags && tags.join("").toLowerCase().includes(query.toLowerCase()))
  //       );
  //     });
  //     setState({
  //       query,
  //       filteredPosts,
  //     });
  // };
  
  // const posts = state.query ? state.filteredPosts : allPosts;

class BlogPage extends React.Component {
  render() {
    const {data} = this.props
    const posts = data.allGhostPost.edges
  
    // pagination 
    const { currentPage, numPages } = this.props.pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages || numPages == null
    const prevPage = currentPage - 1 === 1 ? "/blog" : (currentPage - 1).toString()
    const nextPage = (currentPage + 1).toString()
    return (
      <Layout pageTitle="My Blog Posts">
        <div className="container-fluid home-section justify-content-center">
          <StaticImage alt="Blog Title Page Image" src="../../images/pages/blogging.png" style={{maxWidth: `300px`, maxHeight: `300px`}} className="mx-auto d-block"/>
          <h1 className="text-light text-center pt-3 pb-4">📝 Blog</h1>
          <h5 className="text-light fw-normal text-center pb-5">I like to blog about the stuff I'm interested in. Hopefully you'll find some of it interesting too.</h5>
        </div>

        {/* <form className="form-inline d-flex position-search-bar" style={{width: `350px`}}>
            <div className={`search ${isActive ? null : `open`}`}>
                <input type="search" className="search-box" aria-label="Search" value={state.query} onChange={handleInputChange} ref={(element) => {
                    searchField.current = element;
                }}></input>
                <span role="searchbox" className="search-button" onClick={ToggleClass} onKeyDown={ToggleClass} tabIndex={0}>
                    <FontAwesomeIcon icon={faSearch} className="search-icon"/>
                </span>
            </div>
        </form> */}

        <div className="container py-3">
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
              <li className="page-item" key={`pagination-number${i + 1}`}>
                <Link className="page-link" to={`/blog/${i === 0 ? "" : i + 1}`}>
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
  query pageQuery($skip: Int, $limit: Int) {
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
