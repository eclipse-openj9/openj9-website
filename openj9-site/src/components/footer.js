// Copyright (c) 2017, 2019 IBM Corp. and others
// This program and the accompanying materials are made available under the terms of the Eclipse Public License 2.0 which accompanies this distribution and is available at http://eclipse.org/legal/epl-2.0 or the Apache License, Version 2.0 which accompanies this distribution and is available at https://www.apache.org/licenses/LICENSE-2.0. 
// This Source Code may also be made available under the following Secondary Licenses when the conditions for such availability set forth in the Eclipse Public License, v. 2.0 are satisfied: GNU General Public License, version 2 with the GNU Classpath Exception [1] and GNU General Public License, version 2 with the OpenJDK Assembly Exception [2]. 
// [1] https://www.gnu.org/software/classpath/license.html  
// [2] http://openjdk.java.net/legal/assembly-exception.html 
// SPDX-License-Identifier: EPL-2.0 OR Apache-2.0 OR GPL-2.0 WITH Classpath-exception-2.0 OR LicenseRef-GPL-2.0 WITH Assembly-exception
// The project website pages cannot be redistributed

import React from "react";

import githubIcon from "../images/github_icon.svg";
import twitterIcon from "../images/twitter_icon.svg";
import slackIcon from "../images/slack_icon.svg";
import egg from "../images/egg-incubation.png";

const Footer = () => {
    return (
        <footer>
          <div className="desktop-only">
            <img className="egg mobile-only" src={ egg } alt=""></img>
            <p className="float-right text-white mr-5">OpenJ9 is an Eclipse Incubator Project</p>
            <div className="desktop-footer-line">
              <ul className="row-xs-12 top-row-footer">
                <li className="footer-lists col-xs-12"><b>Docs</b></li>
                <li className="footer-lists col-xs-12"><b>Resources</b></li>
                <li className="footer-lists col-xs-12"><b>Community</b></li>
              </ul>
              <ul className="row-xs-12">
                <li className="footer-lists col-xs-12"><a href="#">New to OpenJ9</a></li>
                <li className="footer-lists col-xs-12"><a href="#">About</a></li>
                <li className="footer-lists col-xs-12"><a href="#">News</a></li>
              </ul>
              <img className="float-right egg mr-5 desktop-only" src={ egg } alt=""></img>
              <ul className="row-xs-12">
                <li className="footer-lists col-xs-12"><a href="#">Getting Started</a></li>
                <li className="footer-lists col-xs-12"><a href="#">Performance</a></li>
                <li className="footer-lists col-xs-12"><a href="#">Blogs</a></li>
              </ul>
              <ul className="row-xs-12">
                <li className="footer-lists col-xs-12"><a href="#">Command Line Options</a></li>
              </ul>
            </div>
          </div>

          <div className="mobile-only">
            <img className="egg mobile-only" src={ egg } alt=""></img>
            <p className="float-right text-white mr-5 incubator-description">OpenJ9 is an Eclipse Incubator Project</p>
            <ul className="below-footer-line-ul">
              <li className="footer-line-item"><a href="#"><b>Docs</b></a></li>
              <li className="footer-line-item"><a href="#">New to OpenJ9</a></li>
              <li className="footer-line-item"><a href="#">Getting Started</a></li>
              <li className="footer-line-item"><a href="#">Command Line Options</a></li>
           </ul>
          <ul className="footer-line-ul mt-4">
              <li className="footer-line-item"><a href="#"><b>Resources</b></a></li>
              <li className="footer-line-item"><a href="#">About</a></li>
              <li className="footer-line-item"><a href="#">Performance</a></li>
          </ul>

          <ul className="footer-line-ul mt-4">
              <li className="footer-line-item"><a href="#"><b>Community</b></a></li>
              <li className="footer-line-item"><a href="#">News</a></li>
              <li className="footer-line-item"><a href="#">Blogs</a></li>
          </ul>
          </div>

          <hr className="footer-line"></hr>
          <ul className="below-footer-line-ul">
              <li className="below-footer-line"><a href="#">Eclipse Foundation Website</a></li>
              <li className="below-footer-line"><a href="#">Privacy Policy</a></li>
              <li className="below-footer-line"><a href="#">Terms of Use</a></li>
              <li className="below-footer-line"><a href="#">Copyright Agent</a></li>
              <li className="below-footer-line mb-2"><a href="#">Legal</a></li>
              <li className="footer-social-media github-icon-footer" href="#"><img className="navbar-img" src={ githubIcon } alt=""></img></li>
              <li className="footer-social-media" href="#"><img id="twitter-nav" className="navbar-img" src={ twitterIcon } alt=""></img></li>
              <li className="footer-social-media slack-icon-footer" href="#"><img className="navbar-img" src={ slackIcon } alt=""></img></li>
          </ul>
        </footer>
    )
}

export default Footer;
