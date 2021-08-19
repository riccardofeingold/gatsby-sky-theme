import React, {useRef, useState } from "react";
import Helmet from 'react-helmet'
import { useStaticQuery, graphql, Link} from 'gatsby'
import * as styles from './layout.module.scss'
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
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container p-3">
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

                        <div className={`${styles.search} ${isActive ? null : styles.open}`}>
                        <input type="search" className={styles.searchBox} ref={(element) => {
                            searchField.current = element;
                        }}></input>
                        <span role="searchbox" className={styles.searchButton} onClick={ToggleClass} onKeyDown={ToggleClass} tabIndex={0}>
                            <FontAwesomeIcon icon={faSearch} className={styles.searchIcon}/>
                        </span>
                        </div>
                    </div>
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
                        <Link className="btn btn-outline-light social-media-btn m-1" to="https://twitter.com/riccardorion"><FontAwesomeIcon icon={faTwitter}/></Link>

                        <Link className="btn btn-outline-light social-media-btn m-1" to="https://www.instagram.com/riccardorion/"><FontAwesomeIcon icon={faInstagram}/></Link>

                        <Link className="btn btn-outline-light social-media-btn m-1" to="https://www.linkedin.com/in/riccardofeingold/"><FontAwesomeIcon icon={faLinkedin}/></Link>

                        <Link className="btn btn-outline-light social-media-btn m-1" to="https://github.com/riccardofeingold"><FontAwesomeIcon icon={faGithub}/></Link>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Layout