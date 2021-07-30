import * as React from 'react'
import Layout from '../components/layout'

// styles
const pageStyles = {
    color: "#232129",
    padding: 96,
    fontFamily: "-apple-system, Roboto, sans-serif, serif",
  }
  
//markup
const About = () => {
    return (
        <main>
            <Layout pageTitle="About Me">
                <p>Hello World</p>
            </Layout>
        </main>
    )
}

export default About