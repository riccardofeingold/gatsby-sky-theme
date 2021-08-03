import React, { useState } from "react";
import { useStaticQuery, graphql } from 'gatsby'
import * as styles from './layout.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faSearch } from '@fortawesome/free-solid-svg-icons'

const Layout = ({pageTitle, children}) => {
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
        setActive(!isActive);
    }
    return (
        <main>
            <title>{pageTitle} | {data.site.siteMetadata.title}</title>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">RICCARDO</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <FontAwesomeIcon icon={faCoffee}/>
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
                        <input type="search" className={`${styles.searchBox} ${isActive ? styles.blur : styles.focus}`}></input>
                        <span role="searchbox" className={styles.searchButton} onClick={ToggleClass} onKeyDown={ToggleClass} tabIndex={0}>
                            <FontAwesomeIcon icon={faSearch} className={styles.searchIcon}/>
                        </span>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="container">
                <h1 className={styles.heading}>{pageTitle}</h1>
                {children}
            </div>
        </main>
    )
}

export default Layout