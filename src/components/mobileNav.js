// Copyright (c) 2017, 2023 IBM Corp. and others

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
// [2] https://openjdk.org/legal/assembly-exception.html

// SPDX-License-Identifier: EPL-2.0 OR Apache-2.0 OR GPL-2.0-only WITH Classpath-exception-2.0 OR GPL-2.0-only WITH OpenJDK-assembly-exception-1.0

// The project website pages cannot be redistributed

import { Link } from "gatsby"
/** @jsx jsx */
import { jsx } from "theme-ui";

const MobileNav = () => (
    <nav sx={{
        display: ["flex", "flex", "none", "none"], 
        justifyContent: "center", 
        alignItems: "center", 
        position:"fixed", 
        width: "100%",
        bottom: "0",
        backgroundColor: "white",
        height: "3rem",
        boxShadow: "0 0.5rem 2rem grey",
        zIndex: "9999"
        }}> 
        <ul sx={{ 
            variant: "lists.navRow", 
            li: { 
                a: {
                    color: "black", 
                    textDecoration: "none"
                }
            },
            justifyContent: "space-evenly",
            width: "100%"
        }}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link> </li>
            <li><a href="https://www.eclipse.org/openj9/docs/" rel="noopener noreferrer" target="_blank">Docs</a> </li>
            <li><Link to="/performance">Performance</Link> </li>
            <li><Link to="/news">News</Link> </li>
        </ul>
    </nav>
)

export default MobileNav