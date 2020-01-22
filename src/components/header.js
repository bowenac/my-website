import { Link } from "gatsby"
import React from "react"
import PropTypes from "prop-types"

class Header extends React.Component {

    state = { showMenu: false }

    toggleMenu = () => {
        this.setState({
            showMenu: !this.state.showMenu
        })
    }
    closeMenu = () => {
        this.setState({
            showMenu: false
        })
    }

    render() {
        const menuActive = this.state.showMenu ? 'expanded' : '';
        const siteTitle = this.props.siteTitle;
        return (
            <header id="masthead" className="site-header">
                <div className={`container ${menuActive}`}>
                    <div className="site-branding">
                        <Link to="/" rel="home">{siteTitle}</Link>
                    </div>
                    <nav id="site-navigation" className="main-navigation">
                        <div role="button" className="hamburger" tabIndex={0} onClick={this.toggleMenu} onKeyPress={this.toggleMenu}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <ul id="primary-menu" className="menu">
                            <li><a onClick={this.closeMenu} href="/#about">About</a></li>
                            <li><a onClick={this.closeMenu} href="/#skills">Skills</a></li>
                            <li><a onClick={this.closeMenu} href="/#work">Work</a></li>
                            <li><a onClick={this.closeMenu} href="/#contact">Contact</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
        )
    }
};
Header.propTypes = {
    siteTitle: PropTypes.string,
}

Header.defaultProps = {
    siteTitle: ``,
}
export default Header