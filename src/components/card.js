/** @jsx jsx */

import { jsx } from "theme-ui";

const Card = ({ children, flex, primary, borderTop, flexTablet }) => {
  return (
    <article
      sx={{
        minHeight: "200px",
        boxShadow: primary ? "cardShadow" : null,
        borderRadius: "card",
        borderTop: borderTop ? "cardBorder": null,
        backgroundColor: "white",
        color: "darkText",
        marginY: 5,
        flex: ["0 0 100%", `${flex}`, `${flex}`, `${flex}`],
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </article>
  );
};

export default Card;
