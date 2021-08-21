import { StaticImage } from "gatsby-plugin-image"
import { Link } from 'gatsby'
import * as React from "react"
import "../scss/home.scss"
import Layout from "../components/layout"

const impactFontStyle = {
  fontFamily: "Impact",
  fontSize: "60px",
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

              <div className="d-flex justify-content-center pt-5">
                <Link type="button" className="btn btn-outline-dark btn-lg" to="/about">More Details</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="home-section">
          <div className="container py-5">
            <h1 className="text-center text-light" style={impactFontStyle}>Portfolio</h1>
            <h1 className="text-light pb-2">My Recent Projects</h1>
            
            <div className="row">
              <div className="col">
                <div className="card shadow" style={{border: `none`}}>
                  <StaticImage className="card-img-top" src="../images/banner-blue-bg.png" alt="Card image cap"/>
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="card shadow" style={{border: `none`}}>
                  <StaticImage className="card-img-top" src="../images/banner-blue-bg.png" alt="Card image cap"/>
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="card shadow" style={{border: `none`}}>
                  <StaticImage className="card-img-top" src="../images/banner-blue-bg.png" alt="Card image cap"/>
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center pt-5">
                <Link type="button" className="btn btn-outline-light btn-lg" to="/about">See All</Link>
            </div>
          </div>
        </section>

        <section id="blog">
          <div className="container py-5">
            <h1 className="text-center" style={impactFontStyle}>Blog</h1>
            <h1 className="pb-2">My Recent Projects</h1>
            
            <div className="row">
              <div className="col">
                <div className="card shadow" style={{border: `none`}}>
                  <StaticImage className="card-img-top" src="../images/banner-blue-bg.png" alt="Card image cap"/>
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="card shadow" style={{border: `none`}}>
                  <StaticImage className="card-img-top" src="../images/banner-blue-bg.png" alt="Card image cap"/>
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="card shadow" style={{border: `none`}}>
                  <StaticImage className="card-img-top" src="../images/banner-blue-bg.png" alt="Card image cap"/>
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center pt-5">
                <Link type="button" className="btn btn-outline-dark btn-lg" to="/about">See All</Link>
            </div>
          </div>
        </section>

        <section className="home-section">
          <div className="container py-5">
            <h1 className="text-center text-light" style={impactFontStyle}>Contact Me</h1>
            <h3 className="text-light text-center pb-2">For questions, hirements or cooperations, feel free to contact me.</h3>

            <div className="card shadow p-5">
              <form className="pb-4">
                <h4><strong>Full Name</strong></h4>
                <input></input>
              </form>

              <form className="pb-4">
                <h4><strong>Email Address</strong></h4>
                <input></input>
              </form>

              <form className="pb-4">
                <h4><strong>Message</strong></h4>
                <input></input>
              </form>

              <h4><strong>Services</strong></h4>
            </div>
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
