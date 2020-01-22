const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV
console.log(`Using environment config: '${activeEnv}'`)
require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
    siteMetadata: {
        title: `Adam Bowen`,
        titleTemplate: "%s · %s",
        url: `https://adamcbowen.com`, // No trailing slash allowed!
        description: `Freelance Web Developer from Tacoma WA`,
        image: "/images/ab-icon.png", // Path to your image you placed in the 'static' folder
        twitterUsername: `@bowenac`, // Will show meta twitter:creator if used e.g. @gatsbyjs
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `adamcbowen.com`,
                short_name: `adamcbowen`,
                start_url: `/`,
                background_color: `#F5A`,
                theme_color: `#F5A`,
                display: `minimal-ui`,
                icon: `src/images/ab-icon.png`, // This path is relative to the root of the site.
            },
        },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
        {
            resolve: 'gatsby-background-image',
            options: {
                // add your own characters to escape, replacing the default ':/'
                specialChars: '/:',
            },
        },
        {
            resolve: `gatsby-source-wordpress`,
            options: {
                /*
                 * The base URL of the WordPress site without the trailingslash and the protocol. This is required.
                 * Example : 'dev-gatbsyjswp.pantheonsite.io' or 'www.example-site.com'
                 */
                baseUrl: process.env.GATSBY_WORDPRESS_SOURCE_URL,
                protocol: `https`,
                hostingWPCOM: false,
                useACF: true,
            },
        },
        {
            resolve: 'gatsby-plugin-apollo',
            options: {
                uri: process.env.GATSBY_WORDPRESS_GRAPHQL_URL
            }
        }
    ],
}
