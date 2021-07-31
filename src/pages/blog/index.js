import { graphql, Link } from 'gatsby'
import * as React from 'react'
import Layout from '../../components/layout'

const BlogPage = ( {data} ) => {
    return (
      <Layout pageTitle="My Blog Posts">
        <ul>
        {
            data.allMdx.nodes.map(node => (
                <article key={node.id}>
                    <h2>
                      <Link to={`/blog/${node.slug}`}>
                        {node.frontmatter.title}
                      </Link>
                    </h2>
                    <h4>{node.frontmatter.date}</h4>
                </article>
            ))
        }
        </ul>
      </Layout>
    )
}

export const query = graphql`
query {
  allMdx(sort: {fields: frontmatter___date, order: DESC}) {
    nodes {
      frontmatter {
        date(formatString: "MMMM D, YYYY")
        title
      }
      id
      slug
    }
  }
}
`

export default BlogPage