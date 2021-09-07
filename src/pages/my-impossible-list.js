import * as React from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import Seo from "../components/seo"

const MyImpossibleList = ({data}) => {
    const page = data.ghostPage

    return (
        <Layout pageTitle="My Impossible List">
            <Seo
                title={page.title}
                description={page.excerpt}
                image={page.feature_image}
                pathname={page.slug}
                article
            />

            <div className="container-fluid home-section justify-content-center">
                <img alt="My Impossible List Title Page" src={page.feature_image} style={{maxWidth: `300px`, maxHeight: `300px`}} className="mx-auto d-block"/>
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
    }
  }
`