import React from "react";

import Navbar from "./navbar"
import Head from "./head"
import Footer from "./footer"

export default ({ children }) => (
    <React.Fragment>
      <Head/>
      <Navbar/>
      { children }
      <Footer/>
    </React.Fragment>
)
