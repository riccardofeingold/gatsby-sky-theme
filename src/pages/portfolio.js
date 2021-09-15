import React, {useRef, useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Card from "../components/card"
import Seo from "../components/seo"

const Portfolio = ({data}) => {
  const portfolio = data.allGhostPost.edges

  // infinite scroll
  // State for the list
  const [list, setList] = useState([...portfolio.slice(0, 10)])

  // State to trigger load more
  const [loadMore, setLoadMore] = useState(false)

  // State of whether there is more to load
  const [hasMore, setHasMore] = useState(portfolio.length > 10)

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
      const isMore = currentLength < portfolio.length
      const nextResults = isMore
        ? portfolio.slice(currentLength, currentLength + 10)
        : []
      setList([...list, ...nextResults])
      setLoadMore(false)
    }
  }, [loadMore, hasMore]) //eslint-disable-line

  //Check if there is more
  useEffect(() => {
    const isMore = list.length < portfolio.length
    setHasMore(isMore)
  }, [list]) //eslint-disable-line

  return (
    <Layout pageTitle="Portfolio">
        <Seo
          title={data.ghostPage.title}
          description={data.ghostPage.excerpt}
          image={data.ghostPage.image}
          pathname={data.ghostPage.slug}
          article
        />
        <div className="container-fluid home-section justify-content-center">
          <img alt="Projects Title Page" src={data.ghostPage.feature_image} style={{maxWidth: `300px`, maxHeight: `300px`}} className="mx-auto d-block"/>
          <h1 className="text-light text-center pt-3 pb-4">{data.ghostPage.title}</h1>
          <h5 className="text-light fw-normal text-center pb-5 post-full-content bg-primary">{data.ghostPage.excerpt}</h5>
        </div>
        <div className="container py-3">
            <h1>Portfolio</h1>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {
                    list.map(p => (
                      <article key={p.node.id}>
                          <Card cardTitle={p.node.title} featuredImage={p.node.feature_image} cardLink={`/portfolio/${p.node.slug}`}/>
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

export default Portfolio 

export const query = graphql`
query query {
    allGhostPost(sort: { fields: [published_at], order: DESC}, filter: {tags: {elemMatch: {slug: {eq: "portfolio"}}}}) {
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
          tags {
            name
          }
        }
      }
    }
    ghostPage(slug: {eq: "projects"}) {
      html
      slug
      title
      excerpt
      feature_image
    }
  }
`