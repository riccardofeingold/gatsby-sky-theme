import * as React from 'react'
import Layout from '../components/layout'
import { graphql} from 'gatsby'
import Seo from "../components/seo"
import { getImage, GatsbyImage } from 'gatsby-plugin-image'

const Success = ({data}) => {
    const featureImage = getImage(data.ghostPage.localFeatureImage)
    const image = data.ghostPage.feature_image
    const title = data.ghostPage.title
    const excerpt = data.ghostPage.excerpt
    const slug = data.ghostPage.slug

    return (
        <Layout pageTitle="Thank You Page">
            <Seo
                title={title}
                description={excerpt}
                image={image}
                pathname={slug}
                article
            />
            <div className="container-fluid home-section justify-content-center">
                <GatsbyImage image={featureImage} alt={title} style={{maxWidth: `300px`, maxHeight: `300px`}} className="mx-auto d-block" /> 

                <h1 className="text-light text-center pt-3 pb-4">{title}</h1>
                <h5 className="text-light fw-normal text-center pb-5 post-full-content bg-primary">{excerpt}</h5>
            </div>
        </Layout>
    )
}

export default Success
export const query = graphql`
query {
    ghostPage(slug: {eq: "success"}) {
        excerpt
        title
        feature_image
        slug
        localFeatureImage {
            childImageSharp {
              gatsbyImageData
            }
          }
    }
  }
`