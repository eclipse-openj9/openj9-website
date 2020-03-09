import React from "react";
import { ThemeProvider } from "theme-ui";
import theme from "../theme";
import Header from "./header";
import Footer from "./footer";
import MobileNav from "./mobileNav";
import { Global } from "@emotion/core";

export default ({ children, isHome }) => (
  <ThemeProvider theme={theme}>
    <Global
      styles={theme => ({
        "*": { padding: 0, margin: 0 }
      })}
    />
    <Header isHome={isHome} />
    <MobileNav />
    {children}
   
    <Footer />
    
  </ThemeProvider>
);
