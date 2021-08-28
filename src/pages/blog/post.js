import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/layout'
import BlogCard from "../../components/blogcard"
import Prism from "prismjs"

// viewport
const viewportContext = React.createContext({});

const ViewportProvider = ({ children }) => {
  // This is the exact same logic that we previously had in our hook

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
  const allPosts = props.data;

  if (width >= 992) {
    return (
      allPosts.slice(0,3).map(p => (
        <article key={p.node.id}>
          <BlogCard cardTitle={p.node.title} featuredImage={p.node.feature_image} cardLink={`/blog/${p.node.slug}`} cardExcerpt={p.node.excerpt} authorImage={p.node.authors[0].profile_image} authorName={p.node.authors[0].name} published={p.node.published_at_pretty} readingTime={p.node.reading_time}/>
        </article>
      ))
    )
  } else if (width >= 768) {
    return (
      allPosts.slice(0,2).map(p => (
        <article key={p.node.id}>
          <BlogCard cardTitle={p.node.title} featuredImage={p.node.feature_image} cardLink={`/blog/${p.node.slug}`} cardExcerpt={p.node.excerpt} authorImage={p.node.authors[0].profile_image} authorName={p.node.authors[0].name} published={p.node.published_at_pretty} readingTime={p.node.reading_time}/>
        </article>
      ))
    )
  } else {
    return (
      allPosts.slice(0,1).map(p => (
        <article key={p.node.id}>
          <BlogCard cardTitle={p.node.title} featuredImage={p.node.feature_image} cardLink={`/blog/${p.node.slug}`} cardExcerpt={p.node.excerpt} authorImage={p.node.authors[0].profile_image} authorName={p.node.authors[0].name} published={p.node.published_at_pretty} readingTime={p.node.reading_time}/>
        </article>
      ))
    )
  }
}

const BlogPost = ({ data }) => {
  const post = data.ghostPost
  const allPosts = data.allGhostPost.edges

  React.useEffect(() => {
    // call the highlightAll() function to style our code blocks
    Prism.highlightAll()
  })

  return (
    <ViewportProvider>
    <Layout pageTitle={post.title}>
      <article className="post">
        <div className="container py-3 post-full-content">
          <h1>{post.title}</h1>
          {post.feature_image ? (
              <img src={post.feature_image} className="img-fluid py-3" alt={post.title}/>
            ) : null}
          <section dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>

        <aside className="read-more-wrap py-3">
          <h2 className="text-light text-center py-3">Sign up for more like this.</h2>

          <div className="container">
            <div className="input-group mb-3 container" style={{maxWidth: `500px`}}>
              <input type="text" className="form-control" placeholder="Email Address" aria-label="Email Address" aria-describedby="button-addon2"/>
              <button className="btn btn-primary" type="button" id="button-addon2">Sign Up</button>
            </div>
          </div>

          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 inner">
            <PostResponsivness data={allPosts}/>
          </div>
        </aside>
      </article>
    </Layout>
    </ViewportProvider>
  )
}

export default BlogPost

export const postQuery = graphql`
  query($slug: String) {
    ghostPost(slug: { eq: $slug }) {
      title
      slug
      feature_image
      html
    }
    allGhostPost(sort: { fields: [published_at], order: DESC }, filter: { slug: { ne: $slug } }) {
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
        }
      }
    }
  }
`