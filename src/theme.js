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

export default {
  fonts: {
    heading: "'Helvetica Neue', Helvetica, Arial, 'Lucida Grande'",
    body: "'Helvetica Neue', Helvetica, Arial, 'Lucida Grande'"
  },
  colors: {
    darkText: "#4d4f50",
    lightText: "#d8d8d8",
    links: "#5DA7A3",
    primary: "#434343",
    secondary: "#5DA7A3",
    secondaryDark:"#5d9da3",
    accent: "#F8D000",
    background: "#FFFFFF",
    lightGrey: "#F1F1F1"
  },
  radii: {
    button: "35px",
    card: "10px"
  },
  breakpoints: ["560px", "1000px", "1366px", "1920px"],
  fontSizes: [16, 18, 20, 24, 28, 36],
  space: [0, 8, 16, 24, 32, 40],
  fontWeights: {
    body: 400,
    heading: 700
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125
  },
  buttons: {
    primary: {
      backgroundColor: "secondary",
      color: "white",
      borderRadius: "button",
      height: "35px",
      width: "150px",
      border: "none",
      fontFamily: "body",
      fontSize: 0,
      "&:hover": {
        cursor: "pointer",
        backgroundColor: "secondaryDark",
        borderColor: "secondaryDark"
      }
    },
    secondary: { variant: "buttons.primary", width: "190px" }
  },
  text: {
    heading: {
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      marginY: 2
    }
  },
  styles: {
    root: {
      fontFamily: "body",
      lineHeight: "body",
      fontWeight: "body"
    },
    h1: {
      variant: "text.heading",
      fontSize: 5
    },
    h2: {
      variant: "text.heading",
      fontSize: 4
    },
    h3: {
      variant: "text.heading",
      fontSize: 3
    },
    h4: {
      variant: "text.heading",
      fontSize: 2,

    },
    h5: {
      variant: "text.heading",
      fontSize: 1
    },
    h6: {
      variant: "text.heading",
      fontSize: 0
    },
    p: {
      marginBottom: 5,
      fontSize: 1
    }
  },
  lists: {
    navRow: {
      display: "flex",
      listStyle: "none",
      justifyContent: "flex-end",
      li: {
        padding: 1,
        marginX: 1,
        a: {
          color: "white",
          textDecoration: "none",
          "&:hover": {
            color: "links",
          }
        }
      },
      "li:first-of-type": {
        marginLeft: 0
      },
      "li:last-child": {
        marginRight: 0,
        paddingRight: 0
      }
    },
    navCol: {
      variant: "lists.navRow",
      flexDirection: "column",
      li: {
        padding: 1,
        paddingLeft: 0
      }
    }
  },
  borders: {
    cardBorder: "#5DA7A3 10px solid"
  },
  shadows: {
    cardShadow: "#DADADA 0 0 20px"
  },
};
