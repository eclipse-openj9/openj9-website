import React from "react"
/** @jsx jsx */
import { jsx } from "theme-ui"

const Button = ({ isLink, text, primary, link, target}) => {
  const variant = primary ? "buttons.primary" : "buttons.secondary"
  if (isLink && target) {
    return (
      <a href= {link} target="_blank"
        sx={{
          variant: variant,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textDecoration: "none",
        }}
      >
        {text}
      </a>
    )
  } else if (link) {
      return (
        <a href= {link} 
          sx={{
            variant: variant,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
          }}
        >
          {text}
        </a>
      )
  }
  
  else {
    return <button sx={{ variant: variant }}>{text}</button>
  }
}

export default Button
