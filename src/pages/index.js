import { StaticImage } from "gatsby-plugin-image"
import * as React from "react"
import Layout from "../components/layout"

const impactFontStyle = {
  fontFamily: "Impact",
  fontSize: "50px",
  marginBottom: "30px"
}

// markup
const IndexPage = () => {
  return (
    <main>
      <Layout pageTitle="Home">
        <section id="about-me">
          <div className="container py-5">
            <h1 className="text-center" style={impactFontStyle}>About Me</h1>
            <div className="row">
              <div className="col-md-6">
                <StaticImage alt="Riccardo Orion Feingold - Profile" className="" src="../images/profile.png"/>
              </div>
              <div className="col-md-6">
                <p>
                  aölsdaölskdjföalkjsdöfalksdjölakjsdöflaksjdfa
                  asöldfkjaösdlfkjaölsdkfjaölsdkjföalsdkjfa
                  dfaölsdkjfaölsdf
                  asöldfkjaösdlfkjaölsdkfjaölsdkjföalsdkjfaa
                  sdfadöfalsdkjföalskdj
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="portfolio">
          <div className="container py-5">
            <h1 className="text-center" style={impactFontStyle}>Portfolio</h1>
          </div>
        </section>

        <section id="blog">
          <div className="container py-5">
            <h1 className="text-center" style={impactFontStyle}>Blog</h1>
          </div>
        </section>

        <section id="contact">
          <div className="container py-5">
            <h1 className="text-center" style={impactFontStyle}>Contact Me</h1>
          </div>
        </section>

        <section id="slogan">
          <div className="container py-5">
            <h1 className="text-center" style={impactFontStyle}>My Mantra</h1>
          </div>
        </section>
      </Layout>
    </main>
  )
}

export default IndexPage
