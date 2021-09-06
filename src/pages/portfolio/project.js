import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/layout'
import { MDXRenderer } from 'gatsby-plugin-mdx'

const ProjectPage = ({data}) => {
    const project = data.mdx

    return (
        <Layout pageTitle="Projects">
          <div className="container-fluid home-section justify-content-center">
            <div className="bg-primary post-full-content">
              {project.frontmatter.featuredImage.publicURL ? (
                    <img src={project.frontmatter.featuredImage.publicURL} className="mx-auto d-block rounded kg-image" style={{maxWidth: `500px`}} alt={project.frontmatter.title}/>
                    ) : null}
              <h1 className="text-light text-center pt-3 pb-4">{project.frontmatter.title}</h1>
              <h5 className="text-white fw-bold text-center">{project.frontmatter.tags.length > 0 ? project.frontmatter.tags[0] : null}</h5>
            </div>
            <hr className="line mx-auto pb-5"></hr>
          </div>
          
          <article className="post">
              <div className="container py-3 post-full-content">
                <MDXRenderer>
                    {project.body}
                </MDXRenderer>
              </div>
          </article>
        </Layout>
    )
}

export default ProjectPage;

export const query = graphql`
query($slug: String) {
    mdx(slug: { eq: $slug }) {
      frontmatter {
        featuredImage {
          publicURL
        }
        title
        tags
      }
      body
      slug
    }
    allMdx {
        edges {
          node {
            frontmatter {
              date
              featuredImage {
                publicURL
              }
              title
            }
            slug
            id
          }
        }
    }
  }
  
`
