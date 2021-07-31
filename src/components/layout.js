import * as React from 'react'
import { /*Link,*/ useStaticQuery, graphql } from 'gatsby'

import { 
    heading,
} from './layout.module.css'

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

    return (
        <main>
            <title>{pageTitle} | {data.site.siteMetadata.title}</title>
            {/* <p className={siteTitle}>{data.site.siteMetadata.title}</p> */}
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
                <div class="container-fluid">
                    <a id="header-logo" class="navbar-brand" href="/">RICCARDO</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i class="fas fa-bars"></i>
                    </button>

                    <div class="collapse navbar-collapse justify-content-center text-uppercase p" id="navbarSupportedContent">
                        <ul class="navbar-nav mx-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="/">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/about">About Me</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/portfolio">Portfolio</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/blog">Blog</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/#contact">Contact</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/my-impossible-list">My Impossible List</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/#contact">Hire Me</a>
                        </li>
                        </ul>

                        <div class="search">
                        <input type="search" class="search-box"></input>
                        <span class="search-button">
                            <span class="fas fa-search search-icon"></span>
                        </span>
                        </div>
                    </div>
                </div>
            </nav>
            {/* <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Riccardo Orion Feingold</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/about">About Me</Nav.Link>
                        <Nav.Link href="/blog">Blog</Nav.Link>
                    </Nav>
                </Container>
            </Navbar> */}
            {/* <nav>
                <ul className={navLinks}>
                    <li className={navLinkItem}>
                        <Link to="/" className={navLinkText}>
                            Home
                        </Link>
                    </li>
                    <li className={navLinkItem}>
                        <Link to="/about" className={navLinkText}>
                            About Me
                        </Link>
                    </li>
                    <li className={navLinkItem}>
                        <Link to="/blog" className={navLinkText}>
                            Blog
                        </Link>
                    </li>
                </ul>
            </nav> */}
            <div class="container">
                <h1 className={heading}>{pageTitle}</h1>
                {children}
            </div>
        </main>
    )
}

export default Layout