/** @jsx jsx */

import { jsx } from "theme-ui";

const Card = ({ children, flex, primary }) => {
  return (
    <article
      sx={{
        minHeight: "250px",
        boxShadow: primary ? "cardShadow" : null,
        borderRadius: "card",
        borderTop: "cardBorder",
        backgroundColor: "white",
        color: "darkText",
        marginY: 5,
        flex: ["0 0 100%", `0 0 100%`, `0 0 100%`, `${flex}`],
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      {children}
    </article>
  );
};

export default Card;
