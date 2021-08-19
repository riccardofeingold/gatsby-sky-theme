import { StaticImage } from "gatsby-plugin-image"
import * as React from "react"
import * as styles from "../scss/index.module.scss"
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
                <StaticImage alt="Riccardo Orion Feingold - Profile" className="img-thumbnail" src="../images/profile-rect.jpeg"/>
              </div>
              <div className="col-md-6">
                <p style={{fontSize: `20px`}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Semper viverra nam libero justo laoreet sit amet cursus. Libero id faucibus nisl tincidunt. Sed arcu non odio euismod. Euismod lacinia at quis risus. In nisl nisi scelerisque eu. 
                </p>
              </div>

              <button type="button" className="btn btn-outline-dark" style={{width: `auto`}}>More Details</button>
            </div>
          </div>
        </section>

        <section className={styles.homeSection}>
          <div className="container py-5">
            <h1 className="text-center text-light" style={impactFontStyle}>Portfolio</h1>
          </div>
        </section>

        <section id="blog">
          <div className="container py-5">
            <h1 className="text-center" style={impactFontStyle}>Blog</h1>
          </div>
        </section>

        <section className={styles.homeSection}>
          <div className="container py-5">
            <h1 className="text-center text-light" style={impactFontStyle}>Contact Me</h1>
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
