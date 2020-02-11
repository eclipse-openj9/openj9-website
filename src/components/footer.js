import React from "react";
import slackIcon from "../images/slack-icon.svg";
import githubLogo from "../images/github-logo.svg";
import twitterLogo from "../images/twitter-logo.svg";
import incubatorLogo from "../images/incubator-logo.svg";
/** @jsx jsx */
import { jsx, Styled } from "theme-ui";

export default () => (
  <footer
    sx={{
      display: "flex",
      backgroundColor: "primary",
      color: "lightText",
      flexWrap: "wrap",
      paddingX: 5,
      paddingTop: 4, 
      paddingBottom: ["3rem", "0", "0", "0"]
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
      <img src={incubatorLogo} alt="Eclipse Incubator Logo"></img>
      <Styled.h6 sx={{fontSize:"0.8rem"}}>OpenJ9 is an Eclipse Incubator Project</Styled.h6>
    </section>


    <nav sx={{ display: ["flex", "flex", "flex", "flex"], flex: ["100%", "60%", "60%","60%"], flexDirection:["column", "row", "row", "row"], justifyContent:"center" }}>
      <section sx={{ flex: 1, paddingLeft:["2rem", "0.8rem", "0.8rem", "0.8rem"] }}>
        <Styled.h4 sx={{marginBottom:"0.2rem"}}>Docs</Styled.h4>
        <ul sx={{ 
          variant: "lists.navCol",
          li: { 
            padding: 0,
          }
           }}>
          <li>New to OpenJ9</li>
          <li>Getting Started</li>
          <li>Command Line Options</li>
        </ul>
      </section>
      <section sx={{ flex: 1, paddingLeft:["2rem", 0, 0, 0] }}>
        <Styled.h4 sx={{marginBottom:"0.2rem"}}>Resources</Styled.h4>
        <ul sx={{ variant: "lists.navCol",
          li: { 
            padding: 0,
          }
          }}>
          <li>About</li>
          <li>Performance</li>
        </ul>
      </section>
      <section sx={{ flex: 1, paddingLeft:["2rem", 0, 0, 0] }}>
        <Styled.h4 sx={{marginBottom:"0.2rem"}}>Community</Styled.h4>
        <ul sx={{ variant: "lists.navCol",
          li: { 
            padding: 0,
          }
       }}>
          <li>News</li>
          <li>Blogs</li>
        </ul>
      </section>
    </nav>
    <section
      sx={{
        flex: "20%",
        display: ["none","flex", "flex", "flex"],
        alignItems: ["center", "center", "flex-end", "flex-end"],
        flexDirection: "column"
      }}
    >
      <Styled.h5>OpenJ9 is an Eclipse Incubator Project</Styled.h5>
      <img src={incubatorLogo} alt="Eclipse Incubator Logo"></img>
    </section>
    <div
      sx={{
        height: "2px",
        backgroundColor: "secondary",
        width: "100%",
        marginY: 2
      }}
    ></div>
    <nav sx={{ display: "flex", flexDirection:["column", "row", "row", "row"] }}>
      <ul sx={{ 
        variant: ["lists.navRow", "lists.navRow", "lists.navRow","lists.navRow"],
        justifyContent: "flex-start",
        li: { 
          padding: ["0.4rem", 0, 0, 0],
          fontSize: ["0.7rem", "1rem", "1rem", "1rem"]
        },
        }}>
        <li>Privacy Policy</li>
        <li>Terms of Use</li>
        <li>Copyright Agent</li>
        <li>Legal</li>
      </ul>
    </nav>
    <nav sx={{ display: ["inline", "inline", "block", "block"], flex: "30%" }}>
      <ul sx={{ variant: "lists.navRow", justifyContent: ["center", "flex-end","flex-end", "flex-end"] }}>
        <li>
          <img src={twitterLogo} alt="Twitter Logo"></img>
        </li>
        <li>
          <img src={githubLogo} alt="GitHub Logo"></img>
        </li>
        <li>
          <img src={slackIcon} alt="Slack logo"></img>
        </li>
      </ul>
    </nav>
  </footer>
);
