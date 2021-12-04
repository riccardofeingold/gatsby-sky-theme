import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import BlogCard from "../components/blogcard"
import TableOfContents from '../components/tableOfContents'
import Seo from '../components/seo2'
import { GatsbyImage, getImage } from "gatsby-plugin-image"


const BlogPost = ({ data }) => {
  const post = data.ghostPost
  const allPosts = data.allGhostPost.edges
  const featureImage = getImage(data.ghostPost.localFeatureImage)

  return (
    <Layout pageTitle={post.title}>
      <Seo
        title={post.title}
        description={post.excerpt}
        image={post.localFeatureImage.childImageSharp.resize}
        pathname={post.slug}
      />
      <div className="container-fluid home-section justify-content-center">
        <div className="bg-primary post-full-content">

          <GatsbyImage image={featureImage} alt={post.title} className="mx-auto d-block rounded kg-image" style={{maxWidth: `500px`}}/>

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
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 inner responsive">
              {
                allPosts.slice(0,3).map(p => (
                  <article key={p.node.id}>
                    <BlogCard cardTitle={p.node.title} featuredImage={p.node.localFeatureImage} cardLink={`/blog/${p.node.slug}`} cardExcerpt={p.node.excerpt} authorImage={p.node.authors[0].localProfileImage} authorName={p.node.authors[0].name} published={p.node.published_at_pretty} readingTime={p.node.reading_time}/>
                  </article>
                ))
              }
            </div>
          </aside>
          :
          null
      }
    </Layout>
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
          gatsbyImageData
          resize {
            src
            width
            height
          }
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
            localProfileImage {
              childImageSharp {
                gatsbyImageData
              }
            }
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