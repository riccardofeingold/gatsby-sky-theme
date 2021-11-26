import * as React from 'react'
import Layout from '../components/layout'
import { graphql} from 'gatsby'
import Seo from "../components/seo2"
import { getImage, GatsbyImage } from 'gatsby-plugin-image'

const About = ({data}) => {
    const page = data.ghostPage
    const featureImage = getImage(data.ghostPage.localFeatureImage)
    return (
        <main>
            <Layout pageTitle="About Me">
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

                <article className="post">
                    <div className="container py-3 post-full-content">
                        <section dangerouslySetInnerHTML={{ __html: page.html }} />
                    </div>
                </article>
            </Layout>
        </main>
    )
}

export default About
export const query = graphql`
query {
    ghostPage(slug: {eq: "about"}) {
        html
        title
        excerpt
        feature_image
        localFeatureImage {
            publicURL
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