import React from "react"
/** @jsx jsx */
import { jsx } from "@emotion/core"

export default ({ row, col }) => (
    <article
    css={{
        height: "200px",
        backgroundColor: "white",
        borderRadius: "10px",
        gridColumn: col,
        gridRow: row,
        borderTop: "#5DA7A3 10px solid",
        margin: "2rem 2rem",
    }}
    ></article>
)
