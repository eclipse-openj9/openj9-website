import slackIcon from "../images/slack-icon.svg";
import githubLogo from "../images/github-logo.svg";
import twitterLogo from "../images/twitter-logo.svg";
import incubatorLogo from "../images/incubator-logo.svg";
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
      paddingX: 5,
      paddingTop: 4, 
      paddingBottom: ["3rem", "3rem", "0", "0"]
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
          <li><a sx={{textDecoration:"none", color:"white"}}href="https://www.eclipse.org/openj9/docs/openj9_newuser/" rel="noopener noreferrer" target="_blank">New to OpenJ9</a></li>
          <li><a sx={{textDecoration:"none", color:"white"}}href="https://www.eclipse.org/openj9/docs/introduction/" rel="noopener noreferrer" target="_blank">Getting Started</a></li>
          <li><a sx={{textDecoration:"none", color:"white"}}href="https://www.eclipse.org/openj9/docs/cmdline_specifying/" rel="noopener noreferrer" target="_blank">Command Line Options</a></li>
        </ul>
      </section>
      <section sx={{ flex: 1, paddingLeft:["2rem", 0, 0, 0] }}>
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
      <section sx={{ flex: 1, paddingLeft:["2rem", 0, 0, 0] }}>
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
        flex: "20%",
        display: ["none","flex", "flex", "flex"],
        alignItems: ["center", "center", "flex-end", "flex-end"],
        flexDirection: "column"
      }}
    >
      <Styled.h5>OpenJ9 is an Eclipse Incubator Project</Styled.h5>
      <a href="https://wiki.eclipse.org/Development_Resources/Process_Guidelines/What_is_Incubation" rel="noopener noreferrer" target="_blank"><img src={incubatorLogo} alt="Eclipse Incubator Logo"></img></a>
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
          
        <li><a sx={{textDecoration:"none", color:"white"}}href="https://www.eclipse.org/" rel="noopener noreferrer" target="_blank">Eclipse Foundation Website </a></li>
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
          <a href="https://github.com/eclipse/openj9" rel="noopener noreferrer" target="_blank"> <img src={githubLogo} alt="GitHub Logo"></img></a>
        </li>
        <li>
          <a href="https://openj9.slack.com/" rel="noopener noreferrer" target="_blank"><img src={slackIcon} alt="Slack logo"></img></a>
        </li>
      </ul>
    </nav>
  </footer>
);
