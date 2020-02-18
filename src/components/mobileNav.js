import { Link } from "gatsby"
/** @jsx jsx */
import { jsx } from "theme-ui";

const MobileNav = () => (
    <nav sx={{
        display: ["flex", "flex", "none", "none"], 
        justifyContent: "center", 
        alignItems: "center", 
        position:"fixed", 
        width: "100%",
        bottom: "0",
        backgroundColor: "white",
        height: "3rem",
        boxShadow: "0 10px 30px grey"
        }}> 
        <ul sx={{ 
            variant: "lists.navRow", 
            li: { 
                a: {
                    color: "black", 
                    textDecoration: "none"
                }
            },
            justifyContent: "space-evenly",
            width: "100%"
        }}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link> </li>
            <li><a href="https://www.eclipse.org/openj9/docs/" rel="noopener noreferrer" target="_blank">Docs</a> </li>
            <li><Link to="/news">News</Link> </li>
        </ul>
    </nav>
)

export default MobileNav