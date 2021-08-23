import { StaticImage } from "gatsby-plugin-image"
import { Link, graphql} from 'gatsby'
import * as React from "react"
import "../scss/home.scss"
import Layout from "../components/layout"
import Card from "../components/card"

const impactFontStyle = {
  fontFamily: "Impact",
  marginBottom: "30px",
}

// markup
const IndexPage = ({data}) => {
  const posts = data.allGhostPost.edges
  return (
    <main>
      <Layout pageTitle="Home">

        {/* About Me */}

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

        {/* Portfolio */}

        <section className="home-section">
          <div className="container py-5">
            <h1 className="text-center text-light" style={impactFontStyle}>Portfolio</h1>
            <h1 className="text-light pb-2">My Recent Projects</h1>
            
            <div className="row row-cols-1 row-cols-md-3 g-4">
              <Card cardTitle="Humanoid Robot" cardText="How humanoid robots are going to change the world!"/>
              <div className="col">
                <div className="card shadow h-100" style={{border: `none`}}>
                  <StaticImage src="../images/banner-blue-bg.png" className="card-img-top" alt="..."/>
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card shadow h-100" style={{border: `none`}}>
                  <StaticImage src="../images/banner-blue-bg.png" className="card-img-top" alt="..."/>
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">This is a short card.</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card shadow h-100" style={{border: `none`}}>
                  <StaticImage src="../images/banner-blue-bg.png" className="card-img-top" alt="..."/>
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card shadow h-100" style={{border: `none`}}>
                  <StaticImage src="../images/banner-blue-bg.png" className="card-img-top" alt="..."/>
                  <div className="card-body">
                    <h5 className="card-title">Hello World</h5>
                    <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center pt-5">
                <Link type="button" className="btn btn-outline-light btn-lg" to="/about">See All</Link>
            </div>
          </div>
        </section>

        {/* Blog */}

        <section id="blog">
          <div className="container py-5">
            <h1 className="text-center" style={impactFontStyle}>Blog</h1>
            <h1 className="pb-2">My Recent Posts</h1>
            
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {
                posts.map(posts => (
                  <article key={posts.node.id}>
                    <Card cardTitle={posts.node.title} cardText={posts.node.excerpt} cardLink={`/blog/${posts.node.slug}`}/>
                  </article>
                ))
              }
            </div>

            <div className="d-flex justify-content-center pt-5">
                <Link type="button" className="btn btn-outline-dark btn-lg" to="/about">See All</Link>
            </div>
          </div>
        </section>

        {/* Contact Me */}

        <section className="home-section">
          <div className="container py-5">
            <h1 className="text-center text-light" style={impactFontStyle}>Contact Me</h1>
            <h3 className="text-light text-center pb-2">For questions, hirements or cooperations, feel free to contact me.</h3>

            <div className="card shadow p-5" style={{margin: "0 15em 0 15em"}}>
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

        {/* My Mantra */}

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

export const postsQuery = graphql`
  query {
    allGhostPost(sort: { fields: [published_at], order: DESC }) {
      edges {
        node {
          id
          title
          slug
          excerpt
          feature_image
          published_at_pretty: published_at(formatString: "DD MMMM, YYYY")
        }
      }
    }
  }
`