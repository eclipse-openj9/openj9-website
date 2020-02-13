import Layout from "../components/layout";
import Button from "../components/button";
import Card from "../components/card";

import openj9Circle from "../images/openj9-circle.svg";
import openj9Logo from "../images/openj9-logo.svg";
import circlePatternBig from "../images/circle-pattern-big.svg";
import FortyTwoPercentStartup from "../images/forty-two-percent-startup.png";
import SixtySixPercentSmallerFootprint from "../images/sixty-six-percent-smaller-footprint.png";
import TwentyEightPercentFaster from "../images/twenty-eight-percent-faster.png";
import SixtyThreePercentSmallerFootprint from "../images/sixty-three-percent-smaller-footprint.png";
import adoptopenJDK from "../images/adopt-open-jdk.png";
import slackIcon from "../images/slack-icon.svg";
import githubIcon from "../images/github-logo.svg";

/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
export default () => (
  <Layout isHome={true}>
    <div
      sx={{
        backgroundColor: "primary",
        color: "lightText",
        display: "flex",
        minHeight: "500px",
        flexDirection: ["column", "column", "row", "row"],
        paddingBottom: ["4rem", "4rem", 0, 0]
      }}
    >
      <div
        sx={{
          backgroundImage: `url(${openj9Circle})`,
          width: ["100%", "100%", "30%", "30%"],
          minHeight: "200px"
        }}
      ></div>
      <div
        sx={{
          height: "250px",
          width: "250px",
          borderRadius: "50%",
          backgroundColor: "#434343",
          position: "absolute",
          left: [
            "calc(50% - 125px)",
            "calc(50% - 125px)",
            "calc(30% - 125px)",
            "calc(30% - 125px)"
          ],
          top: ["70px", "70px", "125px", "125px"],
          border: "white solid 2px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <img src={openj9Logo}></img>
      </div>
      <section
        sx={{
          width: ["90%", "90%", "40%", "33%"],
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: ["center", null, "start", "start"],
          textAlign: ["center", null, "left", "left"],
          marginTop: ["8rem", "8rem", "3rem", "3rem"],
          marginLeft: ["5%", "5%", "20%", "15%"]
        }}
      >
        <Styled.h1>Unleash the power of Java</Styled.h1>
        <Styled.p>
          Optimized to run Java&trade; applications cost-effectively in the cloud, 
          Eclipse OpenJ9 is a fast and efficient JVM that delivers power and performance when you need it most.
        </Styled.p>
        <Styled.p>
          Grab a pre-built binary of OpenJDK with OpenJ9 from the AdoptOpenJDK community.
        </Styled.p>
        <Button isLink={true} primary={false} link="https://adoptopenjdk.net/releases.html?variant=openjdk8&jvmVariant=openj9" target={true}>
          <img sx={{
            width: "80%",
          }}src={adoptopenJDK} alt="adoptopenJDK Logo"></img>
        </Button>
      </section>
    </div>
    <div
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        padding: "5%"
      }}
    >
      <Card flex="0 0 600px"  primary={true}>
        <Styled.h2>Application startup</Styled.h2>
        <img sx={{
          width:"50%",
          height:"50%"
        }}src={FortyTwoPercentStartup} alt="Eclipse Incubator Logo"></img>
        <Styled.p sx={{
          marginTop:"1rem"
        }}>42% faster</Styled.p>
      </Card>
      <Card flex="0 0 600px" primary={true}>
        <Styled.h2>Application startup</Styled.h2>
        <img sx={{
          width:"50%",
          height:"50%"
        }}src={SixtySixPercentSmallerFootprint} alt="Eclipse Incubator Logo"></img>
        <Styled.p sx={{
          marginTop:"1rem"
        }}>66% smaller footprint</Styled.p>
      </Card>
      <div
        sx={{
          flex: "1 2 100%",
          display: "flex",
          justifyContent: "center",
          marginY: 3,
          order: [1, 1, 1, 0]
        }}
      >
        <Button isLink={true} primary={false} link="/performance">Read performance details</Button>
      </div>
      <Card flex="0 0 600px" primary={true}>
        <Styled.h2>Application rampup</Styled.h2>
        <img sx={{
          width:"50%",
          height:"50%"
        }}src={TwentyEightPercentFaster} alt="Eclipse Incubator Logo"></img>
        <Styled.p sx={{
          marginTop:"1rem"
        }}>28% faster in the cloud</Styled.p>
      </Card>
      <Card flex="0 0 600px" primary={true}>
        <Styled.h2>Application rampup</Styled.h2>
        <img sx={{
          width:"50%",
          height:"50%"
        }}src={SixtyThreePercentSmallerFootprint} alt="Eclipse Incubator Logo"></img>
        <Styled.p sx={{
          marginTop:"1rem"
        }}>63% smaller footprint</Styled.p>
      </Card>
    </div>
    <div
      sx={{
        padding: `calc(5% + 40px)`,
        backgroundColor: "#F5F9FC",
        minHeight: "50vh"
      }}
    >
      <Styled.h3>Join the conversation</Styled.h3>
      <section
        sx={{
          display: "flex",
          flexWrap: "wrap",
          backgroundColor: "white",
          borderRadius: "card",
          padding: "5%",
          alignItems: "flex-end",
          justifyContent: "space-between"
        }}
      >
        <div
          sx={{
            flex: "30%",
            maxWidth: "600px",
            minWidth: ["250px", "350px", "400px", "500px"],
            marginBottom: ["6rem", "6rem", "6rem", 0],
            marginTop: ["1rem", 0, 0, 0]
          }}
        >
          <Styled.p sx={{width:"80%"}}>
            Ask questions and chat to our developers in the OpenJ9 slack community
          </Styled.p>
          <Button isLink={true} primary={false} target={true} link="https://openj9.slack.com/join/shared_invite/enQtNDU4MDI4Mjk0MTk2LWVhNTMzMGY1N2JkODQ1OWE0NTNmZjM4ZDcxOTBiMjk3NGFjM2U0ZDNhMmY0MDZlNzU0ZjAyNzQ1ODlmYjg3MjA">
            Join OpenJ9 slack
            <img sx={{
            width: "10%",
            marginLeft: "0.8rem"
          }}src={slackIcon} alt="slack Logo"></img>
          </Button>
        </div>
        <div
          sx={{
            flex: "30%",
            maxWidth: "600px",
            minWidth: ["250px", "350px", "400px", "500px"]
          }}
        >
          <Styled.p sx={{width:"80%"}}>
            If you hit a problem or you just have a suggestion, raise an issue in our GitHub repository
          </Styled.p>
          
          <Button isLink={true} primary={false} target={true} link="https://github.com/eclipse/openj9/issues">
            See OpenJ9 issues
            <img sx={{
            width: "10%",
            marginLeft: "0.8rem"
          }}src={githubIcon} alt="GitHub Logo"></img>
          </Button>
        </div>
      </section>
    </div>
    <div
      sx={{
        backgroundImage: `url(${circlePatternBig})`,
        height: "50vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        alignItems: "center",
        color: "white",
        paddingLeft: "15%"
      }}
    >
      <Styled.h2>
        Participate in the <br></br> Eclipse OpenJ9 project
      </Styled.h2>
    </div>
    <div
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        padding: "calc(5% + 40px)"
      }}
    >
      <div
        sx={{
          flex: "30%",
          maxWidth: "600px",
          minWidth: ["250px", "350px", "400px", "500px"],
          marginBottom: "2rem"
        }}
      >
        <Styled.h3>Become a contributor</Styled.h3>
        <Styled.p sx={{width:"90%"}}>
          Interested in contributing to OpenJ9? Check out the contributor guide in our GitHub repository. 
        </Styled.p >
        <Button isLink={true} primary={true} target={true} link="https://github.com/eclipse/openj9/blob/master/CONTRIBUTING.md">
          Contributor Guide
        </Button>
      </div>
      <div
        sx={{
          flex: "30%",
          maxWidth: "600px",
          minWidth: ["250px", "350px", "400px", "500px"]
        }}
      >
        <Styled.h3>Join community calls</Styled.h3>
        <Styled.p sx={{width:"90%"}}>
          Our regular community hangouts are a great place to find out what is
          going on in the OpenJ9 project.
        </Styled.p>
        <Button isLink={true} primary={true} target={true} link="https://calendar.google.com/calendar?cid=YjBnYjB0ZzNxaTZhb3NhZGZnbG0wa3BjY29AZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ">
          Add to Calendar
        </Button>
      </div>
    </div>
  </Layout>
);
