// Copyright (c) 2017, 2020 IBM Corp. and others

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

/** @jsx jsx */

import { jsx } from "theme-ui";

const Testimonials = ({ children, source, link }) => {
    return (
        <blockquote 
          sx={{
            display: ["block", "block", "block", "grid"],
            gridGap:'1.5rem',
            gridTemplateColumns:'repeat(1, 1fr)',
            gridTemplateRows: "1.5rem 5rem 1.5rem 1.5rem",
            color: "#0b4237",
            boxSizing: "border-box",
            marginBottom:"2rem",
            "::before": {
              fontFamily: "'Gelasio', serif",
              fontStyle: "italic",
              content: '"\\201c"',
              fontSize:"3rem",
              color:"#009578",
              display:"block",
              height: "3rem"
            }
          }}
        >
          <p 
            sx={{
              fontFamily: "'Gelasio', serif",
              fontStyle: "italic",
              fontSize: "1.3rem",
              lineHeight:"1.5rem",
            }}
          >
            {children}
          </p>

          <p 
            sx={{
              fontFamily: "'Gelasio', serif",
              fontStyle: "normal",
              fontSize: "1rem",
              lineHeight:"1rem",
              textAlign: "left",
              margin:['2rem 0 2.5rem 0', '2rem 0 2.5rem 0', '2rem 0 2.5rem 0', 0],
              "::before": {
                content: '"\\2014\\0020"',
              }
            }}
          >
            {source}
          </p>

          <div
            sx={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <a sx={{
                color: "black",
                textDecoration: "none",           
                "&:hover": {
                  color: "#0b4237",
                  textDecoration: "none",
                  fontWeight:"bold"
                }
                }} 
                href={link} rel="noopener noreferrer" target="_blank">Read more  <i className="fas fa-external-link-alt fa-xs"></i></a>
          </div>
        </blockquote>        
    );
}

export default Testimonials;