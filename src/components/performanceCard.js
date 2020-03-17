/** @jsx jsx */

import { jsx } from "theme-ui";

const PerformanceCard = ({ children, flex, primary, image, heading }) => {
  return (
    <div
      sx={{

        boxShadow: primary ? "cardShadow" : null,
        borderRadius: "card",
        backgroundColor: "primary",
        color: "white",
        marginY: 5,
        flex: ["0 0 100%", `${flex}`, `${flex}`, `${flex}`],
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
        <h5 sx={{ marginTop:["1rem","2rem","2rem","1rem"]}}>{heading}</h5>
        <img sx={{
          margin:"1rem",
          width:"80%",
          height:"80%"
          }}src={image} alt={heading + " graph"} ></img>
      <div
      sx={{
        boxShadowBottom: primary ? "cardShadow" : null,
        borderBottomRightRadius: "card",
        borderBottomLeftRadius: "card",
        backgroundColor: "white",
        borderTop: "5px solid #5DA7A3",
        color: "darkText",
        height:"50%",
        padding:"2.5rem 1rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width:"100%",
      }}
    >
      {children}
    </div>
    </div>
    
  );
};

export default PerformanceCard;
