/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */
// Example of adding scripts
const React = require("react")
exports.onRenderBody = ({
    setHeadComponents,
    setPreBodyComponents,
    setPostBodyComponents,
}) => {
    setHeadComponents([

    ])
    setPreBodyComponents([

    ])
    setPostBodyComponents([
        <link
            key="grid"
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap-grid.min.css"
        />,
    ])
}