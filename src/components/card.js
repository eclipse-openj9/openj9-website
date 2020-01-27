import React from "react";
/** @jsx jsx */

import { jsx } from "theme-ui";

const Card = ({ children, flex, primary }) => {
  return (
    <article
      sx={{
        height: "250px",
        boxShadow: primary ? "cardShadow" : null,
        borderRadius: "card",
        borderTop: "cardBorder",
        backgroundColor: "white",
        color: "darkText",
        marginY: 5,
        flex: ["0 0 100%", `0 0 100%`, `0 0 100%`, `${flex}`]
      }}
    >
      {children}
    </article>
  );
};

export default Card;
