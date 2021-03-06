import React from "react";
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import './layout.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import favicon from '../images/favicon.ico'
import { StaticImage } from 'gatsby-plugin-image'
import { faGithub, faInstagram, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import SubscribeForm from '../components/subscribeForm'

// styles for components 
const HeaderLogo = {
    fontFamily: "Impact, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    fontStyle: "normal",
    fontWeight: "900",
    fontSize: "35px",
    lineHeight: "43px",
    color: "#FFFFFF",
};

function HomeTitleImage(props) {
    const isHome = props.isHome
    if (isHome === "Home") {
      return (
          <section id="welcome-section">
              <div className="container-fluid p-0"><StaticImage alt="Riccardorion Branding Imgae © Riccardo Orion Feingold" src="../images/riccardo-cover-image.png"/></div>
          </section>
      )
    } else {
        return null
    }
}

const Layout = ({pageTitle, children}) => {
    const data = useStaticQuery(graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
        allGhostTag(filter: {slug: {ne: "portfolio"}}) {
            edges {
                node {
                    id
                    slug
                    name
                    feature_image
                    description
                }
            }
        }
    }      
    `)

    return (
        <main>
            <Helmet>
                <meta charset="UTF-8"></meta>
                <link rel='icon' href={favicon}></link>
            </Helmet>
            <title>{pageTitle} | {data.site.siteMetadata.title}</title>
            <div className="./nodecontainer-fluid bg-primary">
                <div className="container">
                    <nav className="navbar navbar-expand-xl navbar-dark p-3">
                        <a className="navbar-brand header-logo" href="/" style={HeaderLogo}>RICCARDO</a>
                        
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <FontAwesomeIcon icon={faBars}/>
                        </button>

                        <div className="collapse navbar-collapse text-uppercase" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="/">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/about">About Me</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/portfolio">Projects</a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="/blog" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" aria-label="Tag Dropdown">Blog</a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <a className="dropdown-item" href="/blog">🔭 All</a>
                                        {
                                            data.allGhostTag.edges.map(({node}) => (
                                                <a key={node.id} className="dropdown-item" href={`/${node.slug}`}>{node.name}</a>
                                            ))
                                        }
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/#contact">Contact</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/my-impossible-list">My Impossible List</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
            

            <HomeTitleImage isHome={pageTitle}/>

            <div className="site">

                <div className="container-fluid p-0 site-content">
                    {children}
                </div>

                {pageTitle === "Newsletter Thank You" ? null : <SubscribeForm/>}
                <div className="container-fluid text-center text-white py-3" style={{backgroundColor: `#3D4661`}}>
                    <div className="row align-items-center">

                        <div className="col">
                            <span className="align-middle">© Riccardo Orion Feingold</span>
                        </div>

                        <div className="col">
                            <a className="btn btn-outline-light social-media-btn m-1" href="https://twitter.com/riccardorion" aria-label="Twitter"><FontAwesomeIcon icon={faTwitter}/></a>

                            <a className="btn btn-outline-light social-media-btn m-1" href="https://www.instagram.com/riccardofeingold/" aria-label="Instagram"><FontAwesomeIcon icon={faInstagram}/></a>

                            <a className="btn btn-outline-light social-media-btn m-1" href="https://www.linkedin.com/in/riccardofeingold/" aria-label="Linkedin"><FontAwesomeIcon icon={faLinkedin}/></a>

                            <a className="btn btn-outline-light social-media-btn m-1" href="https://github.com/riccardofeingold" aria-label="GitHub"><FontAwesomeIcon icon={faGithub}/></a>
                        </div>
                    </div>
                </div>
            </div>

            <script src="prism.js"></script>
        </main>
    )
}

export default Layout