import React from "react";

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from "gatsby";
import githubIcon from "../images/header_github_icon.svg";
import twitterIcon from "../images/header_twitter_icon.svg";
import slackIcon from "../images/header_slack_icon.svg";

const NavBar = () => (

  <Navbar className="mobile-only" expand="md">
    <Navbar.Brand>
      <Link id="brand-name" className="navbar-brand d-md-none" to="#">
          OpenJ9
      </Link>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav>
        <Nav.Link className="nav-link" href="/about">About</Nav.Link>
        <Nav.Link className="nav-link" href="#link">Docs</Nav.Link>
        <Nav.Link className="nav-link" href="#link">News</Nav.Link>
      </Nav>
      <Nav className="ml-auto">
        <Nav.Link href="#"><img className="navbar-img" src={ githubIcon } alt=""></img></Nav.Link>
        <Nav.Link href="#"><img id="twitter-nav" className="navbar-img mx-3" src={ twitterIcon } alt=""></img></Nav.Link>
        <Nav.Link href="#"><img className="navbar-img" src={ slackIcon } alt=""></img></Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default NavBar;
