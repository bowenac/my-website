import React, { useState } from "react"
import Img from "gatsby-image"
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import SEO from "../components/seo"
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo';

export const homepageContent = graphql`
    query {
        wordpressPage(wordpress_id: {eq: 6}) {
            title
            content
            acf {
                background_color
                heading
                copy
                intro
                inside_image {
                    localFile {
                        childImageSharp {
                            fixed(width: 169, height: 300) {
                                ...GatsbyImageSharpFixed
                            }
                        }
                    }
                }
                projects {
                    image {
                        localFile {
                            childImageSharp {
                                fluid {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                    description
                    name
                    points {
                        label
                        point
                    }
                    tags {
                        tag
                    }
                    url
                }
            }
        }
    }
`

const CONTACT_MUTATION = gql`
    mutation CreateSubmissionMutation($clientMutationId: String!, $name: String!, $email: String!, $message: String!){
        createSubmission(input: {clientMutationId: $clientMutationId, name: $name, email: $email, message: $message}) {
            success
            data
        }
    }
`


const IndexPage = ({ data, location }) => {

    const [nameValue, setnameValue] = useState('')
    const [emailValue, setemailValue] = useState('')
    const [messageValue, setMessageValue] = useState('')

    return (
        <Layout>
            <SEO
                title="Home"
                description="Freelance Web Developer from Tacoma WA"
                keywords={[`freelance`, `web developer`, `gatsby`, `wordpress`, `javascript`, `react`, `tacoma wa`]}
                image="/images/ab-icon.png"
                pathname={location.pathname}
            />

            <section class="hero" style={{ background: data.wordpressPage.acf.background_color }}>
                <div class="container">
                    <div class="row">
                        <div class="col-md-4 t-center">
                            <Img fixed={data.wordpressPage.acf.inside_image.localFile.childImageSharp.fixed} />
                        </div>
                        <div className="col-md-8 waypoint" data-animation="slide-in-right">
                            <h1 dangerouslySetInnerHTML={{ __html: data.wordpressPage.acf.heading }}></h1>
                            {data.wordpressPage.acf.copy && <p>{data.wordpressPage.acf.copy}</p>}
                        </div>
                    </div>
                </div>
            </section>

            <section id="quote">
                <div class="container t-center">
                    <h2>"Do what you love, and you’ll never work another day in your life!"</h2>
                </div>
            </section>

            <section id="about">
                <div class="container">
                    <h2>{data.wordpressPage.title}</h2>
                    <div dangerouslySetInnerHTML={{ __html: data.wordpressPage.content }}></div>
                </div>
            </section>

            <section id="skills">
                <div class="container">
                    <h2>Skills</h2>
                    <p>Lots and lots of <i class="fas fa-coffee"></i></p>
                    <div class="row">
                        <div class="col-md-4">
                            <h3>CMS</h3>
                            <ul>
                                <li>WordPress, WooCommerce</li>
                                <li>Craft CMS</li>
                                <li>Strapi</li>
                                <li>Shopify</li>
                                <li>BigCommerce</li>
                                <li>Kentico</li>
                                <li>ProcessWire</li>
                            </ul>
                        </div>
                        <div class="col-md-4">
                            <h3>Code/Frameworks</h3>
                            <ul>
                                <li><i class="fab fa-react"></i>React, Gatsby <i class="fas fa-heart"></i></li>
                                <li><i class="fab fa-php"></i>PHP</li>
                                <li><i class="fas fa-database"></i>MySQL</li>
                                <li><i class="fab fa-html5"></i>HTML</li>
                                <li><i class="fab fa-css3"></i>CSS</li>
                                <li><i class="fab fa-js"></i>JavaScript, jQuery</li>
                            </ul>
                        </div>
                        <div class="col-md-4">
                            <h3>Other</h3>
                            <ul>
                                <li>Pantheon, WP Engine, AWS, Netlify</li>
                                <li>GIT, SVN (Github, Beanstalk)</li>
                                <li>Photoshop/XD</li>
                                <li>Sketch/Zeplin</li>
                                <li>GA/GTM</li>
                                <li>Marketo/HubSpot/Pardot</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section id="work">
                <div class="container">
                    <h2>Work</h2>
                    {data.wordpressPage.acf.intro && <p>{data.wordpressPage.acf.intro}</p>}
                    {data.wordpressPage.acf.projects.map(project => {
                        return (
                            <div class="row">
                                <div class="col-lg-4">
                                    {project.name && <h3>{project.name}</h3>}
                                    {project.points && <ul className="points">
                                        {project.points.map(point => {
                                            return (
                                                <li><strong>{point.label}:</strong> {point.point}</li>
                                            )
                                        })}
                                    </ul>}

                                    <div className="tags">
                                        {project.tags.map(tag => {
                                            return (
                                                <small>{tag.tag}</small>
                                            )
                                        })}
                                        <small>GIT</small>
                                        <small>HTML</small>
                                        <small>CSS</small>
                                        <small>Javascript</small>
                                    </div>
                                    {project.description && <p>{project.description}</p>}
                                    {project.url && <a class="btn" target="_blank" href="{project.url}">View Website</a>}
                                </div>
                                <div class="col-lg-8">
                                    <Img fluid={project.image.localFile.childImageSharp.fluid} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>

            <section id="contact">
                <div class="container">
                    <div class="waypoint animate" data-animation="slide-in-left">
                        <h2>Hire Me, or just say hi!</h2>
                    </div>
                    <div>
                        <Mutation mutation={CONTACT_MUTATION}>
                            {(createSubmission, { loading, error, data }) => (
                                <React.Fragment>
                                    <form className="contact-form"
                                        onSubmit={async event => {
                                            event.preventDefault()
                                            createSubmission({
                                                variables: {
                                                    clientMutationId: 'homeContactForm',
                                                    name: nameValue,
                                                    email: emailValue,
                                                    message: messageValue
                                                }
                                            })
                                        }}
                                    >
                                        <div className="row">
                                            <div className="col-md-6">
                                                <input
                                                    required
                                                    id='nameInput'
                                                    value={nameValue}
                                                    placeholder="Name"
                                                    onChange={event => {
                                                        setnameValue(event.target.value)
                                                    }}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <input
                                                    required
                                                    id='emailInput'
                                                    value={emailValue}
                                                    placeholder="Email"
                                                    onChange={event => {
                                                        setemailValue(event.target.value)
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <p>
                                            <textarea
                                                required
                                                id='messageInput'
                                                cols="40"
                                                rows="10"
                                                value={messageValue}
                                                placeholder="Message"
                                                onChange={event => {
                                                    setMessageValue(event.target.value)
                                                }}
                                            ></textarea>
                                        </p>
                                        <p>
                                            <button type="submit">Send</button>
                                            {loading && <p>Sending message...</p>}
                                            {error && <p>An unknown error has occured, please try again later... {error.message}</p>}
                                            {data && <p>Your message has been sent, thank you!</p>}
                                        </p>
                                    </form>
                                </React.Fragment>
                            )}
                        </Mutation>

                    </div>
                </div>
            </section>

        </Layout>
    )
}

export default IndexPage