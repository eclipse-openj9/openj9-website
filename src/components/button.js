import React from "react"
/** @jsx jsx */
import { jsx } from "theme-ui"

const Button = ({ isLink, text, primary }) => {
  const variant = primary ? "buttons.primary" : "buttons.secondary"
  if (isLink) {
    return (
      <a
        sx={{
          variant: variant,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
