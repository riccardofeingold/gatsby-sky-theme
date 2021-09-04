import * as React from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'

const MyImpossibleList = ({data}) => {
    const pageHtml = data.ghostPage.html

    return (
        <Layout pageTitle="My Impossible List">
            <div className="container-fluid home-section justify-content-center">
                <StaticImage alt="Blog Title Page Image" src="../images/pages/impossible-list.png" style={{maxWidth: `300px`, maxHeight: `300px`}} className="mx-auto d-block"/>
                <h1 className="text-light text-center pt-3 pb-4">📜 My Impossible List</h1>
                <h5 className="text-light fw-normal text-center pb-5 post-full-content bg-primary">I like to blog about the stuff I'm interested in. Hopefully you'll find some of it interesting too.</h5>

            </div>
            <div className="container py-3 post-full-content">
                <section dangerouslySetInnerHTML={{ __html: pageHtml }} />
            </div>
        </Layout>
    )
}

export default MyImpossibleList
export const query = graphql`
query {
    ghostPage(slug: {eq: "my-impossible-list"}) {
        html
    }
  }
`