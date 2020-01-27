import React from "react"
/** @jsx jsx */
import { jsx } from "@emotion/core"

export default ({ isHome }) => (
  <header
    css={{
      backgroundColor: isHome ? "#43434300" : "#434343",
      display: "flex",
      color: "white",
      height: "100px",
      alignItems: "center",
      padding: "0 30px",
      position: "absolute",
      width: "100%",
    }}
  >
    <div css={{ flex: 2, opacity: isHome ? 0 : 1 }}>
      <img src="http://place-puppy.com/150x50" alt="OpenJ9 Logo"></img>
    </div>
    <nav css={{ flex: 1 }}>
      <ul
        css={{
          listStyle: "none",
          display: "flex",
          li: { margin: "0 4%" },
        }}
      >
        <li>ABOUT</li>
        <li>DOCS</li>
        <li>NEWS</li>
      </ul>
    </nav>
  </header>
)
