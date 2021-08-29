import * as React from 'react'
import Layout from '../components/layout'
import { StaticImage } from 'gatsby-plugin-image'

//markup
const About = () => {
    return (
        <main>
            <Layout pageTitle="About Me">
                <div className="container-fluid home-section justify-content-center">
                    <StaticImage alt="Blog Title Page Image" src="../../images/pages/rocket.png" style={{maxWidth: `300px`, maxHeight: `300px`}} className="mx-auto d-block"/>
                    <h1 className="text-light text-center pt-3 pb-4">🧑‍💻 About Me</h1>
                    <h5 className="text-light fw-normal text-center pb-5">I'm currently a mechanical engineering student at the ETH of Zürich. As a side hustle I built this personal blog.</h5>
                </div>
            </Layout>
        </main>
    )
}

export default About