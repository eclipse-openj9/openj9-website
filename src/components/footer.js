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
    <nav sx={{ display: ["none", "none", "flex", "flex"], flex: "50%" }}>
      <section sx={{ flex: 1 }}>
        <Styled.h5>Docs</Styled.h5>
        <ul sx={{ variant: "lists.navCol" }}>
          <li>New to OpenJ9</li>
          <li>Getting Started</li>
          <li>Command Line Options</li>
        </ul>
      </section>
      <section sx={{ flex: 1 }}>
        <Styled.h5>Resources</Styled.h5>
        <ul sx={{ variant: "lists.navCol" }}>
          <li>About</li>
          <li>Performance</li>
        </ul>
      </section>
      <section sx={{ flex: 1 }}>
        <Styled.h5>Community</Styled.h5>
        <ul sx={{ variant: "lists.navCol" }}>
          <li>News</li>
          <li>Blogs</li>
        </ul>
      </section>
    </nav>
    <section
      sx={{
        flex: "50%",
        display: "flex",
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
    <nav sx={{ flex: "50%" }}>
      <ul sx={{ variant: "lists.navRow", justifyContent: "flex-start" }}>
        <li>Privacy Policy</li>
        <li>Terms of Use</li>
        <li>Copyright Agent</li>
        <li>Legal</li>
      </ul>
    </nav>
    <nav sx={{ display: ["none", "none", "block", "block"], flex: "50%" }}>
      <ul sx={{ variant: "lists.navRow", justifyContent: "flex-end" }}>
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
