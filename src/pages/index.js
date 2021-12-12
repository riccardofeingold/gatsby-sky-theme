import { Link, graphql} from 'gatsby'
import * as React from "react"
import "../scss/home.scss"
import Layout from "../components/layout"
import BlogCard from "../components/blogcard"
import Seo from "../components/seo2"
import ContactForm from "../components/contactForm"
import { StaticImage } from "gatsby-plugin-image"

const impactFontStyle = {
  fontFamily: "Impact, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif", 
  marginBottom: "30px",
}

// markup
const IndexPage = ({data}) => {
  const posts = data.posts.edges
  const portfolio = data.projects.edges

  return (
    <main>
      <Layout pageTitle="Home">
        <Seo
          title={data.ghostPage.title}
          description={data.ghostPage.excerpt}
          image={data.ghostPage.localFeatureImage.childImageSharp.resize}
          pathname={data.ghostPage.slug}
        />

        <section id="about-me">
          <div className="container py-5">
            <h1 className="text-center" style={impactFontStyle}>👨🏻‍🎓 About Me</h1>
            <div className="row">
              <div className="col-md-6 pb-3">
                <StaticImage alt="Riccardo Orion Feingold - Profile" style={{borderRadius: `10px`}} src="../images/profile-rect.jpeg"/>
              </div>
              <div className="col-md-6">
                <h3>Hi, my name is Riccardo Feingold!</h3>
                <p style={{fontSize: `20px`}}>
                  I'm a mechanical engineering student, musician, and developer. 
                  And this is my fully self-coded personal blog 📝. 
                  A place where I talk about <strong> music 🎹, programming 🖥 and engineering 🦾</strong>.
                </p>

                <p style={{fontSize: `20px`}}>
                  <strong>Why I'm blogging?</strong>
                </p>

                <p style={{fontSize: `20px`}}>
                  When I started college, I had all these imaginations of projects I would craft during my studies.
                  But the whole course of studies is built upon theory after theory. 
                  Nothing wrong with that. To be fair, I love to learn theory. 
                  But theorems are nothing special if we don't apply them in reality. 
                  And I thought this is what engineers are for. 
                  They build innovative things out of pure theory.
                </p>
                <p style={{fontSize: `20px`}}>
                  But engineering is not the only love in my life. 
                  Growing up with two musicians as parents, I've been living for music since I was born. 
                  Even the first salary I earned was from playing the piano in the church. 
                  Music is heavily rooted in me, and I actually can not live without it. 
                  That's why it's going to be a part of my blog too. 
                </p>

                <p style={{fontSize: `20px`}}>
                  In short, my blog is a way to express myself in engineering and music. 
                  If it is a song, a python snippet that throws people out of the internet, or a piano robot that plays a duet with me, I'm going to share it with you. 
                </p>

                <p style={{fontSize: `20px`}}>
                  For that and more, see you in my posts and vids! Peace ✌🏻!
                </p>
              </div>

              <div className="d-flex mt-4 justify-content-center">
                <div className="fancy-border-box p-4">
                    <h2 className="text-center mantra-slogan">I learn, I craft, I live!</h2>
                </div>
              </div>

              <div className="d-flex justify-content-center pt-5">
                <Link className="btn btn-outline-dark btn-lg" to="/about">More Details</Link>
              </div>
            </div>
          </div>
        </section>

        <section id="blog" className="home-section">
          <div className="container py-5">
            <h1 className="text-center text-light" style={impactFontStyle}>✏️ Blog</h1>
            <h1 className="text-light pb-2">My Recent Posts</h1>
            
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 responsive">
              {
                posts.slice(0,3).map(post => (
                  <article key={post.node.id}>
                    <BlogCard cardTitle={post.node.title} featuredImage={post.node.localFeatureImage} cardLink={`/blog/${post.node.slug}`} cardExcerpt={post.node.excerpt} authorImage={post.node.authors[0].localProfileImage} authorName={post.node.authors[0].name} published={post.node.published_at_pretty} readingTime={post.node.reading_time}/>
                  </article>
                ))
              }
            </div>

            <div className="d-flex justify-content-center pt-5">
                <Link className="btn btn-outline-light btn-lg" to="/blog">See All</Link>
            </div>
          </div>
        </section>

        <section id="projects">
          <div className="container py-5">
            <h1 className="text-center" style={impactFontStyle}>🚀 Projects</h1>
            <h1 className="pb-2">My Recent Projects</h1>
            
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 responsive">
              {
                portfolio.slice(0,3).map(p => (
                  <article key={p.node.id}>
                    <BlogCard cardTitle={p.node.title} featuredImage={p.node.localFeatureImage} cardLink={`/blog/${p.node.slug}`} cardExcerpt={p.node.excerpt} authorImage={p.node.authors[0].localProfileImage} authorName={p.node.authors[0].name} published={p.node.published_at_pretty} readingTime={p.node.reading_time}/>
                  </article>
                ))
              }
            </div>

            <div className="d-flex justify-content-center pt-5">
                <Link className="btn btn-outline-dark btn-lg" to="/portfolio">See All</Link>
            </div>
          </div>
        </section>

        <section id="contact" className="home-section">
          <div className="container py-5">
            <h1 className="text-center text-light" style={impactFontStyle}>👋🏻 Get in Touch</h1>
            <h5 className="text-center text-light pb-2">Any questions? Feel free to contact me.</h5>

            <ContactForm/>            
          
          </div>
        </section>
      </Layout>
    </main>
  )
}

export default IndexPage

export const postsQuery = graphql`
  query {
    ghostPage(title: {eq: "Home"}) {
      title
      localFeatureImage {
        childImageSharp {
          gatsbyImageData
          resize {
            src
            width
            height
          }
        }
      }
      excerpt
      slug
    }
    posts: allGhostPost(sort: { fields: [published_at], order: DESC }, filter: {tags: {elemMatch: {slug: {ne: "portfolio"}}}}) {
      edges {
        node {
          authors {
            localProfileImage {
              childImageSharp {
                gatsbyImageData
              }
            }
            name
          }
          id
          title
          slug
          excerpt
          localFeatureImage {
            childImageSharp {
              gatsbyImageData
            }
          }
          reading_time
          published_at_pretty: published_at(formatString: "DD MMMM, YYYY")
        }
      }
    }
    projects: allGhostPost(sort: { fields: [published_at], order: DESC }, filter: {tags: {elemMatch: {slug: {eq: "portfolio"}}}}) {
      edges {
        node {
          authors {
            localProfileImage {
              childImageSharp {
                gatsbyImageData
              }
            }
            name
          }
          id
          title
          slug
          excerpt
          feature_image
          localFeatureImage {
            childImageSharp {
              gatsbyImageData
            }
          }
          reading_time
          published_at_pretty: published_at(formatString: "DD MMMM, YYYY")
        }
      }
    }
  }
`