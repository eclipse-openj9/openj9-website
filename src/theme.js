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
    accent: "#F8D000",
    background: "#FFFFFF"
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
        cursor: "pointer"
      }
    },
    secondary: { variant: "buttons.primary", width: "250px" }
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
      fontSize: 2
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
          textDecoration: "none"
        }
      },
      "li:first-child": {
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
  }
};
