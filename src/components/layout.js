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
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap-grid.min.css" />
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous" />
            </Helmet>

            <Header siteTitle={data.site.siteMetadata.title} />

            <main>{children}</main>

            <footer id="colophon" class="site-footer">
                <div class="site-info container">
                    <div class="row">
                        <div class="col-sm-12 t-right">
                            <ul class="social">
                                <li><a target="_blank" href="https://github.com/bowenac" rel="noopener noreferrer"><i class="fab fa-github"></i></a></li>
                                <li><a target="_blank" href="https://www.linkedin.com/in/adambowen81/" rel="noopener noreferrer"><i class="fab fa-linkedin-in"></i></a></li>
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
