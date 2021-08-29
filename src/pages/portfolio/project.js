import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/layout'
import { MDXRenderer } from 'gatsby-plugin-mdx'

const ProjectPage = ({data}) => {
    const project = data.mdx
    // const allProject = data.allMdx.edges

    return (
        <Layout pageTitle="Projects">
            <article className="post">
                <div className="container py-3 post-full-content">
                <h1>{project.frontmatter.title}</h1>
                {project.frontmatter.featuredImage.publicURL ? (
                    <img src={project.frontmatter.featuredImage.publicURL} className="img-fluid py-3" alt={project.frontmatter.title}/>
                    ) : null}
                
                <MDXRenderer>
                    {project.body}
                </MDXRenderer>

                {/* <hr data-content="OTHER POSTS" className="hr-text"></hr>

                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {
                        allProject.map(p => (
                        <article key={p.node.id}>
                            <Card cardTitle={p.node.title} cardImageSrc={p.node.feature_image} cardLink={`/blog/${p.node.slug}`}/>
                        </article>
                        ))
                    }
                    </div> */}
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
