import { graphql } from 'gatsby'
import React, {useRef, useState, useEffect } from 'react'
import Layout from '../../components/layout'
import BlogCard from '../../components/blogcard'
import { StaticImage } from 'gatsby-plugin-image'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const BlogPage = ({data}) => {
  const allPosts = data.allGhostPost.edges

  // search ability
  const searchField = useRef(null);
  const [isActive, setActive] = useState("false");

  const ToggleClass = () => {
      searchField.current.value = '';
      searchField.current.focus();
      setActive(!isActive);
  }

  const [state, setState] = useState({
      filteredPosts: [],
      query: "",
  });

  const handleInputChange = event => {
      const query = event.target.value;
      const filteredPosts = allPosts.filter(post => {
        const { title, tags } = post.node;
        return (
          title.toLowerCase().includes(query.toLowerCase()) ||
          (tags && tags.join("").toLowerCase().includes(query.toLowerCase()))
        );
      });
      setState({
        query,
        filteredPosts,
      });
  };

  const posts = state.query ? state.filteredPosts : allPosts;

  // infinite scroll
  // State for the list
  const [list, setList] = useState([...posts.slice(0, 10)])

  // State to trigger load more
  const [loadMore, setLoadMore] = useState(false)

  // State of whether there is more to load
  const [hasMore, setHasMore] = useState(posts.length > 10)

  //Set a ref for the loading div
  const loadRef = useRef()

  // Handle intersection with load more div
  const handleObserver = (entities) => {
    const target = entities[0]
    if (target.isIntersecting) {
      setLoadMore(true)
    }
  }

  //Initialize the intersection observer API
  useEffect(() => {
    var options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    }
    const observer = new IntersectionObserver(handleObserver, options)
    if (loadRef.current) {
      observer.observe(loadRef.current)
    }
  }, [])

  // Handle loading more articles
  useEffect(() => {
    if (loadMore && hasMore) {
      const currentLength = list.length
      const isMore = currentLength < posts.length
      const nextResults = isMore
        ? posts.slice(currentLength, currentLength + 10)
        : []
      setList([...list, ...nextResults])
      setLoadMore(false)
    }
  }, [loadMore, hasMore]) //eslint-disable-line

  //Check if there is more
  useEffect(() => {
    const isMore = list.length < posts.length
    setHasMore(isMore)
  }, [list]) //eslint-disable-line

  return (
    <Layout pageTitle="My Blog Posts">
      <div className="container-fluid home-section justify-content-center">
        <StaticImage alt="Blog Title Page Image" src="../../images/pages/blogging.png" style={{maxWidth: `300px`, maxHeight: `300px`}} className="mx-auto d-block"/>
        <h1 className="text-light text-center pt-3 pb-4">📝 Blog</h1>
        <h5 className="text-light fw-normal text-center pb-5">I like to blog about the stuff I'm interested in. Hopefully you'll find some of it interesting too.</h5>
      </div>

      <div className="d-flex justify-content-center py-2">
        <form className="form-inline d-flex position-search-bar justify-content-center" style={{width: `350px`}}>
            <div className={`search ${isActive ? null : `open`}`}>
                <input type="search" className="search-box" placeholder="Search Post" aria-label="Search" value={state.query} onChange={handleInputChange} ref={(element) => {
                    searchField.current = element;
                }}></input>
                <span role="searchbox" className="search-button" onClick={ToggleClass} onKeyDown={ToggleClass} tabIndex={0}>
                    <FontAwesomeIcon icon={faSearch} className="search-icon"/>
                </span>
            </div>
        </form>
      </div>

      <div className="container py-3">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {
            state.query ? 
            posts.map(post => (
              <article key={post.node.id}>
                <BlogCard cardTitle={post.node.title} featuredImage={post.node.feature_image} cardLink={`/blog/${post.node.slug}`} cardExcerpt={post.node.excerpt} authorImage={post.node.authors[0].profile_image} authorName={post.node.authors[0].name} published={post.node.published_at_pretty} readingTime={post.node.reading_time}/>
              </article>
            ))
            : 
            list.map(post => (
              <article key={post.node.id}>
                <BlogCard cardTitle={post.node.title} featuredImage={post.node.feature_image} cardLink={`/blog/${post.node.slug}`} cardExcerpt={post.node.excerpt} authorImage={post.node.authors[0].profile_image} authorName={post.node.authors[0].name} published={post.node.published_at_pretty} readingTime={post.node.reading_time}/>
              </article>
            ))
          }
        </div>
      </div>
      <div ref={loadRef} className="d-flex justify-content-center py-3">
        {hasMore ? <p><strong>Loading...</strong></p> : <p><strong>No more results</strong></p>}
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
    allGhostPost(sort: { fields: [published_at], order: DESC}) {
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
