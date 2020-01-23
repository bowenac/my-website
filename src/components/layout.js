/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Helmet from "react-helmet"

import Header from "./header"
import "../styles/style.css"

const Layout = ({ children }) => {

    const data = useStaticQuery(graphql`
        query SiteTitleQuery {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `)

    return (
        <>
            <Helmet>
                {/* Global site tag (gtag.js) - Google Analytics */}
                <script async src="https://www.googletagmanager.com/gtag/js?id=UA-24911586-1"></script>
                <script>{`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'UA-24911586-1');`}</script>
                {/* End Global site tag (gtag.js) - Google Analytics */}

                {/* Other scripts added to gatsby-ssr.js */}
                <html lang="en" />
            </Helmet>

            <Header siteTitle={data.site.siteMetadata.title} />

            <main>{children}</main>

            <footer id="colophon" class="site-footer">
                <div class="site-info container">
                    <div class="row">
                        <div class="col-sm-12 t-right">
                            <ul class="social">
                                <li><a target="_blank" href="https://github.com/bowenac" rel="noopener noreferrer" aria-label="My Github"><span className="icon-github"></span></a></li>
                                <li><a target="_blank" href="https://www.linkedin.com/in/adambowen81/" rel="noopener noreferrer" aria-label="My LinkedIn"><span className="icon-linkedin"></span></a></li>
                            </ul>
                            <p class="copyright">&copy; {new Date().getFullYear()} Adam Bowen</p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
