import { StaticImage } from "gatsby-plugin-image"
import { Link, graphql} from 'gatsby'
import * as React from "react"
import "../scss/home.scss"
import Layout from "../components/layout"
import BlogCard from "../components/blogcard"
import Card from "../components/card"

const impactFontStyle = {
  fontFamily: "Impact",
  marginBottom: "30px",
}

// viewport
const viewportContext = React.createContext({});
// const isBrowser = typeof window !== "undefined"

const ViewportProvider = ({ children }) => {
  // if (isBrowser) {
    const [width, setWidth] = React.useState(window.innerWidth);
    const [height, setHeight] = React.useState(window.innerHeight);

    const handleWindowResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }

    React.useEffect(() => {
      window.addEventListener("resize", handleWindowResize);
      return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    /* Now we are dealing with a context instead of a Hook, so instead
      of returning the width and height we store the values in the
      value of the Provider */
    return (
      <viewportContext.Provider value={{ width, height }}>
        {children}
      </viewportContext.Provider>
    );
  // } else {
  //   return null
  // }
};

/* Rewrite the "useViewport" hook to pull the width and height values
   out of the context instead of calculating them itself */
const useViewport = () => {
  /* We can use the "useContext" Hook to acccess a context from within
     another Hook, remember, Hooks are composable! */
  const { width, height } = React.useContext(viewportContext);
  return { width, height };
}

// posts responsiveness
function PostResponsivness(props) {
  const { width } = useViewport()
  const posts = props.data;

  if (width >= 992) {
    return (
      posts.slice(0,3).map(post => (
        <article key={post.node.id}>
          <BlogCard cardTitle={post.node.title} featuredImage={post.node.feature_image} cardLink={`/blog/${post.node.slug}`} cardExcerpt={post.node.excerpt} authorImage={post.node.authors[0].profile_image} authorName={post.node.authors[0].name} published={post.node.published_at_pretty} readingTime={post.node.reading_time}/>
        </article>
      ))
    )
  } else if (width >= 768) {
    return (
      posts.slice(0,2).map(post => (
        <article key={post.node.id}>
          <BlogCard cardTitle={post.node.title} featuredImage={post.node.feature_image} cardLink={`/blog/${post.node.slug}`} cardExcerpt={post.node.excerpt} authorImage={post.node.authors[0].profile_image} authorName={post.node.authors[0].name} published={post.node.published_at_pretty} readingTime={post.node.reading_time}/>
        </article>
      ))
    )
  } else {
    return (
      posts.slice(0,1).map(post => (
        <article key={post.node.id}>
          <BlogCard cardTitle={post.node.title} featuredImage={post.node.feature_image} cardLink={`/blog/${post.node.slug}`} cardExcerpt={post.node.excerpt} authorImage={post.node.authors[0].profile_image} authorName={post.node.authors[0].name} published={post.node.published_at_pretty} readingTime={post.node.reading_time}/>
        </article>
      ))
    )
  }
}

// portfolio responsiveness
function PortfolioResponsivness(props) {
  const { width } = useViewport()
  const portfolio = props.data;

  if (width >= 992) {
    return (
      portfolio.slice(0,3).map(p => (
        <div key={p.node.id} className="col">
          <Card cardTitle={p.node.frontmatter.title} featuredImage={p.node.frontmatter.featuredImage.publicURL} cardLink={`/portfolio/${p.node.slug}`}/>
        </div>
      ))
    )
  } else if (width >= 768) {
    return (
      portfolio.slice(0,2).map(p => (
        <div key={p.node.id} className="col">
          <Card cardTitle={p.node.frontmatter.title} featuredImage={p.node.frontmatter.featuredImage.publicURL} cardLink={`/portfolio/${p.node.slug}`}/>
        </div>
      ))
    )
  } else {
    return (
      portfolio.slice(0,1).map(p => (
        <div key={p.node.id} className="col">
          <Card cardTitle={p.node.frontmatter.title} featuredImage={p.node.frontmatter.featuredImage.publicURL} cardLink={`/portfolio/${p.node.slug}`}/>
        </div>
      ))
    )
  }
}

// markup
const IndexPage = ({data}) => {
  const posts = data.allGhostPost.edges
  const portfolio = data.allMdx.edges

  return (
    <ViewportProvider>
    <main>
      <Layout pageTitle="Home">

        {/* About Me */}

        <section id="about-me">
          <div className="container py-5">
            <h1 className="text-center" style={impactFontStyle}>About Me</h1>
            <div className="row">
              <div className="col-md-6 pb-3">
                <StaticImage alt="Riccardo Orion Feingold - Profile" className="rounded" src="../images/profile-rect.jpeg"/>
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
            
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              <PortfolioResponsivness data={portfolio}/>
            </div>

            <div className="d-flex justify-content-center pt-5">
                <Link type="button" className="btn btn-outline-light btn-lg" to="/portfolio">See All</Link>
            </div>
          </div>
        </section>

        {/* Blog */}

        <section id="blog">
          <div className="container py-5">
            <h1 className="text-center" style={impactFontStyle}>Blog</h1>
            <h1 className="pb-2">My Recent Posts</h1>
            
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              <PostResponsivness data={posts}/>
            </div>

            <div className="d-flex justify-content-center pt-5">
                <Link type="button" className="btn btn-outline-dark btn-lg" to="/blog">See All</Link>
            </div>
          </div>
        </section>

        {/* Contact Me */}
        {/* Netflifly offers a feature for contact form and sign ups etc. https://docs.netlify.com/forms/setup/ */}

        <section id="contact" className="home-section">
          <div className="container py-5">
            <h1 className="text-center text-light" style={impactFontStyle}>Get in Touch</h1>
            <h5 className="text-light text-center pb-2">Any questions? Feel free to contact me.</h5>

            <div className="container p-4 shadow" style={{maxWidth: `720px`, backgroundColor: `#FFF`, borderRadius: `10px`}}>
              <form className="pb-4">
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1"><strong>Full Name</strong></label>
                  <input className="form-control" id="exampleInputPassword1" placeholder="Your Name"/>
                </div>
              </form>

              <form className="pb-4">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1"><strong>Email address</strong></label>
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                  <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
              </form>

              <form className="pb-4">
                <div className="form-group">
                  <label htmlFor="exampleFormControlTextarea1"><strong>Message</strong></label>
                  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
              </form>

              <strong>How can I help you with?</strong>
              <ul>
                <li>Get a Website Created Frontend and Backend</li>
                <li>Get a Professional App or Web Design for your company</li>
                <li>Need a New Song? I can write one for you</li>
              </ul>

              <div className="btn btn-primary">
                Send
              </div>

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
    </ViewportProvider>
  )
}

export default IndexPage

export const postsQuery = graphql`
  query {
    allGhostPost(sort: { fields: [published_at], order: DESC }) {
      edges {
        node {
          authors {
            profile_image
            name
          }
          id
          title
          slug
          excerpt
          feature_image
          reading_time
          published_at_pretty: published_at(formatString: "DD MMMM, YYYY")
          tags {
            name
            feature_image
          }
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