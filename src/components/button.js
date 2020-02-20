/** @jsx jsx */
import { jsx } from "theme-ui"

const Button = ({children, primary, link, target, widthChanged }) => {
  const variant = primary ? "buttons.primary" : "buttons.secondary"
  if (target) {
    return (
      <a href= {link} rel="noopener noreferrer" target="_blank"
        sx={{
          variant: variant,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textDecoration: "none",
          width: widthChanged ? "220px" : "190px",
        }}
      >
        {children}
      </a>
    )
  } else {
    return (
      <a href= {link}
        sx={{
          variant: variant,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textDecoration: "none",
          width: widthChanged ? "220px" : "190px",
        }}
      >
        {children}
      </a>
    )
  }
}

export default Button
