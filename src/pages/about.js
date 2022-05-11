// Copyright (c) 2017, 2022 IBM Corp. and others

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

/** @jsx jsx */
import { jsx, Styled } from "theme-ui";

import ibmLogo from "../images/ibm-logo.svg";
import oregonStateUniLogo from "../images/oregon-state-university-logo.svg";
import newBrunswickUniLogo from "../images/uni-new-brunswick-logo.svg";
import adoptopenJDK from "../images/adopt-open-jdk.png";
import Card from "../components/card";
import Button from "../components/button";

export default () => (
  <Layout isHome={false} title="The Eclipse OpenJ9 story" description="With a rich heritage, OpenJ9 has the credentials to deliver quality and reliability.">
    <section sx={{ backgroundColor: "#F5F9FC", paddingX: "7%", paddingY: "4rem" }}>
      <Styled.h1 sx={{marginBottom:"3rem"}}>More about OpenJ9</Styled.h1>
      <div
        sx={{
          backgroundColor: "white",
          paddingY: "2rem",
          paddingX: "5%",
          borderRadius: "card"
        }}
      >
        <Styled.h2>Our story</Styled.h2>
        <Styled.p>
          Eclipse OpenJ9 is a high performance, scalable, Java virtual machine (JVM) implementation that represents hundreds 
          of person-years of effort. Contributed to the Eclipse project by IBM, the OpenJ9 JVM underpins the IBM SDK, Java 
          Technology Edition product that is a core component of many IBM Enterprise software products. Continued development 
          of OpenJ9 at the Eclipse foundation ensures wider collaboration, fresh innovation, and the opportunity to influence 
          the development of OpenJ9 for the next generation of Java applications.
        </Styled.p>
      </div>
    </section>
    <section
      sx={{
        backgroundColor: "primary",
        color: "lightText",
        paddingX: "7%",
        paddingY: "2rem"
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
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        <Card width="18rem" primary={false}> 
          <img sx={{
            width: "50%", 
            height: "50%", 
          }}src={ibmLogo} alt="IBM Logo"></img>
        </Card>
        <Card width="18rem" primary={false}> 
          <img sx={{
            width: "80%", 
            filter: "invert(100%)"
          }}src={adoptopenJDK} alt="AdoptOpenJDK Logo"></img>
        </Card>
        <Card width="18rem" primary={false}> 
          <img sx={{
            width: "50%", 
            height: "50%", 
          }}src={oregonStateUniLogo} alt="Oregon State University Logo"></img>
        </Card>
        <Card width="18rem" primary={false}> 
          <img sx={{
            width: "50%", 
            height: "50%", 
          }}src={newBrunswickUniLogo} alt="New Brunswick University Logo"></img>
        </Card>
      </div>
    </section>
    <section
      sx={{
        paddingX: "7%",
        paddingY: "4rem",
        backgroundColor: "#F5F9FC"
      }}
    >
      <div
        sx={{
          display: "grid",
          gridGap:'6rem',
          gridTemplateColumns:['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)'],
          backgroundColor: "white",
          paddingX: "5%",
          paddingY: "2rem",
          borderRadius: "card"        
        }}
      >
        <article
          sx={{
            display:'flex',
            flexDirection:'column',
            justifyContent:'space-between'
          }}
        >
          <Styled.h3>DOCS</Styled.h3>
          <Styled.p>
            If you are new to OpenJ9, our documentation will help you get started. Out of the box, we expect you to discover a great experience,
            but we also have many tuning options to help you ramp up application performance.
          </Styled.p>
          <Button primary={true} link="https://www.eclipse.org/openj9/docs/" target={true}>Go to docs</Button>
        </article>
        <article
          sx={{
            display:'flex',
            flexDirection:'column',
            justifyContent:'space-between'
          }}
        >
          <Styled.h3>BLOGS</Styled.h3>
          <Styled.p>
            Our blogs are written by developers, for developers. Read about their insights into up and coming technologies,
            take deep dives into OpenJ9 development, or simply hear about their experiences of working on the project.
          </Styled.p>
          <Button primary={true} link="https://blog.openj9.org/" target={true}>Go to blogs</Button>
        </article>
      </div>
    </section>
  </Layout>
);
