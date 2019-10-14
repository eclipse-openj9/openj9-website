import React from "react"

import Layout from "../components/layout"
import { Link } from "gatsby";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import githubIcon from "../images/github_icon.svg";
import twitterIcon from "../images/twitter_icon.svg";
import slackIcon from "../images/slack_icon.svg";
import Tile from "../components/tile";

const AboutPage = () => (
    <Layout>
        <Navbar className="text-light bg-dark desktop-only">
            <Nav>
                <Nav.Link className="nav-link" href="/">OpenJ9</Nav.Link>
            </Nav>
            <Nav className="ml-auto">
                <Nav.Link className="nav-link" href="/about">About</Nav.Link>
                <Nav.Link className="nav-link" href="#link">Docs</Nav.Link>
                <Nav.Link className="nav-link" href="#link">News</Nav.Link>
                <Nav.Link href="#"><img className="navbar-img" src={ githubIcon } alt=""></img></Nav.Link>
                <Nav.Link href="#"><img id="twitter-nav" className="navbar-img" src={ twitterIcon } alt=""></img></Nav.Link>
                <Nav.Link href="#"><img className="navbar-img" src={ slackIcon } alt=""></img></Nav.Link>
            </Nav>
        </Navbar>

        <section className="landing-section light-gray-background">
            <div className="desktop-only">
                <h2 className="light-gray-section-heading">More About OpenJ9</h2>
            </div>
            <div className="card desktop-only ">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="light-gray-card-text">Interested in contributing to OpenJ9? Check out the contributor guide in our Github repository.</p>
                            <Link to="#" className="btn btn-primary light-gray-section-button" role="button">Call to Action</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mobile-only">
                <h2 className="light-gray-section-heading-mobile">More About OpenJ9</h2>
                <div className="row">
                    <p className="light-gray-card-text">Interested in contributing to OpenJ9? Check out the contributor guide in our Github repository.</p>
                    <Link to="#" className="btn btn-primary light-gray-section-button" role="button">OpenJ9 GitHub</Link>
                </div>
            </div>
        </section>

        <section className="bg-gray-img">
            <div className="our-sponsors row">
                <Tile heading="Sponsor Name" desc="Sponsorship and support via" className="sponsor-tile col-xs-12"/>
                <Tile heading="Sponsor Name" desc="Sponsorship and support via" className="sponsor-tile col-xs-12"/>
                <Tile heading="Sponsor Name" desc="Sponsorship and support via" className="sponsor-tile col-xs-12"/>
            </div>
        </section>

        <section className="landing-section light-gray-background">
        <div className="desktop-only">
            <h2 className="light-gray-section-heading">Our Future</h2>
        </div>
        <div className="card desktop-only ">
            <div className="container">
            <div className="row">
                <div className="col">
                <p className="light-gray-card-text">Interested in contributing to OpenJ9? Check out the contributor guide in our Github repository.</p>
                <Link to="#" className="btn btn-primary light-gray-section-button" role="button">Go to Docs</Link>
                </div>
                <div className="col">
                <p className="light-gray-card-text">Interested in contributing to OpenJ9? Check out the contributor guide in our Github repository.</p>
                <Link to="#" className="btn btn-primary light-gray-section-button" role="button">Go to  Blogs</Link>
                </div>
            </div>

            </div>
        </div>
        <div className="container mobile-only">
            <h2 className="light-gray-section-heading-mobile">Join the Conversation</h2>
            <div className="row">
                <p className="light-gray-card-text">Interested in contributing to OpenJ9? Check out the contributor guide in our Github repository.</p>
                <Link to="#" className="btn btn-primary light-gray-section-button" role="button">Go to Docs</Link>
                <p className="light-gray-card-text">Interested in contributing to OpenJ9? Check out the contributor guide in our Github repository.</p>
                <Link to="#" className="btn btn-primary light-gray-section-button" role="button">Go to Blogs</Link>
            </div>
        </div>

        </section>
    </Layout>
)

export default AboutPage
