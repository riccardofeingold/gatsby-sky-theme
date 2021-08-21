import React, {useRef, useState } from "react";
import Helmet from 'react-helmet'
import { useStaticQuery, graphql} from 'gatsby'
import './layout.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons'
import favicon from '../images/favicon.ico'
import { StaticImage } from 'gatsby-plugin-image'
import { faGithub, faInstagram, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";

// styles for components 
const HeaderLogo = {
    fontFamily: "Impact",
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
              <div className="container-fluid p-0"><StaticImage layout="fullWidth" alt="Riccardorion Branding Imgae © Riccardo Orion Feingold" src="../images/banner-blue-bg.png"/></div>
          </section>
      )
    } else {
        return null
    }
}

const Layout = ({pageTitle, children}) => {
    const searchField = useRef(null);
    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                }
            }
        }      
    `)

    const [isActive, setActive] = useState("false");

    const ToggleClass = () => {
        searchField.current.value = '';
        searchField.current.focus();
        setActive(!isActive);
    }
    return (
        <main>
            {/* Header */}
            <Helmet>
                <link rel='icon' href={favicon}></link>
            </Helmet>
            <title>{pageTitle} | {data.site.siteMetadata.title}</title>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary p-3">
                <a className="navbar-brand header-logo" href="/" style={HeaderLogo}>RICCARDORION</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <FontAwesomeIcon icon={faBars}/>
                </button>

                <div className="collapse navbar-collapse text-uppercase" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/about">About Me</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/portfolio">Portfolio</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/blog">Blog</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/#contact">Contact</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/my-impossible-list">My Impossible List</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/#contact">Hire Me</a>
                        </li>
                    </ul>

                    <form className="form-inline d-flex position-search-bar" style={{width: `350px`}}>
                        <div className={`search ${isActive ? null : `open`}`}>
                            <input type="search" className="search-box" ref={(element) => {
                                searchField.current = element;
                            }}></input>
                            <span role="searchbox" className="search-button" onClick={ToggleClass} onKeyDown={ToggleClass} tabIndex={0}>
                                <FontAwesomeIcon icon={faSearch} className="search-icon"/>
                            </span>
                        </div>
                    </form>
                </div>
            </nav>

            <HomeTitleImage isHome={pageTitle}/>

            {/* Content */}
            <div className="container-fluid p-0">
                {children}
            </div>

            {/* Footer */}
            <div className="container-fluid text-center text-white py-3" style={{backgroundColor: `#3D4661`}}>
                <div className="row align-items-center">
                    <div className="col">
                        <span className="align-middle">© Riccardo Orion Feingold</span>
                    </div>

                    <div className="col">
                        <a className="btn btn-outline-light social-media-btn m-1" href="https://twitter.com/riccardorion" aria-label="Twitter"><FontAwesomeIcon icon={faTwitter}/></a>

                        <a className="btn btn-outline-light social-media-btn m-1" href="https://www.instagram.com/riccardorion/" aria-label="Instagram"><FontAwesomeIcon icon={faInstagram}/></a>

                        <a className="btn btn-outline-light social-media-btn m-1" href="https://www.linkedin.com/in/riccardofeingold/" aria-label="Linkedin"><FontAwesomeIcon icon={faLinkedin}/></a>

                        <a className="btn btn-outline-light social-media-btn m-1" href="https://github.com/riccardofeingold" aria-label="GitHub"><FontAwesomeIcon icon={faGithub}/></a>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Layout