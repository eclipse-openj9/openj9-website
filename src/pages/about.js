import React from "react";
import Layout from "../components/layout";

/** @jsx jsx */
import { jsx, Styled } from "theme-ui";

import circlePatternBig from "../images/circle-pattern-big.svg";
import Card from "../components/card";
import Button from "../components/button";

export default () => (
  <Layout isHome={false}>
    <div sx={{ backgroundColor: "#F5F9FC", paddingX: "10%", paddingY: "5%" }}>
      <Styled.h1>More About OpenJ9</Styled.h1>
      <div
        sx={{
          backgroundColor: "white",
          paddingY: 5,
          paddingX: "5%",
          borderRadius: "card"
        }}
      >
        <Styled.h3>Our Story</Styled.h3>
        <Styled.p>
          This text should introduce the history of OpenJ9. It should discuss
          how it started, why it started, and what its goals are. This paragraph
          could recognize past achievements, new/existing initiatives and convey
          the important role that Open Source plays in helping OpenJ9 achieve
          its goals and empower its users. Etc, etc, etc….
        </Styled.p>
        <Button isLink={true} text="Call to Action" primary={true} />
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
      <Styled.h2>Our Sponsors</Styled.h2>
      <Styled.p>
        This text should reiterate the acheivements, goals, and continued work
        underway to frame the reason for this section, namely to recognize that
        none of this would be possible without the continued sponsorship and
        support of OpenJ9’s partners.
      </Styled.p>
      <div
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap"
        }}
      >
        <Card flex="0 0 400px" primary={false}>
          <h1>Sponsor Example</h1>
        </Card>
        <Card flex="0 0 400px" primary={false}>
          <h1>Sponsor Example</h1>
        </Card>
        <Card flex="0 0 400px" primary={false}>
          <h1>Sponsor Example</h1>
        </Card>
      </div>
    </div>
    <div
      sx={{
        backgroundImage: `url(${circlePatternBig})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        paddingY: 5,
        paddingX: "10%",
        height: "50vh",
        color: "white",
        display: ["none", "none", "block", "block"]
      }}
    >
      <div sx={{ marginTop: "5rem", marginLeft: "2rem", width: "40%" }}>
        <Styled.h2>Our Future</Styled.h2>
        <Styled.p sx={{ fontSize: 0 }}>
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
            minWidth: ["300px", "350px", "400px", "500px"]
          }}
        >
          <Styled.h3>DOCS</Styled.h3>
          <Styled.p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Styled.p>
          <Button isLink={true} text="Go To Docs" primary={true} />
        </article>
        <article
          sx={{
            flex: "30%",
            maxWidth: "600px",
            minWidth: ["300px", "350px", "400px", "500px"]
          }}
        >
          <Styled.h3>BLOGS</Styled.h3>
          <Styled.p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Styled.p>
          <Button isLink={true} text="Go To Blogs" primary={true} />
        </article>
      </div>
    </div>
  </Layout>
);
