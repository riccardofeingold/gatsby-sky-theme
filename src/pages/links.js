import * as React from 'react'
import Helmet from 'react-helmet'
import { graphql} from 'gatsby'
import Seo from "../components/seo2"
import { getImage, GatsbyImage } from 'gatsby-plugin-image'
import favicon from '../images/favicon.ico'
import { faGithub, faInstagram, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SMLinks = ({data}) => {
    const title = data.ghostPage.title
    const excerpt = data.ghostPage.excerpt
    const slug = data.ghostPage.slug
    const image = getImage(data.ghostPage.authors[0].localProfileImage)
    const imageSEO = data.ghostPage.authors[0].localProfileImage.resize

    return (
        <main style={{background: `rgb(48,140,239)`, background: `linear-gradient(170deg, rgba(48,140,239,1) 0%, rgba(0,255,220,1) 100%)`}} className="container-fluid vh-100">
            <Helmet>
                <meta charset="UTF-8"></meta>
                <link rel='icon' href={favicon}></link>
            </Helmet>
            <Seo
                title={title}
                description={excerpt}
                image={imageSEO}
                pathname={slug}
            />
            <div className="container py-5 post-full-content" style={{background: `none`}}>
                <div className="col">
                    <div className="row pb-2 d-flex justify-content-center">
                        <GatsbyImage image={image} alt={title} className="rounded-circle" style={{width: `96px`, height: `96px`}}/>
                    </div>
                    <div className="row pb-3">
                        <p className="text-center" style={{color: `white`}}>{excerpt}</p>
                    </div>
                    
                    <section dangerouslySetInnerHTML={{__html: data.ghostPage.childHtmlRehype.html}}/>
                    
                    <div className="row pb-3">
                        <div className="col d-flex justify-content-center">
                            <a className="btn btn-outline-light social-media-btn m-1" style={{border: `none`}} href="https://twitter.com/riccardorion" aria-label="Twitter"><FontAwesomeIcon icon={faTwitter}/></a>

                            <a className="btn btn-outline-light social-media-btn m-1" style={{border: `none`}} href="https://www.instagram.com/riccardorion/" aria-label="Instagram"><FontAwesomeIcon icon={faInstagram}/></a>

                            <a className="btn btn-outline-light social-media-btn m-1" style={{border: `none`}} href="https://www.linkedin.com/in/riccardofeingold/" aria-label="Linkedin"><FontAwesomeIcon icon={faLinkedin}/></a>

                            <a className="btn btn-outline-light social-media-btn m-1" style={{border: `none`}} href="https://github.com/riccardofeingold" aria-label="GitHub"><FontAwesomeIcon icon={faGithub}/></a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default SMLinks
export const LinksData = graphql`
query {
    ghostPage(slug: {eq: "links"}) {
      slug
      authors {
        localProfileImage {
          childImageSharp {
            gatsbyImageData
            resize {
              src
              width
              height
            }
          }
        }
      }
      excerpt
      title
      childHtmlRehype {
        html
      }
    }
  }
`