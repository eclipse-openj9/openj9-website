// Copyright (c) 2017, 2024 IBM Corp. and others

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

/** @jsx jsx */

import { jsx } from "theme-ui";

const Testimonials = ({ children, source, link }) => {
    return (
                
        <blockquote 
          sx={{
            display: ["block", "block", "block", "grid"],
            gridGap:'0.5rem',
            gridTemplateColumns:'repeat(1, 1fr)',
            gridTemplateRows: "5rem 1.5rem 1.5rem",
            color: "#0b4237",
            boxSizing: "border-box",
            marginBottom:"2rem"
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

          <cite
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
                href={link} rel="noopener noreferrer" target="_blank">{source}&nbsp;<i className="fas fa-external-link-alt fa-xs"></i></a>
          </cite>
        </blockquote>
    );
}

export default Testimonials;