// Copyright (c) 2017, 2019 IBM Corp. and others
// This program and the accompanying materials are made available under the terms of the Eclipse Public License 2.0 which accompanies this distribution and is available at http://eclipse.org/legal/epl-2.0 or the Apache License, Version 2.0 which accompanies this distribution and is available at https://www.apache.org/licenses/LICENSE-2.0. 
// This Source Code may also be made available under the following Secondary Licenses when the conditions for such availability set forth in the Eclipse Public License, v. 2.0 are satisfied: GNU General Public License, version 2 with the GNU Classpath Exception [1] and GNU General Public License, version 2 with the OpenJDK Assembly Exception [2]. 
// [1] https://www.gnu.org/software/classpath/license.html  
// [2] http://openjdk.java.net/legal/assembly-exception.html 
// SPDX-License-Identifier: EPL-2.0 OR Apache-2.0 OR GPL-2.0 WITH Classpath-exception-2.0 OR LicenseRef-GPL-2.0 WITH Assembly-exception
// The project website pages cannot be redistributed


import React from "react"

import Layout from "../components/layout"
import { Link } from "gatsby";
import Carousels from "../components/carousels";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import githubIcon from "../images/github_icon.svg";
import twitterIcon from "../images/twitter_icon.svg";
import slackIcon from "../images/slack_icon.svg";

const IndexPage = () => (
  <Layout>
    <section className="bg-img">
      <Navbar className="desktop-only">
        <Nav className="ml-auto">
          <Nav.Link className="nav-link" href="/about">About</Nav.Link>
          <Nav.Link className="nav-link" href="#link">Docs</Nav.Link>
          <Nav.Link className="nav-link" href="#link">News</Nav.Link>
          <Nav.Link href="#"><img className="navbar-img" src={ githubIcon } alt=""></img></Nav.Link>
          <Nav.Link href="#"><img id="twitter-nav" className="navbar-img" src={ twitterIcon } alt=""></img></Nav.Link>
          <Nav.Link href="#"><img className="navbar-img" src={ slackIcon } alt=""></img></Nav.Link>
        </Nav>
      </Navbar>
      <div className="top-section">
        <h1>Unleash the Power of Java</h1>
        <p>Optimized to run Java applications cost-effectively in the cloud, Eclipse OpenJ9 is a fast and efficient JVM that delivers power and performance when you need it most</p>
        <Link to="#" className="btn btn-primary" role="button">Get OpenJ9</Link>
      </div>
    </section>

    <section className="landing-section">
      <Carousels/>
      <Link to="#" className="btn btn-primary mt-5 mx-auto read-performance" role="button">READ PERFORMANCE DETAILS</Link>
    </section>

    <section className="landing-section light-gray-background">
      <div className="desktop-only">
        <h2 className="light-gray-section-heading">Join the Conversation</h2>
      </div>
      <div className="card desktop-only ">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="light-gray-card-text">Interested in contributing to OpenJ9? Check out the contributor guide in our Github repository.</p>
              <Link to="#" className="btn btn-primary light-gray-section-button" role="button">OpenJ9 GitHub</Link>
            </div>
            <div className="col">
              <p className="light-gray-card-text">Interested in contributing to OpenJ9? Check out the contributor guide in our Github repository.</p>
              <Link to="#" className="btn btn-primary light-gray-section-button" role="button">OpenJ9 Slack</Link>
            </div>
          </div>

        </div>
      </div>

      <div className="container mobile-only">
        <h2 className="light-gray-section-heading-mobile">Join the Conversation</h2>
        <div className="row">
            <p className="light-gray-card-text">Interested in contributing to OpenJ9? Check out the contributor guide in our Github repository.</p>
            <Link to="#" className="btn btn-primary light-gray-section-button" role="button">OpenJ9 GitHub</Link>
            <p className="light-gray-card-text">Interested in contributing to OpenJ9? Check out the contributor guide in our Github repository.</p>
            <Link to="#" className="btn btn-primary light-gray-section-button" role="button">OpenJ9 Slack</Link>
        </div>
      </div>

    </section>

    <section className="participation_section_bg">
    <hr className="participate-section-line"></hr>
    <h1 className="participate-section-text">Participate in the Eclipse OpenJ9 Project</h1>
    </section>

    <section className="landing-section participation-section-margin">
      <div className="container float-left participation-section">
        <h2 className="participation-section-heading">BECOME A CONTRIBUTOR</h2>
        <p>Interested in contributing to OpenJ9? Check out the contributor guide in our Github repository.</p>
        <Link to="#" className="btn btn-primary participation-section-button" role="button">CONTRIBUTOR GUIDE</Link>
      </div>
      <div className="desktop-only vertical-line"></div>
      <div className="container float-left participation-section" >
        <h2 className="participation-section-heading participation-section-heading-bottom">JOIN COMMUNITY CALLS</h2>
        <p>Interested in contributing to OpenJ9? Check out the contributor guide in our Github repository.</p>
        <Link to="#" className="btn btn-primary participation-section-button" role="button">ADD TO CALENDAR</Link>
      </div>
    </section>
  </Layout>
)

export default IndexPage
