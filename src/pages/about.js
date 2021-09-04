import * as React from 'react'
import Layout from '../components/layout'
import { StaticImage } from 'gatsby-plugin-image'
import { graphql} from 'gatsby'


//markup
const About = ({data}) => {
    const page = data.ghostPage
    return (
        <main>
            <Layout pageTitle="About Me">
                <div className="container-fluid home-section justify-content-center">
                    <StaticImage alt="Blog Title Page Image" src="../images/pages/about.png" style={{maxWidth: `300px`, maxHeight: `300px`}} className="mx-auto d-block"/>
                    <h1 className="text-light text-center pt-3 pb-4">🧑‍💻 About Me</h1>
                    <h5 className="text-light fw-normal text-center pb-5 post-full-content bg-primary">I'm currently a mechanical engineering student at the ETH of Zürich. As a side hustle I built this personal blog.</h5>
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
    }
  }
`