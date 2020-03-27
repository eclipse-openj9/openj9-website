// Copyright (c) 2017, 2020 IBM Corp. and others

// This program and the accompanying materials are made available under
// the terms of the Eclipse Public License 2.0 which accompanies this
// distribution and is available at https://www.eclipse.org/legal/epl-2.0/
// or the Apache License, Version 2.0 which accompanies this distribution and
// is available at https://www.apache.org/licenses/LICENSE-2.0.

// This Source Code may also be made available under the following
// Secondary Licenses when the conditions for such availability set
// forth in the Eclipse Public License, v. 2.0 are satisfied: GNU
// General Public License, version 2 with the GNU Classpath
// Exception [1] and GNU General Public License, version 2 with the
// OpenJDK Assembly Exception [2].

// [1] https://www.gnu.org/software/classpath/license.html
// [2] http://openjdk.java.net/legal/assembly-exception.html

// SPDX-License-Identifier: EPL-2.0 OR Apache-2.0 OR GPL-2.0 WITH Classpath-exception-2.0 OR LicenseRef-GPL-2.0 WITH Assembly-exception

// The project website pages cannot be redistributed

import { Link } from "gatsby";

import openJ9Logo from "../images/openJ9-header-logo.svg";
import slackIcon from "../images/slack-icon.svg";
import githubLogo from "../images/github-logo.svg";
import twitterLogo from "../images/twitter-logo.svg";
import stackoverflowLogo from "../images/stackoverflow-logo.svg";

/** @jsx jsx */
import { jsx } from "theme-ui";

export default ({ isHome }) => (
  <header
    sx={{
      display: ["none", "none", "flex", "flex"],
      backgroundColor: isHome ? "#00000000" : "primary",
      position: isHome ? "absolute" : null,
      width: "100%",
      color: "lightText",
      paddingX: 5,
      paddingY: 4,
      alignItems: "center"
    }}
  >
    <div
      sx={{
        flex: 1,
        opacity: isHome ? 0 : 1,
        pointerEvents: isHome ? "none" : "all"
      }}
    >
      <Link to="/">
        <img src={openJ9Logo} alt="OpenJ9 Logo"></img>
      </Link>
    </div>
    <nav sx={{ flex: 2 }}>
      <ul sx={{ variant: "lists.navRow" }}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <a href="https://www.eclipse.org/openj9/docs/" rel="noopener noreferrer" target="_blank">Docs</a>
        </li>
        <li>
          <Link to="/news">News</Link>
        </li>
      </ul>
    </nav>
    <nav sx={{ flex: 1 }}>
      <ul sx={{ variant: "lists.navRow" }}>
        <li> 
          <a href="https://twitter.com/openj9/" rel="noopener noreferrer" target="_blank"> <img src={twitterLogo} alt="Twitter Logo"></img></a>
        </li>
        <li>
          <a href="https://github.com/eclipse/openj9" rel="noopener noreferrer" target="_blank"> <img src={githubLogo} alt="GitHub Logo"></img></a>
        </li>
        <li>
          <a href="https://openj9.slack.com/" rel="noopener noreferrer" target="_blank"><img src={slackIcon} alt="Slack logo"></img></a>
        </li>
        <li>
          <a href="https://stackoverflow.com/search?q=%23OpenJ9" rel="noopener noreferrer" target="_blank"><img src={stackoverflowLogo} alt="Stack Overflow logo"></img></a>
        </li>
      </ul>
    </nav>
  </header>
);
