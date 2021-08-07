import * as React from "react"
import Layout from "../components/layout"

// markup
const IndexPage = () => {
  return (
    <main>
      <Layout pageTitle="Home">
        <section id="about-me">
          <div className="container py-5">
            <h1 className="text-center">About Me</h1>
          </div>
        </section>

        <section id="portfolio">
          <div className="container py-5">
            <h1 className="text-center">Portfolio</h1>
          </div>
        </section>

        <section id="blog">
          <div className="container py-5">
            <h1 className="text-center">Blog</h1>
          </div>
        </section>

        <section id="contact">
          <div className="container py-5">
            <h1 className="text-center">Contact Me</h1>
          </div>
        </section>

        <section id="slogan">
          <div className="container py-5">
            <h1 className="text-center">My Mantra</h1>
          </div>
        </section>
      </Layout>
    </main>
  )
}

export default IndexPage
