import * as React from 'react'
import Layout from '../components/layout'
import { graphql} from 'gatsby'
import Seo from "../components/seo2"
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const PageNotFound = ({data}) => {
    const image = getImage(data.ghostPage.localFeatureImage)
    const title = data.ghostPage.title
    const excerpt = data.ghostPage.excerpt
    const slug = data.ghostPage.slug

    return (
        <Layout pageTitle="Page Not Found">
            <Seo
                title={title}
                description={excerpt}
                image={data.ghostPage.localFeatureImage.childImageSharp.resize}
                pathname={slug}
            />
            <div className="container-fluid home-section justify-content-center">
                <GatsbyImage image={image} alt={title} style={{maxWidth: `300px`, maxHeight: `300px`}} className="mx-auto d-block" />

                <h1 className="text-light text-center pt-3 pb-4">{title}</h1>
                <h5 className="text-light fw-normal text-center pb-5 post-full-content bg-primary">{excerpt}</h5>
            </div>
        </Layout>
    )
}

export default PageNotFound
export const query = graphql`
query {
    ghostPage(slug: {eq: "404"}) {
        excerpt
        title
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
        slug
    }
  }
`