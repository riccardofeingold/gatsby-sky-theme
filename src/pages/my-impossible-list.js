import * as React from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import Seo from "../components/seo2"
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const MyImpossibleList = ({data}) => {
    const page = data.ghostPage
    const featureImage = getImage(data.ghostPage.localFeatureImage)
    return (
        <Layout pageTitle="My Impossible List">
            <Seo
                title={page.title}
                description={page.excerpt}
                image={page.localFeatureImage.childImageSharp.resize}
                pathname={page.slug}
            />

            <div className="container-fluid home-section justify-content-center">
                <GatsbyImage image={featureImage} alt={page.title} style={{maxWidth: `300px`, maxHeight: `300px`}} className="mx-auto d-block" />

                <h1 className="text-light text-center pt-3 pb-4">{page.title}</h1>
                <h5 className="text-light fw-normal text-center pb-5 post-full-content bg-primary">{page.excerpt}</h5>

            </div>
            <div className="container py-3 post-full-content">
                <section dangerouslySetInnerHTML={{ __html: page.html }} />
            </div>
        </Layout>
    )
}

export default MyImpossibleList
export const query = graphql`
query {
    ghostPage(slug: {eq: "my-impossible-list"}) {
        html
        slug
        title
        excerpt
        feature_image
        localFeatureImage {
            childImageSharp {
              gatsbyImageData
              resize {
                src
                width
                height
              }
            }
          }
    }
  }
`