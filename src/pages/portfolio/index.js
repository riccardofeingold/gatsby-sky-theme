import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/layout'
import Card from "../../components/card"

const Portfolio = ({data}) => {
    const portfolio = data.allMdx.edges

    return (
        <Layout pageTitle="Portfolio">
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
        </Layout>
    )
}

export default Portfolio 

export const query = graphql`
query {
    allMdx {
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