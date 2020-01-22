import { Link, useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => {
    const data = useStaticQuery(graphql`
        query WordPressMenu {
            allWordpressMenusMenusItems(filter: {name: {eq: "menu"}}) {
                nodes {
                    items {
                        title
                        url
                    }
                }
            }
        }
    `)

    return (
        <>
            <header id="masthead" className="site-header">
                <div className="container">
                    <div className="site-branding">
                        <Link to="/" rel="home">{siteTitle}</Link>
                    </div>
                    <nav id="site-navigation" className="main-navigation">
                        <button className="menu-toggle" aria-controls="primary-menu" aria-expanded="false"></button>
                        <ul id="primary-menu" className="menu">
                            <li><a href="/#about">About</a></li>
                            <li><a href="/#skills">Skills</a></li>
                            <li><a href="/#work">Work</a></li>
                            <li><a href="/#contact">Contact</a></li>
                            {/* {data.allWordpressMenusMenusItems.nodes[0].items.map(item => {
                                return (
                                    <li><a href={item.url}>{item.title}</a></li>
                                )
                            })} */}
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    )
}

Header.propTypes = {
    siteTitle: PropTypes.string,
}

Header.defaultProps = {
    siteTitle: ``,
}

export default Header