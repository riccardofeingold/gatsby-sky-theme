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
  const portfolio = data.allMdx.edges

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
              {
                portfolio.map(p => (
                  <article key={p.node.id}>
                    <Card cardTitle={p.node.frontmatter.title} cardImageSrc={p.node.frontmatter.featuredImage.publicURL} cardLink={`/portfolio/${p.node.slug}`}/>
                  </article>
                ))
              }
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
                posts.map(post => (
                  <article key={post.node.id}>
                    <Card cardTitle={post.node.title} cardImageSrc={post.node.feature_image} cardLink={`/blog/${post.node.slug}`}/>
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

        <section id="contact" className="home-section">
          <div className="container py-5">
            <h1 className="text-center text-light" style={impactFontStyle}>Contact Me</h1>
            <h5 className="text-light text-center pb-2">For questions, hirements or cooperations, feel free to contact me.</h5>

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
          <h1 className="text-center pt-5 pb-2" style={impactFontStyle}>My Mantra</h1>
          <div className="d-flex pb-5 justify-content-center">
            <div className="fancy-border-box p-4">
                <h2 className="text-center mantra-slogan">I learn, I craft, I live!</h2>
            </div>
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
    allMdx {
      edges {
        node {
          frontmatter {
            title
            featuredImage {
              publicURL
            }
          }
          id
          slug
        }
      }
    }
  }
`