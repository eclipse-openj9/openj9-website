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

import Layout from "../components/layout";
import Button from "../components/button";
import Card from "../components/card";

import openj9Circle from "../images/openj9-circle.svg";
import openj9Logo from "../images/openj9-logo.svg";
import circlePatternBig from "../images/circle-pattern-big.svg";
import adoptopenJDK from "../images/adopt-open-jdk.png";
import whiteSlackIcon from "../images/white-slack-logo.svg"
import githubIcon from "../images/github-logo.svg";
import {Link} from "gatsby"

/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
export default () => (
  <Layout isHome={true}>
    <section
      sx={{
        backgroundColor: "primary",
        color: "lightText",
        display: "flex",
        minHeight: "32rem",
        flexDirection: ["column", "column", "row", "row"],
        paddingBottom: ["4rem", "4rem", 0, 0]
      }}
    >
      <div
        sx={{
          backgroundImage: `url(${openj9Circle})`,
          width: ["100%", "100%", "30%", "30%"],
          minHeight: "12.5rem"
        }}
      ></div>
      <div
        sx={{
          height: "15rem",
          width: "15rem",
          borderRadius: "50%",
          backgroundColor: "#434343",
          position: "absolute",
          left: [
            "calc(50% - 8rem)",
            "calc(50% - 8rem)",
            "calc(30% - 8rem)",
            "calc(30% - 8rem)"
          ],
          top: ["4.5rem", "4.5rem", "8rem", "8rem"],
          border: "white solid 0.15rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <img src={openj9Logo} alt="OpenJ9 Logo"></img>
      </div>
      <div
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
        <Button primary={false} link="https://adoptopenjdk.net/releases.html?variant=openjdk8&jvmVariant=openj9" target={true}>
          <img sx={{
            width: "80%",
          }}src={adoptopenJDK} alt="adoptopenJDK Logo"></img>
        </Button>
      </div>
    </section>
    <section sx={{
      display: "grid",
      gridGap:'3rem',
      gridTemplateColumns:'repeat(1, 1fr)'
    }}>
      <div
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          padding: "5% 5% 0 5%",
        }}
      >
        <Card width="18rem" primary={false}>
        <i className="fas fa-rocket fa-5x"></i>
          <Styled.h4 sx={{textAlign:"center", marginBottom:"0.25rem"}}>Optimized for the Cloud</Styled.h4>
          <Styled.p sx={{textAlign:"center"}}>for microservices and monoliths too!</Styled.p>
        </Card>

        <Card width="18rem" primary={false}>
        <i className="fas fa-tachometer-alt fa-5x"></i>
          <Styled.h4 sx={{textAlign:"center", marginBottom:"0.25rem"}}>42% Faster Startup</Styled.h4>
          <Styled.p sx={{textAlign:"center"}}>over HotSpot</Styled.p>
        </Card>

        <Card width="18rem" primary={false}>
        <i className="fas fa-chart-line fa-5x"></i>
          <Styled.h4 sx={{textAlign:"center", marginBottom:"0.25rem"}}>28% Faster Ramp-up</Styled.h4>
          <Styled.p sx={{textAlign:"center"}}>when deployed to cloud vs HotSpot</Styled.p>
        </Card>

        <Card width="18rem"primary={false}>
        <i className="fas fa-archive fa-5x"></i>
          <Styled.h4 sx={{textAlign:"center", marginBottom:"0.25rem"}}>66% Smaller</Styled.h4>
          <Styled.p sx={{textAlign:"center"}}>when compared to HotSpot</Styled.p>
        </Card>
      </div>

      <div
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "5%"
        }}
      >
      <Link sx={{
          variant: "buttons.secondary",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textDecoration: "none",
          width:"15rem",
          }} 
        to="/performance">Read performance details</Link>

      </div>
    </section>
    
    <section
      sx={{
        padding: `calc(5% + 2.5rem)`,
        backgroundColor: "#F5F9FC",
        minHeight: "50vh"
      }}
    >
      <Styled.h3>Join the conversation</Styled.h3>
      <div
        sx={{
          display: "grid",
          gridGap:'6rem',
          gridTemplateColumns:['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)'],
          backgroundColor:'white',
          borderRadius:'card',
          padding:'5%',
        }}
      >
        <div
          sx={{
            display:'flex',
            flexDirection:'column',
            justifyContent:'space-between'
          }}
        >
          <Styled.p>
            Join us on Slack where you can ask questions and chat directly with our developers.
            Whether you simply have a question about using OpenJ9, an idea for improvement,
            or a problem you want to discuss, we'd love to hear from you.
          </Styled.p>
          <Button primary={false} target={true} widthChanged={false} link="https://openj9.slack.com/join/shared_invite/enQtNDU4MDI4Mjk0MTk2LWVhNTMzMGY1N2JkODQ1OWE0NTNmZjM4ZDcxOTBiMjk3NGFjM2U0ZDNhMmY0MDZlNzU0ZjAyNzQ1ODlmYjg3MjA">
            Join OpenJ9 slack
            <img sx={{
            width: "10%",
            marginLeft: "0.8rem",
          }}src={whiteSlackIcon} alt="slack Logo"></img>
          </Button>
        </div>
        <div
          sx={{
            display:'flex',
            flexDirection:'column',
            justifyContent:'space-between'
          }}
        >
          <Styled.p>
            Like all great open source projects, we have a vibrant and busy GitHub repository where you can create issues to explore ideas,
            request new features, or report any difficulties you are having. 
          </Styled.p>
          
          <Button primary={false} target={true} widthChanged={false} link="https://github.com/eclipse/openj9/issues">
            See OpenJ9 issues
            <img sx={{
            width: "10%",
            marginLeft: "0.8rem"
          }}src={githubIcon} alt="GitHub Logo"></img>
          </Button>
        </div>
      </div>
    </section>
    
    <section
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
    </section>
    <section
      sx={{
        display: "grid",
        gridGap:'6rem',
        gridTemplateColumns:['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)'],
        padding: "calc(5% + 2.5rem)"
      }}
    >
      <div
        sx={{
          display:'flex',
          flexDirection:'column',
          justifyContent:'space-between'
        }}
      >
        <Styled.h3>Become a contributor</Styled.h3>
        <Styled.p>
          We welcome contributions to the project in all shapes and forms.
          If you are interested in JVM development, we'd love to hear your ideas and help you collaborate with us on the code base.
          There are other ways you can contribute too, such as working on our website and docs. Be a part of the project and share in our success! 
        </Styled.p >
        <Button primary={true} target={true} link="https://github.com/eclipse/openj9/blob/master/CONTRIBUTING.md">
          Contributor Guide
        </Button>
      </div>
      <div
        sx={{
          display:'flex',
          flexDirection:'column',
          justifyContent:'space-between'
        }}
      >
        <Styled.h3>Join community calls</Styled.h3>
        <Styled.p>
          Our regular calls are a great place to find out what is going on in the project.
          As well as discussing our release plans and development status, we often feature lightning talks by members of the community.
          For example, technical deep dives or overviews about new features. To see agendas and recordings,
          look in the Slack #planning channel.
        </Styled.p>
        <Button primary={true} target={true} link="https://calendar.google.com/calendar?cid=YjBnYjB0ZzNxaTZhb3NhZGZnbG0wa3BjY29AZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ">
          Add to Calendar
        </Button>
      </div>
    </section>
  </Layout>
);
