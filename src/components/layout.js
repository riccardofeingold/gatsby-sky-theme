import React, {useRef, useState } from "react";
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import * as styles from './layout.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons'
import favicon from '../images/favicon.ico'
import { StaticImage } from 'gatsby-plugin-image'

function HomeTitleImage(props) {
    const isHome = props.isHome
    if (isHome === "Home") {
      return <div className="container-fluid p-0"><StaticImage alt="Riccardorion Braning Imgae © Riccardo Orion Feingold" src="../images/banner-blue-bg.png"/></div>
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
            <Helmet>
                <link rel='icon' href={favicon}></link>
            </Helmet>
            <title>{pageTitle} | {data.site.siteMetadata.title}</title>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand header-logo" href="/">RICCARDO</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <FontAwesomeIcon icon={faBars}/>
                    </button>

                    <div className="collapse navbar-collapse justify-content-center text-uppercase p" id="navbarSupportedContent">
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

            <div className="container">
                
                <h1 className={styles.heading}>{pageTitle}</h1>
                {children}
            </div>
        </main>
    )
}

export default Layout