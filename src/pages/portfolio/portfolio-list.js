import * as React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../../components/layout'
import Card from "../../components/card"
import { StaticImage } from 'gatsby-plugin-image'

class Portfolio extends React.Component {
    render() {
      const {data} = this.props

      const portfolio = data.allMdx.edges

      // pagination 
      const { currentPage, numPages } = this.props.pageContext
      const isFirst = currentPage === 1
      const isLast = currentPage === numPages || numPages == null
      const prevPage = currentPage - 1 === 1 ? "/portfolio" : (currentPage - 1).toString()
      const nextPage = (currentPage + 1).toString()
      console.log(numPages)
      return (
          <Layout pageTitle="Portfolio">
              <div className="container-fluid home-section justify-content-center">
                <StaticImage alt="Blog Title Page Image" src="../../images/pages/rocket.png" style={{maxWidth: `300px`, maxHeight: `300px`}} className="mx-auto d-block"/>
                <h1 className="text-light text-center pt-3 pb-4">🚀 Projects</h1>
                <h5 className="text-light fw-normal text-center pb-5">I like to craft web and mobile apps, as well some engineering stuff. Hopefully you'll find some of it interesting too.</h5>
              </div>
              <div className="container py-3">
                  <h1>Portfolio</h1>
                  <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                      {
                          portfolio.map(p => (
                          <article key={p.node.id}>
                              <Card cardTitle={p.node.frontmatter.title} featuredImage={p.node.frontmatter.featuredImage.publicURL} cardLink={`/portfolio/${p.node.slug}`}/>
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
                      <Link className="page-link" to={`/portfolio/${i === 0 ? "" : i + 1}`}>
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