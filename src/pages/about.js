import Layout from "../components/layout";

/** @jsx jsx */
import { jsx, Styled } from "theme-ui";

import ibmLogo from "../images/ibm-logo.svg";
import oregonStateUniLogo from "../images/oregon-state-university-logo.svg";
import newBrunswickUniLogo from "../images/uni-new-brunswick-logo.svg";
import adoptopenJDK from "../images/adopt-open-jdk.png";
import Card from "../components/card";
import Button from "../components/button";

export default () => (
  <Layout isHome={false}>
    <div sx={{ backgroundColor: "#F5F9FC", paddingX: "10%", paddingY: "5%" }}>
      <Styled.h1 sx={{marginBottom:"3rem"}}>More about OpenJ9</Styled.h1>
      <div
        sx={{
          backgroundColor: "white",
          paddingY: 5,
          paddingX: "5%",
          borderRadius: "card"
        }}
      >
        <Styled.h3>Our story</Styled.h3>
        <Styled.p>
          Eclipse OpenJ9 is a high performance, scalable, Java virtual machine (JVM) implementation that represents hundreds 
          of person-years of effort. Contributed to the Eclipse project by IBM, the OpenJ9 JVM underpins the IBM SDK, Java 
          Technology Edition product that is a core component of many IBM Enterprise software products. Continued development 
          of OpenJ9 at the Eclipse foundation ensures wider collaboration, fresh innovation, and the opportunity to influence 
          the development of OpenJ9 for the next generation of Java applications.
        </Styled.p>
      </div>
    </div>
    <div
      sx={{
        backgroundColor: "primary",
        color: "lightText",
        paddingX: "10%",
        paddingY: 5
      }}
    >
      <Styled.h2>Our supporters</Styled.h2>
      <Styled.p>
        The success of the OpenJ9 project is underpinned by the generosity of our supporters,
        to whom we would like to extend our thanks. This support comes in different forms; monetory,
        people, system, and data center resources. People resources help us to staff the planning, development,
        delivery, and support of OpenJ9 releases as well as pioneering new and innovative technologies.
        Dedicated systems and hosting services allow us to run automated build and test operations,
        which help ensure that quality and reliability is central to all our deliverables.
      </Styled.p>
      <div
        sx={{
          display: ["flex","none","none", "flex"],
          justifyContent: "space-between",
          flexWrap: "wrap"
        }}
      >
        <Card flex="0 0 260px" primary={false} borderTop={true}> 
          <img sx={{
            width: "50%", 
            height: "50%", 
          }}src={ibmLogo} alt="IBM Logo"></img>
        </Card>
        <Card flex="0 0 260px" primary={false} borderTop={true}> 
          <img sx={{
            width: ["50%", "50%", "50%", "90%"], 
            filter: "invert(100%)"
          }}src={adoptopenJDK} alt="IBM Logo"></img>
        </Card>
        <Card flex="0 0 260px" primary={false} borderTop={true}> 
          <img sx={{
            width: "50%", 
            height: "50%", 
          }}src={oregonStateUniLogo} alt="IBM Logo"></img>
        </Card>
        <Card flex="0 0 260px" primary={false} borderTop={true}> 
          <img sx={{
            width: "50%", 
            height: "50%", 
          }}src={newBrunswickUniLogo} alt="IBM Logo"></img>
        </Card>
      </div>

      <div
        sx={{
          display: ["none", "flex", "flex", "none"],
          justifyContent: "space-around",
          flexWrap: "wrap"
        }}
      >
        <Card flex="0 0 260px" primary={false} borderTop={true}> 
          <img sx={{
            width: "50%", 
            height: "50%", 
          }}src={ibmLogo} alt="IBM Logo"></img>
        </Card>
        <Card flex="0 0 260px" primary={false} borderTop={true}> 
          <img sx={{
            width: ["50%", "50%", "50%", "90%"], 
            filter: "invert(100%)"
          }}src={adoptopenJDK} alt="IBM Logo"></img>
        </Card>
        </div>
        <div
        sx={{
          display: ["none", "flex", "flex", "none"],
          justifyContent: "space-around",
          flexWrap: "wrap"
        }}
      >
        <Card flex="0 0 260px" primary={false} borderTop={true}> 
          <img sx={{
            width: "50%", 
            height: "50%", 
          }}src={oregonStateUniLogo} alt="IBM Logo"></img>
        </Card>
        <Card flex="0 0 260px" primary={false} borderTop={true}> 
          <img sx={{
            width: "50%", 
            height: "50%", 
          }}src={newBrunswickUniLogo} alt="IBM Logo"></img>
        </Card>
      </div>
    </div>
    <div
      sx={{
        backgroundColor: "#F5F9FC",
        paddingY: 5,
        paddingX: "5%",
        color: "black",
        display: "block"
      }}
    >
      <div sx={{ marginTop: "3rem", marginLeft: "5%"}}>
        <Styled.h2 sx={{fontSize:5}}>Our future</Styled.h2>
        <Styled.p sx={{ fontSize: 2, color:"black", width:"85%", maxHeight:"10%" }}>
          This section could be used as a way to communicate to potential
          contributors about the OpenJ9 project, and the important role that
          open source contributors play in helping to make OpenJ9 a resource
          that developers not only use, but contriibute to as well. The last
          line of this paragraph can be an invitation to check out whatever docs
          or content that would help them learn more about Contributor
          Guidelines for OpenJ9.
        </Styled.p>
      </div>
    </div>
    <div
      sx={{
        paddingX: "10%",
        paddingY: 5,
        backgroundColor: "#F5F9FC"
      }}
    >
      <div
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          backgroundColor: "white",
          paddingX: "5%",
          paddingY: "5%",
          borderRadius: "card"        
        }}
      >
        <article
          sx={{
            flex: "30%",
            maxWidth: "600px",
            minWidth: ["250px", "350px", "400px", "500px"],
            marginBottom:"4rem"
          }}
        >
          <Styled.h3>DOCS</Styled.h3>
          <Styled.p sx={{height:"10rem", marginBottom:["10rem", 0, 0, 0], width:"90%", paddingRight:["1rem", 0, 0, 0]}}>
            If you are new to OpenJ9, our documentation will help you get started. Out of the box, we expect you to discover a great experience,
            but we also have many tuning options to help you ramp up application performance.
          </Styled.p>
          <Button primary={true} link="https://www.eclipse.org/openj9/docs/" target={true}>Go to docs</Button>
        </article>
        <article
          sx={{
            flex: "30%",
            maxWidth: "600px",
            minWidth: ["250px", "350px", "400px", "500px"]
          }}
        >
          <Styled.h3>BLOGS</Styled.h3>
          <Styled.p sx={{height:"10rem", marginBottom:["10rem", 0, 0, 0],  width:"90%", paddingRight:["1rem", 0, 0, 0]}}>
            Our blogs are written by developers, for developers. Read about their insights into up and coming technologies,
            take deep dives into OpenJ9 development, or simply hear about their experiences of working on the project.
          </Styled.p>
          <Button primary={true} link="https://blog.openj9.org/" target={true}>Go to blogs</Button>
        </article>
      </div>
    </div>
  </Layout>
);
