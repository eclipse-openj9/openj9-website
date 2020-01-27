import React from "react"

/** @jsx jsx */
import { jsx } from "@emotion/core"

export default () => (
  <footer
    css={{
      backgroundColor: "#434343",
      color: "white",
      display: "grid",
      padding: "30px 0",
      gridTemplateColumns: "10% repeat(3, auto) 10%",
      gridTemplateRows: "auto auto auto auto",
      ul: {
        listStyle: "none",
      },
    }}
  >
    <nav
      css={{
        gridColumn: "2/3",
        gridRow: "1/2",
        width: "70%",
        display: "flex",
        li: { margin: "1rem 0", fontSize: "0.8rem" },
        h4: { fontSize: "1.2rem", fontWeight: 500 },
      }}
    >
      <div css={{ flex: 1 }}>
        <h4>Docs</h4>
        <ul>
          <li>About</li>
          <li>AdoptOpenJDK</li>
          <li>Getting Started</li>
          <li>New to OpenJ9</li>
        </ul>
      </div>
      <div css={{ flex: 1 }}>
        <h4>Download</h4>
        <ul>
          <li>Performance</li>
          <li>Get OpenJ9</li>
          <li>Build Your Own</li>
        </ul>
      </div>
    </nav>
    <div
      css={{
        gridColumn: "4/5",
        gridRow: "1/2",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}
    >
      <h4>
        OpenJ9 is an <span css={{ color: "#5DA7A3" }}>Eclipse Incubator</span>{" "}
        Project
      </h4>
      <img css={{ marginTop: "2rem" }} src="http://place-puppy.com/50x60"></img>
    </div>
    <div
      css={{
        gridRow: "3/4",
        gridColumn: "2/5",
        height: "4px",
        backgroundColor: "#5DA7A3",
        margin: "40px 0",
      }}
    ></div>
    <nav
      css={{
        gridColumn: "2/4",
        gridRow: "4/5",
        ul: { display: "flex" },
        li: { marginRight: "1.2rem", fontSize: "0.8rem" },
      }}
    >
      <ul>
        <li>Privacy Policy</li>
        <li>Terms of Use</li>
        <li>Copyright Agent</li>
        <li>Legal</li>
      </ul>
    </nav>
    <nav
      css={{
        gridColumn: "4/5",
        gridRow: "4/5",
        justifySelf: "end",
        ul: { display: "flex" },
        li: { marginLeft: "1.2rem" },
        img: { borderRadius: "50%" },
      }}
    >
      <ul>
        <li>
          <img src="http://place-puppy.com/25x25"></img>
        </li>
        <li>
          <img src="http://place-puppy.com/25x25"></img>
        </li>
        <li>
          <img src="http://place-puppy.com/25x25"></img>
        </li>
        <li>
          <img src="http://place-puppy.com/25x25"></img>
        </li>
      </ul>
    </nav>
  </footer>
)
