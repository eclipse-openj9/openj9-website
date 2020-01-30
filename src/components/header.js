import React from "react";
import { Link } from "gatsby";

import openJ9Logo from "../images/openJ9-header-logo.svg";
import slackIcon from "../images/slack-icon.svg";
import githubLogo from "../images/github-logo.svg";
import twitterLogo from "../images/twitter-logo.svg";

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
          <Link to="/about">ABOUT</Link>
        </li>
        <li>
          <a href="https://www.eclipse.org/openj9/docs/">DOCS</a>
        </li>
        <li>
          <Link to="/news">NEWS</Link>
        </li>
      </ul>
    </nav>
    <nav sx={{ flex: 1 }}>
      <ul sx={{ variant: "lists.navRow" }}>
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
  </header>
);
