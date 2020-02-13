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
      </ul>
    </nav>
  </header>
);
