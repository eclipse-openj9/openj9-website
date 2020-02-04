import React from "react"
/** @jsx jsx */
import { jsx } from "theme-ui"

const Button = ({ isLink, text, primary, link }) => {
  const variant = primary ? "buttons.primary" : "buttons.secondary"
  if (isLink) {
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
  } else {
    return <button sx={{ variant: variant }}>{text}</button>
  }
}

export default Button
