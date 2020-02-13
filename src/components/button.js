/** @jsx jsx */
import { jsx } from "theme-ui"

const Button = ({ isLink, children, primary, link, target}) => {
  const variant = primary ? "buttons.primary" : "buttons.secondary"
  if (isLink && target) {
    return (
      <a href= {link} rel="noopener noreferrer" target="_blank"
        sx={{
          variant: variant,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textDecoration: "none",
        }}
      >
        {children}
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
          {children}
        </a>
      )
  }
  
  else {
    return <button sx={{ variant: variant }}>{children}</button>
  }
}

export default Button
