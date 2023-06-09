// Copyright (c) 2017, 2023 IBM Corp. and others

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
// [2] https://openjdk.org/legal/assembly-exception.html

// SPDX-License-Identifier: EPL-2.0 OR Apache-2.0 OR GPL-2.0-only WITH Classpath-exception-2.0 OR GPL-2.0-only WITH OpenJDK-assembly-exception-1.0

// The project website pages cannot be redistributed

import slackIcon from "../images/slack-icon.svg";
import githubLogo from "../images/github-logo.svg";
import twitterLogo from "../images/twitter-logo.svg";
import incubatorLogo from "../images/incubator-logo.svg";
import stackoverflowLogo from "../images/stackoverflow-logo.svg";
import { Link } from "gatsby";
/** @jsx jsx */
import { jsx, Styled } from "theme-ui";

export default () => (
  <footer
    sx={{
      display: "flex",
      backgroundColor: "primary",
      color: "white",
      flexWrap: "wrap",
      padding: "1rem",
      paddingBottom: ["3rem", "3rem", "0", "0"],
      flexDirection: "reverse-column"
    }}
  >
      <section
      sx={{
        flex: "50%",
        display: ["flex", "none", "none", "none"],
        alignItems: ["center", "center", "flex-end", "flex-end"],
        flexDirection: "column"
      }}
    >
      <a href="https://wiki.eclipse.org/Development_Resources/Process_Guidelines/What_is_Incubation" rel="noopener noreferrer" target="_blank"><img src={incubatorLogo} alt="Eclipse Incubator Logo"></img></a>
      <Styled.h6 sx={{fontSize:"0.9rem"}} >OpenJ9 is an Eclipse Incubator Project</Styled.h6>
    </section>


    <nav sx={{ display: ["flex", "flex", "flex", "flex"],
          flex: ["100%", "50%", "50%","50%"], 
          flexDirection:["column", "row", "row", "row"],
          justifyContent:"center",
          a: {
            color: "white",
            textDecoration: "none",
            "&:hover": {
              color: "links",
            }
    }}}>
      <section sx={{ flex: 1, paddingLeft:["2rem", "0.8rem", "0.8rem", "0.8rem"],  marginRight:"1.1rem", padding:["1rem", 0], fontSize:["1rem", "0.9rem", "1rem", "1rem"]}}>
        <Styled.h4 sx={{marginBottom:"0.2rem"}}>Docs</Styled.h4>
        <ul sx={{ 
          variant: "lists.navCol",
          li: { 
            padding: 0,
          }
           }}>
          <li><a sx={{textDecoration:"none", color:"white"}}href="https://www.eclipse.org/openj9/docs/openj9_newuser/" rel="noopener noreferrer" target="_blank">New to OpenJ9?</a></li>
          <li><a sx={{textDecoration:"none", color:"white"}}href="https://www.eclipse.org/openj9/docs/introduction/" rel="noopener noreferrer" target="_blank">Getting started</a></li>
          <li><a sx={{textDecoration:"none", color:"white"}}href="https://www.eclipse.org/openj9/docs/cmdline_specifying/" rel="noopener noreferrer" target="_blank">Command-line options</a></li>
        </ul>
      </section>
      <section sx={{ flex: 1, paddingLeft:["2rem", "0.8rem", 0, 0], padding:["1rem", 0], fontSize:["1rem", "0.9rem", "1rem", "1rem"] }}>
        <Styled.h4 sx={{marginBottom:"0.2rem"}}>Resources</Styled.h4>
        <ul sx={{ variant: "lists.navCol",
          li: { 
            padding: 0,
          }
          }}>
          <li><Link sx={{textDecoration:"none", color:"white"}} to="/about">About</Link></li>
          <li><Link sx={{textDecoration:"none", color:"white"}} to="/performance">Performance</Link></li>
        </ul>
      </section>
      <section sx={{ flex: 1, paddingLeft:["2rem", 0, 0, 0], padding:["1rem", 0], fontSize:["1rem", "0.9rem", "1rem", "1rem"], marginLeft:[0,"1rem"] }}>
        <Styled.h4 sx={{marginBottom:"0.2rem"}}>Community</Styled.h4>
        <ul sx={{ variant: "lists.navCol",
          li: { 
            padding: 0,
          }
       }}>
          <li><Link sx={{textDecoration:"none", color:"white"}} to="/news">News</Link></li>
          <li><a sx={{textDecoration:"none", color:"white"}}href="https://blog.openj9.org/" rel="noopener noreferrer" target="_blank">Blogs</a></li>
        </ul>
      </section>
    </nav>
    <section
      sx={{
        flex: "25%",
        display: ["none","flex", "flex", "flex"],
        alignItems: ["center", "flex-end", "flex-end", "flex-end"],
        flexDirection: "column"
      }}
    >
      <Styled.h6 sx={{fontSize:"0.9rem", marginTop:"1.3rem", marginLeft:"0.6rem"}}>OpenJ9 is an Eclipse Incubator Project</Styled.h6>
      <a href="https://wiki.eclipse.org/Development_Resources/Process_Guidelines/What_is_Incubation" rel="noopener noreferrer" target="_blank"><img src={incubatorLogo} alt="Eclipse Incubator Logo"></img></a>
    </section>
    <div
      sx={{
        height: "0.15rem",
        backgroundColor: "secondary",
        width: "100%",
        marginY: 2
      }}
    ></div>
    <nav sx={{width:"70%"}}>
      <ul sx={{ 
        display: "flex", flexDirection:["column", "row", "row", "row"],
        li: { 
          padding: "0.4rem",
          fontSize: ["0.9rem", "0.7rem", "1rem", "1rem"],
          listStyleType: "none",
          paddingLeft:"1rem",
          color:"white",
        },
         a: {
          color: "white",
          textDecoration: "none",
          "&:hover": {
            color: "links",
          }
        }
        }}>
          
        <li sx={{ paddingLeft:["1rem", "0rem !important", "0.5rem !important", "0.5 !important"]}}><a sx={{textDecoration:"none", color:"white"}}href="https://www.eclipse.org/" rel="noopener noreferrer" target="_blank">Eclipse Foundation Website </a></li>
        <li><a sx={{textDecoration:"none", color:"white"}}href="https://www.eclipse.org/legal/privacy.php" rel="noopener noreferrer" target="_blank">Privacy Policy</a></li>
        <li><a sx={{textDecoration:"none", color:"white"}}href="https://www.eclipse.org/legal/termsofuse.php" rel="noopener noreferrer" target="_blank">Terms of Use</a></li>
        <li><a sx={{textDecoration:"none", color:"white"}}href="https://www.eclipse.org/legal/copyright.php" rel="noopener noreferrer" target="_blank">Copyright Agent</a></li>
        <li><a sx={{textDecoration:"none", color:"white"}}href="https://www.eclipse.org/legal/" rel="noopener noreferrer" target="_blank">Legal</a></li>
      </ul>
    </nav>
    <nav sx={{ display: ["inline", "inline", "block", "block"], flex: "30%" }}>
      <ul sx={{ variant: "lists.navRow", justifyContent: ["center", "flex-end","flex-end", "flex-end"] }}>
        <li> 
          <a href="https://twitter.com/openj9/" rel="noopener noreferrer" target="_blank"> <img src={twitterLogo} alt="Twitter Logo"></img></a>
        </li>
        <li>
          <a href="https://github.com/eclipse-openj9/openj9" rel="noopener noreferrer" target="_blank"> <img src={githubLogo} alt="GitHub Logo"></img></a>
        </li>
        <li>
          <a href="https://openj9.slack.com/" rel="noopener noreferrer" target="_blank"><img src={slackIcon} alt="Slack logo"></img></a>
        </li>
        <li>
          <a href="https://stackoverflow.com/search?q=%23OpenJ9" rel="noopener noreferrer" target="_blank"><img src={stackoverflowLogo} alt="Stack Overflow logo"></img></a>
        </li>
      </ul>
    </nav>
  </footer>
);
