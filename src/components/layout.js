import React from "react"
import { Global, css } from "@emotion/core"

import Header from "./header"
import Footer from "./footer"

export default ({ children, isHome }) => (
  <>
    <Global
      styles={css`
        * {
          font-family: "Helvetica Neue", Helvetica, Arial, "Lucida Grande",
            sans-serif;
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }
      `}
    />
    <Header isHome={isHome} />
    {children}
    <Footer />
  </>
)
