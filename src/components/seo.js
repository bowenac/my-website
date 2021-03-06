import React from "react"
import { Helmet } from "react-helmet"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

const SEO = ({ title, description, image, pathname, article }) => (
    <StaticQuery
        query={query}
        render={({
            site: {
                siteMetadata: {
                    defaultTitle,
                    defaultDescription,
                    siteUrl,
                    defaultImage,
                    twitterUsername,
                },
            },
        }) => {
            const seo = {
                siteTitle: defaultTitle,
                title: title || defaultTitle,
                description: description || defaultDescription,
                image: `${siteUrl}${image || defaultImage}`,
                url: `${siteUrl}${pathname || "/"}`,
            }

            return (
                <>
                    <Helmet title={seo.title} titleTemplate={`${seo.title} | ${seo.siteTitle}`}>
                        {seo.url && <link rel="canonical" href={seo.url} />}
                        <meta name="description" content={seo.description} />
                        <meta name="image" content={seo.image} />
                        {article === true ? (
                            <meta property="og:type" content="article" />
                        ) : (
                                <meta property="og:type" content="website" />
                            )}

                        {seo.url && <meta property="og:url" content={seo.url} />}

                        {seo.siteTitle && <meta property="og:site_name" content={seo.siteTitle} />}

                        {seo.title && <meta property="og:title" content={`${seo.title} - ${seo.siteTitle}`} />}
                        {seo.description && (
                            <meta property="og:description" content={seo.description} />
                        )}
                        {seo.image && <meta property="og:image" content={seo.image} />}
                        <meta name="twitter:card" content="summary_large_image" />
                        {twitterUsername && (
                            <meta name="twitter:creator" content={twitterUsername} />
                        )}
                        {seo.title && <meta name="twitter:title" content={`${seo.title} - ${seo.siteTitle}`} />}
                        {seo.description && (
                            <meta name="twitter:description" content={seo.description} />
                        )}
                        {seo.image && <meta name="twitter:image" content={seo.image} />}
                    </Helmet>
                </>
            )
        }}
    />
)

export default SEO

SEO.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    pathname: PropTypes.string,
    article: PropTypes.bool,
}

SEO.defaultProps = {
    title: null,
    description: null,
    image: null,
    pathname: null,
    article: false,
}

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        defaultDescription: description
        siteUrl: url
        defaultImage: image
        twitterUsername
      }
    }
  }
`