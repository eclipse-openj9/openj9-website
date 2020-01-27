import React from "react"
import Layout from "../components/layout"

/** @jsx jsx */
import { jsx } from "@emotion/core"

import openJ9Circle from "../images/openJ9-circle.svg"
import openJ9Logo from "../images/openj9-logo.svg"
import circlePatternBig from "../images/circle-pattern-big.svg"

export default () => (
  <Layout isHome={true}>
    <div
      css={{
        width: "100%",
        backgroundColor: "#434343",
        height: "50vh",
        display: "flex",
      }}
    >
      <div
        css={{
          backgroundImage: `url(${openJ9Circle})`,
          width: "30%",
          height: "100%",
        }}
      ></div>
      <div
        css={{
          height: "250px",
          width: "250px",
          borderRadius: "50%",
          backgroundColor: "#434343",
          marginLeft: "-8em",
          marginTop: "7em",
          border: "white solid 2px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={openJ9Logo}></img>
      </div>
      <section
        css={{
          color: "white",
          width: "33%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginLeft: "5%",
          h1: {
            fontSize: "2.5rem",
            fontWeight: 500,
            marginBottom: "0.7rem",
            marginTop: "3rem",
          },
          p: {
            lineHeight: "2rem",
            fontsize: "1.2rem",
            color: "#D8D8D8",
            marginBottom: "1.5rem",
          },
          button: {
            width: "150px",
            borderRadius: "23.5px",
            height: "35px",
            backgroundColor: "#5DA7A3",
            border: "none",
            color: "white",
            fontSize: "1rem",
            fontWeight: "500",
          },
        }}
      >
        <h1>Unleash the Power of Java</h1>
        <p>
          Optimized to run Java applications cost-effectively in the cloud,
          Eclipse OpenJ9 is a fast and efficient JVM that delivers power and
          performance when you need it most.
        </p>
        <button>Get OpenJ9</button>
      </section>
    </div>
    <div
      css={{
        display: "grid",
        gridTemplateColumns: "10% auto auto auto 10%",
        gridTemplateRows: "repeat(3, auto)",
        gridRowGap: "50px",
        padding: "150px 0 150px 0",
      }}
    >
      <article
        css={{
          width: "500px",
          height: "200px",
          boxShadow: "#DADADA 0 0 20px",
          borderRadius: "10px",
          gridColumn: "2/3",
          gridRow: "1/2",
          borderTop: "#5DA7A3 10px solid",
        }}
      ></article>
      <article
        css={{
          width: "500px",
          height: "200px",
          boxShadow: "#DADADA 0 0 20px",
          borderRadius: "10px",
          gridColumn: "4/5",
          gridRow: "1/2",
          borderTop: "#5DA7A3 10px solid",
        }}
      ></article>
      <button
        css={{
          backgroundColor: "#5DA7A3",
          border: "none",
          color: "white",
          fontSize: "1rem",
          fontWeight: "500",
          gridColumn: "3/4",
          gridRow: "2/3",
          width: "300px",
          borderRadius: "23.5px",
          height: "50px",
          justifySelf: "center",
        }}
      >
        READ PERFORMANCE DETAILS
      </button>
      <article
        css={{
          width: "500px",
          height: "200px",
          boxShadow: "#DADADA 0 0 20px",
          borderRadius: "10px",
          gridColumn: "2/3",
          gridRow: "3/4",
          borderTop: "#5DA7A3 10px solid",
        }}
      ></article>
      <article
        css={{
          width: "500px",
          height: "200px",
          boxShadow: "#DADADA 0 0 20px",
          borderRadius: "10px",
          gridColumn: "4/5",
          gridRow: "3/4",
          borderTop: "#5DA7A3 10px solid",
        }}
      ></article>
    </div>
    <div
      css={{
        backgroundColor: "#F5F9FC",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "150px 0 150px 0",
      }}
    >
      <h2
        css={{
          alignSelf: "start",
          marginLeft: "10%",
          marginBottom: "50px",
        }}
      >
        Join the Conversation
      </h2>
      <section
        css={{
          display: "grid",
          gridTemplateColumns: "3% 2fr 1fr 3%",
          gridTemplateRows: "repeat(4, auto)",
          gridRowGap: "10px",
          backgroundColor: "white",
          width: "80%",
          borderRadius: "30px",
          padding: "3% 0 3% 0",
          boxSizing: "border-box",
        }}
      >
        <p
          css={{
            gridColumn: "2/3",
            gridRow: "1/2",
            height: "50px",
            width: "40%",
          }}
        >
          Have ideas about improvements for OpenJ9? Share them in our Slack
          workspace.
        </p>
        <button
          css={{
            gridColumn: "2/3",
            gridRow: "2/3",
            width: "200px",
            borderRadius: "23.5px",
            height: "50px",
            backgroundColor: "#5DA7A3",
            border: "none",
            color: "white",
            fontSize: "1rem",
            fontWeight: "500",
          }}
        >
          OpenJ9 Slack
        </button>
        <p
          css={{
            gridColumn: "2/3",
            gridRow: "3/4",
            height: "50px",
            width: "40%",
          }}
        >
          Need help? Use the #OpenJ9 tag in Stack Overflow to discuss problems.
        </p>
        <button
          css={{
            gridColumn: "2/3",
            gridRow: "4/5",
            width: "200px",
            borderRadius: "23.5px",
            height: "50px",
            backgroundColor: "#5DA7A3",
            border: "none",
            color: "white",
            fontSize: "1rem",
            fontWeight: "500",
          }}
        >
          Stackoverflow
        </button>
        <button
          css={{
            gridColumn: "3/4",
            gridRow: "2/3",
            height: "50px",
            width: "300px",
            justifySelf: "end",
            boxShadow: "#DADADA50 0 0 20px",
            border: "none",
            backgroundColor: "#FCFDFE",
            borderRadius: "10px",
          }}
        >
          Github
        </button>
        <button
          css={{
            gridColumn: "3/4",
            gridRow: "3/4",
            height: "50px",
            width: "300px",
            justifySelf: "end",
            boxShadow: "#DADADA50 0 0 20px",
            border: "none",
            backgroundColor: "#FCFDFE",
            borderRadius: "10px",
          }}
        >
          Twitter
        </button>
      </section>
    </div>
    <div
      css={{
        backgroundImage: `url(${circlePatternBig})`,
        height: "50vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        alignItems: "center",
      }}
    >
      <h2
        css={{
          color: "white",
          fontSize: "2.9rem",
          fontWeight: "500",
          width: "40%",
          marginLeft: "13rem",
        }}
      >
        Participate in the <br></br> Eclipse OpenJ9 Project
      </h2>
    </div>
    <div
      css={{
        display: "flex",
        color: "rgb(79, 79, 79)",
        padding: "150px 10%",
      }}
    >
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <h3 css={{ fontSize: "1.5rem", fontWeight: 400, marginBottom: "2rem" }}>
          BECOME A CONTRIBUTOR
        </h3>
        <p css={{ lineHeight: "1.6rem", marginBottom: "3rem" }}>
          Interested in contributing to OpenJ9? Check out the contributor guide
          in our Github repository.
        </p>
        <button
          css={{
            width: "250px",
            borderRadius: "23.5px",
            height: "50px",
            backgroundColor: "#5DA7A3",
            border: "none",
            color: "white",
            fontSize: "1rem",
          }}
        >
          CONTRIBUTOR GUIDE
        </button>
      </div>
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <h3 css={{ fontSize: "1.5rem", fontWeight: 400, marginBottom: "2rem" }}>
          JOIN COMMUNITY CALLS
        </h3>
        <p css={{ lineHeight: "1.6rem", marginBottom: "3rem" }}>
          Our regular community hangouts are a great place to meet the team and
          find out what is going on in the OpenJ9 project.
        </p>
        <button
          css={{
            width: "250px",
            borderRadius: "23.5px",
            height: "50px",
            backgroundColor: "#5DA7A3",
            border: "none",
            color: "white",
            fontSize: "1rem",
          }}
        >
          ADD TO CALENDAR
        </button>
      </div>
    </div>
  </Layout>
)
