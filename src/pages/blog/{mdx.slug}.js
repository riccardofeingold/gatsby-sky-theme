import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/layout'
import { MDXRenderer } from 'gatsby-plugin-mdx'

const BlogPost = ({ data }) => {
    return (
        <Layout pageTitle={data.mdx.frontmatter.title}>
            <h4>{data.mdx.frontmatter.date}</h4>
            <MDXRenderer>{data.mdx.body}</MDXRenderer>
        </Layout>
    )
}

export const query = graphql`
query MyQuery($id: String) {
    mdx(id: {eq: $id}) {
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
      }
      body
    }
  }
`

export default BlogPost