import { StaticImage } from "gatsby-plugin-image"
import { Link, graphql} from 'gatsby'
import * as React from "react"
import "../scss/home.scss"
import Layout from "../components/layout"
import BlogCard from "../components/blogcard"
import Card from "../components/card"
import Seo from "../components/seo"
import ContactForm from "../components/contactForm"

const impactFontStyle = {
  fontFamily: "Impact, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif", 
  marginBottom: "30px",
}

// viewport
const viewportContext = React.createContext({});
const isBrowser = typeof window !== "undefined"

const ViewportProvider = ({ children }) => {
  if (isBrowser) {
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

    // Now we are dealing with a context instead of a Hook, so instead
    // of returning the width and height we store the values in the
    // value of the Provider 
    return (
      <viewportContext.Provider value={{ width, height }}>
        {children}
      </viewportContext.Provider>
    );
  } else {
    return null
  }
};

// Rewrite the "useViewport" hook to pull the width and height values
// out of the context instead of calculating them itself
const useViewport = () => {
  // We can use the "useContext" Hook to acccess a context from within
  // another Hook, remember, Hooks are composable!
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
        <Seo
          title="Home"
          description="Welcome to my personal blog! Where I talk about tech, engineering, designing and music!"
          image="../images/riccardo-cover-image.png"
          pathname="home"
          article
        />

        <section id="about-me">
          <div className="container py-5">
            <h1 className="text-center" style={impactFontStyle}>About Me</h1>
            <div className="row">
              <div className="col-md-6 pb-3">
                <StaticImage alt="Riccardo Orion Feingold - Profile" className="rounded" src="../images/profile-rect.jpeg"/>
              </div>
              <div className="col-md-6">
                <p style={{fontSize: `20px`}}>
                Hi, my name is Riccardo Feingold!
                I'm a mechanical engineering student at the ETH of Zürich. And this is my fully self-coded personal blog.
                A place where I talk about all kinds of topics that interest me. But usually, I will focus on <strong>productivity, entrepreneurship, and engineering</strong>.
                This means you will definitely see a blog post where I'm going to talk about how I built my website with tools like <strong>Gatsby, Ghost, and React</strong>.
                If you want to know more about who I'm, feel free to check out my <strong>About Me</strong> page.
                </p>
              </div>

              <div className="d-flex justify-content-center pt-5">
                <Link className="btn btn-outline-dark btn-lg" to="/about">More Details</Link>
              </div>
            </div>
          </div>
        </section>

        <section id="portfolio" className="home-section">
          <div className="container py-5">
            <h1 className="text-center text-light" style={impactFontStyle}>Portfolio</h1>
            <h1 className="text-light pb-2">My Recent Projects</h1>
            
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              <PortfolioResponsivness data={portfolio}/>
            </div>

            <div className="d-flex justify-content-center pt-5">
                <Link className="btn btn-outline-light btn-lg" to="/portfolio">See All</Link>
            </div>
          </div>
        </section>

        <section id="blog">
          <div className="container py-5">
            <h1 className="text-center" style={impactFontStyle}>Blog</h1>
            <h1 className="pb-2">My Recent Posts</h1>
            
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              <PostResponsivness data={posts}/>
            </div>

            <div className="d-flex justify-content-center pt-5">
                <Link className="btn btn-outline-dark btn-lg" to="/blog">See All</Link>
            </div>
          </div>
        </section>

        <section id="contact" className="home-section">
          <div className="container py-5">
            <h1 className="text-center text-light" style={impactFontStyle}>Get in Touch</h1>
            <h5 className="text-light text-center pb-2">Any questions? Feel free to contact me.</h5>

            <ContactForm/>            
          
          </div>
        </section>

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