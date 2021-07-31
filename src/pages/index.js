import * as React from "react"
import Layout from "../components/layout"
import { StaticImage } from 'gatsby-plugin-image'


// markup
const IndexPage = () => {
  return (
    <main>
      <Layout pageTitle="Home">
        <p>Hello my name is …</p>
        <StaticImage
          alt="Clifford, a reddish-brown pitbull, posing on a couch and looking stoically at the camera"
          src="https://pbs.twimg.com/media/E1oMV3QVgAIr1NT?format=jpg&name=large"
        />
      </Layout>
    </main>
  )
}

export default IndexPage
