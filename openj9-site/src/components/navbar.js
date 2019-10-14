// Copyright (c) 2017, 2019 IBM Corp. and others
// This program and the accompanying materials are made available under the terms of the Eclipse Public License 2.0 which accompanies this distribution and is available at http://eclipse.org/legal/epl-2.0 or the Apache License, Version 2.0 which accompanies this distribution and is available at https://www.apache.org/licenses/LICENSE-2.0. 
// This Source Code may also be made available under the following Secondary Licenses when the conditions for such availability set forth in the Eclipse Public License, v. 2.0 are satisfied: GNU General Public License, version 2 with the GNU Classpath Exception [1] and GNU General Public License, version 2 with the OpenJDK Assembly Exception [2]. 
// [1] https://www.gnu.org/software/classpath/license.html  
// [2] http://openjdk.java.net/legal/assembly-exception.html 
// SPDX-License-Identifier: EPL-2.0 OR Apache-2.0 OR GPL-2.0 WITH Classpath-exception-2.0 OR LicenseRef-GPL-2.0 WITH Assembly-exception
// The project website pages cannot be redistributed

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
