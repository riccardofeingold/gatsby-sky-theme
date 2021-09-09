import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Seo from "../components/seo"

const ThankYou = ({data}) => {
    const pageHtml = data.ghostPage.html
    const image = data.ghostPage.feature_image
    const title = data.ghostPage.title
    const excerpt = data.ghostPage.excerpt
    const slug = data.ghostPage.slug
    return (
        <Layout pageTitle="Newsletter Thank You">
            <Seo
                title={title}
                description={excerpt}
                image={image}
                pathname={slug}
                article
            />
            <div className="container-fluid home-section justify-content-center">
                <img alt="Thank You Title Page" src={image} style={{maxWidth: `300px`, maxHeight: `300px`}} className="mx-auto d-block"/>
                <h1 className="text-light text-center pt-3 pb-4">{title}</h1>
                <h5 className="text-light fw-normal text-center pb-5 post-full-content bg-primary">{excerpt}</h5>
            </div>

            <div className="container py-3 post-full-content">
                <section dangerouslySetInnerHTML={{ __html: pageHtml }} />
            </div>
        </Layout>
    )
}

export default ThankYou

export const query = graphql`
    query {
        ghostPage(slug: {eq: "thankyou"}) {
            html
            excerpt
            title
            feature_image
            slug
        }
    }
`