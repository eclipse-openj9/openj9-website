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

import React from "react";
import { ThemeProvider } from "theme-ui";
import theme from "../theme";
import Header from "./header";
import Footer from "./footer";
import Head from "./head";
import MobileNav from "./mobileNav";
import { Global } from "@emotion/core";

export default ({ children, isHome, title, description }) => (
  <ThemeProvider theme={theme}>
    <Global
      styles={theme => ({
        "*": { padding: 0, margin: 0 },                          
      })}
    />
    <Head title={title} description={description}/>
    <Header isHome={isHome} />
    <MobileNav />
    {children}
   
    <Footer />
    
  </ThemeProvider>
);
