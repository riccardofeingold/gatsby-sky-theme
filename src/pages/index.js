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

    // Now we are dealing with a context instead of a Hook, so instead
    // of returning the width and height we store the values in the
    // value of the Provider 
    return (
      <viewportContext.Provider value={{ width, height }}>
        {children}
      </viewportContext.Provider>
    );
  // } else {
  //   return null
  // }
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
          <BlogCard cardTitle={post.node.title} featuredImage={post.node.localFeatureImage} cardLink={`/blog/${post.node.slug}`} cardExcerpt={post.node.excerpt} authorImage={post.node.authors[0].localProfileImage} authorName={post.node.authors[0].name} published={post.node.published_at_pretty} readingTime={post.node.reading_time}/>
        </article>
      ))
    )
  } else if (width >= 768) {
    return (
      posts.slice(0,2).map(post => (
        <article key={post.node.id}>
          <BlogCard cardTitle={post.node.title} featuredImage={post.node.localFeatureImage} cardLink={`/blog/${post.node.slug}`} cardExcerpt={post.node.excerpt} authorImage={post.node.authors[0].localProfileImage} authorName={post.node.authors[0].name} published={post.node.published_at_pretty} readingTime={post.node.reading_time}/>
        </article>
      ))
    )
  } else {
    return (
      posts.slice(0,1).map(post => (
        <article key={post.node.id}>
          <BlogCard cardTitle={post.node.title} featuredImage={post.node.localFeatureImage} cardLink={`/blog/${post.node.slug}`} cardExcerpt={post.node.excerpt} authorImage={post.node.authors[0].localProfileImage} authorName={post.node.authors[0].name} published={post.node.published_at_pretty} readingTime={post.node.reading_time}/>
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
          <Card cardTitle={p.node.title} featuredImage={p.node.localFeatureImage} cardLink={`/portfolio/${p.node.slug}`}/>
        </div>
      ))
    )
  } else if (width >= 768) {
    return (
      portfolio.slice(0,2).map(p => (
        <div key={p.node.id} className="col">
          <Card cardTitle={p.node.title} featuredImage={p.node.localFeatureImage} cardLink={`/portfolio/${p.node.slug}`}/>
        </div>
      ))
    )
  } else {
    return (
      portfolio.slice(0,1).map(p => (
        <div key={p.node.id} className="col">
          <Card cardTitle={p.node.title} featuredImage={p.node.localFeatureImage} cardLink={`/portfolio/${p.node.slug}`}/>
        </div>
      ))
    )
  }
}

// markup
const IndexPage = ({data}) => {
  const posts = data.posts.edges
  const portfolio = data.projects.edges

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
                  A place where I talk about <strong>science 🔭, programming 🖥 and engineering 🦾 </strong>.   
                </p>
                <p style={{fontSize: `20px`}}>
                  <strong>Why I'm blogging?</strong>
                </p>
                <p style={{fontSize: `20px`}}>
                  When I started my studies at college, I had all these imaginations of projects I would craft during my studies. 
                  But the whole course of studies is built upon theory after theory. Nothing wrong with that. To be fair, I love to learn theory. 
                  I feel like I would be having a conversation with the actual inventor of the theorem I try to understand. 
                  But theorems are nothing special if we don't apply them in reality. 
                  And I thought this is what engineers are for. 
                </p>
                <p style={{fontSize: `20px`}}>
                  Long story short, this is basically the purpose of my blog. 
                  I want to apply the theory I'm learning on projects. 
                  <strong> If it is a humanoid robot, a python snippet that throws people out of the internet, or just a simple sterling motor sitting on your coffee mug that powers a small Christmas tree. </strong>
                  I'm going to build it, explain it to you, and hopefully inspire you to get creative too.
                </p>
                <p style={{fontSize: `20px`}}>
                  I'm really dope to tell you about my engineering projects on my blog, as well as on my YouTube channel. 
                  For that and more, see you in my posts and vids! Peace ✌🏻!
                </p>
                <p style={{fontSize: `20px`}}>
                If you want to know more about who I'm, feel free to check out my <strong>About Me 🧑‍💻</strong> page.
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
            
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              <PostResponsivness data={posts}/>
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
            
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              <PortfolioResponsivness data={portfolio}/>
            </div>

            <div className="d-flex justify-content-center pt-5">
                <Link className="btn btn-outline-light btn-lg" to="/portfolio">See All</Link>
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
    </ViewportProvider>
  )
}

export default IndexPage

export const postsQuery = graphql`
  query {
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