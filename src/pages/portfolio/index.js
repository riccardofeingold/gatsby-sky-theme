import React, {useRef, useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/layout'
import Card from "../../components/card"
import { StaticImage } from 'gatsby-plugin-image'

const Portfolio = ({data}) => {
  const portfolio = data.allMdx.edges

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
        <div className="container-fluid home-section justify-content-center">
          <StaticImage alt="Blog Title Page Image" src="../../images/pages/rocket.png" style={{maxWidth: `300px`, maxHeight: `300px`}} className="mx-auto d-block"/>
          <h1 className="text-light text-center pt-3 pb-4">🚀 Projects</h1>
          <h5 className="text-light fw-normal text-center pb-5 post-full-content bg-primary">I like to craft web and mobile apps, as well some engineering stuff. Hopefully you'll find some of it interesting too.</h5>
        </div>
        <div className="container py-3">
            <h1>Portfolio</h1>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {
                    list.map(p => (
                      <article key={p.node.id}>
                          <Card cardTitle={p.node.frontmatter.title} featuredImage={p.node.frontmatter.featuredImage.publicURL} cardLink={`/portfolio/${p.node.slug}`}/>
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
query query($skip: Int, $limit: Int) {
    allMdx(limit: $limit, skip: $skip, sort: {fields: frontmatter___date, order: DESC}) {
      edges {
        node {
          frontmatter {
            date
            featuredImage {
              publicURL
            }
            title
          }
          slug
          id
        }
      }
    }
  }
`