import Layout from "../components/layout";
import Button from "../components/button";
import Card from "../components/card";

import openj9Circle from "../images/openj9-circle.svg";
import openj9Logo from "../images/openj9-logo.svg";
import circlePatternBig from "../images/circle-pattern-big.svg";
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
        <Styled.h1>Unleash the Power of Java</Styled.h1>
        <Styled.p>
          Optimized to run Java applications cost-effectively in the cloud,
          Eclipse OpenJ9 is a fast and efficient JVM that delivers power and
          performance when you need it most.
        </Styled.p>
        <Button isLink={true} text="Get OpenJ9" primary={true} />
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
      <Card flex="0 0 600px" primary={true}>
        <h1>Example card 1</h1>
      </Card>
      <Card flex="0 0 600px" primary={true}>
        <h1>Example card 1</h1>
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
        <Button isLink={true} text="Read Performance Details" primary={false} />
      </div>
      <Card flex="0 0 600px" primary={true}>
        <h1>Example card 1</h1>
      </Card>
      <Card flex="0 0 600px" primary={true}>
        <h1>Example card 1</h1>
      </Card>
    </div>
    <div
      sx={{
        padding: `calc(5% + 40px)`,
        backgroundColor: "#F5F9FC",
        minHeight: "50vh"
      }}
    >
      <Styled.h3>Join the Conversation</Styled.h3>
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
            marginBottom: ["6rem", "6rem", 0, 0],
            marginTop: ["1rem", 0, 0, 0]
          }}
        >
          <Styled.p sx={{width:"80%"}}>
            Interested in contributing to OpenJ9? Check out the contributor
            guide in our GitHub repository.
          </Styled.p>
          <Button isLink={true} text="OpenJ9 GitHub" primary={true} />
        </div>
        <div
          sx={{
            flex: "30%",
            maxWidth: "600px",
            minWidth: ["250px", "350px", "400px", "500px"]
          }}
        >
          <Styled.p sx={{width:"80%"}}>
            Have ideas about improvements for OpenJ9? Share them in our Slack
            workspace.
          </Styled.p>
          <Button isLink={true} text="OpenJ9 Slack" primary={true} />
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
        color: "lightText",
        paddingLeft: "15%"
      }}
    >
      <Styled.h2>
        Participate in the <br></br> Eclipse OpenJ9 Project
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
        <Styled.h3>BECOME A CONTRIBUTOR</Styled.h3>
        <Styled.p sx={{width:"90%"}}>
          Interested in contributing to OpenJ9? Check out the contributor guide
          in our Github repository.
        </Styled.p >
        <Button isLink={true} text="Contributor Guide" primary={true} />
      </div>
      <div
        sx={{
          flex: "30%",
          maxWidth: "600px",
          minWidth: ["250px", "350px", "400px", "500px"]
        }}
      >
        <Styled.h3>JOIN COMMUNITY CALLS</Styled.h3>
        <Styled.p sx={{width:"90%"}}>
          Our regular community hangouts are a great place to find out what is
          going on in the OpenJ9 project.
        </Styled.p>
        <Button isLink={true} text="Add to Calendar" primary={true} />
      </div>
    </div>
  </Layout>
);
