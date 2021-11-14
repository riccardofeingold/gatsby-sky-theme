import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import BlogCard from "../components/blogcard"
import TableOfContents from '../components/tableOfContents'
import Seo from '../components/seo'
import { GatsbyImage, getImage } from "gatsby-plugin-image"

// viewport
const viewportContext = React.createContext({});
// const isBrowser = typeof window !== "undefined"

const ViewportProvider = ({ children }) => {
  // This is the exact same logic that we previously had in our hook
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
  const featureImage = getImage(data.ghostPost.localFeatureImage)

  return (
    <ViewportProvider>
    <Layout pageTitle={post.title}>
      <Seo
        title={post.title}
        description={post.excerpt}
        image={post.feature_image}
        pathname={post.slug}
        article 
      />
      <div className="container-fluid home-section justify-content-center">
        <div className="bg-primary post-full-content">
          {/* {post.feature_image ? (
                  <img src={post.feature_image} className="mx-auto d-block rounded kg-image" style={{maxWidth: `500px`}} alt={post.title}/>
                ) : null} */}
          <GatsbyImage image={featureImage} alt="hello" className="mx-auto d-block rounded kg-image" style={{maxWidth: `500px`}}/>

          <h1 className="text-light text-center pt-3 pb-4">{post.title}</h1>
          <h5 className="fw-bold text-center" style={{color: `#f8f9fa`}}>
          {
            post.tags.map(p => (
              post.tags.length ? <span key={p.id} className="badge text-dark mx-1" style={{background: `#CFE8FF`}}>{p.name}</span> : null
            ))
          }
          </h5>
        </div>
        <hr className="line mx-auto pb-5"></hr>
      </div>

      <TableOfContents />

      <article className="post">
        <div className="container p-3 post-full-content">
          <span className="badge" style={{background: `#007BFF`}}>{post.published_at}</span>
          <span className="badge mx-1" style={{background: `#007BFF`}}>{post.reading_time} min</span>
          <section dangerouslySetInnerHTML={{ __html: post.childHtmlRehype.html }} />
        </div>
      </article>
      
      {
        allPosts.length ? 
          <aside className="read-more-wrap pb-5 pt-3">
            <h2 className="text-center">Other Posts</h2>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 inner">
              <PostResponsivness data={allPosts}/>
            </div>
          </aside>
          :
          null
      }
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
      localFeatureImage {
        childImageSharp {
          gatsbyImageData(
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
      excerpt
      html
      published_at(formatString: "DD.MM.YYYY")
      reading_time
      childHtmlRehype {
        html
      }
      tags {
        id
        name
      }
    }
    allGhostPost(sort: { fields: [published_at], order: DESC }, filter: { slug: { ne: $slug }, tags: {elemMatch: {slug: {ne: "portfolio"}}} }) {
      edges {
        node {
          authors {
            profile_image
            name
          }
          tags {
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