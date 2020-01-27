import React from "react"
import Layout from "../components/layout"

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

import circlePatternBig from "../images/circle-pattern-big.svg"
import Card from "../components/card"

export default () => (
  <Layout isHome={false}>
    <div
      css={{
        backgroundColor: "#F5F9FC",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "150px 0 150px 0",
      }}
    >
      <h2
        css={css`
          align-self: start;
          margin-left: 10%;
          margin-bottom: 2rem;

          @media (max-width: 767px) {
            margin-left: 0;
            align-self: center;
          }
        `}
      >
        More About OpenJ9
      </h2>
      <section
        css={{
          display: "grid",
          gridTemplateColumns: "3% 2fr 3%",
          gridTemplateRows: "repeat(2, auto)",
          gridRowGap: "10px",
          backgroundColor: "white",
          width: "80%",
          borderRadius: "30px",
          padding: "3% 0 3% 0",
          boxSizing: "border-box",
          marginBottom: "100px",
        }}
      >
        <p
          css={css`
            grid-column: 2/3;
            grid-row: 1/2;
            height: 50px;
            padding: 0.5rem;
            @media (max-width: 767px) {
              text-align: center;
            }
          `}
        >
          Have ideas about improvements for OpenJ9? Share them in our Slack
          workspace.
        </p>
        <button
          css={css`
            grid-column: 2/3;
            grid-row: 2/3;
            width: 200px;
            border-radius: 23.5px;
            height: 50px;
            background-color: #5DA7A3;
            border: none;
            color: white;
            font-size: 1rem;
            font-weight: 500;
            margin-top: 4rem;
            @media (max-width: 767px) {
              margin: 2rem  auto;
            }
          `}
        >
          Call to Action
        </button>
      </section>
      <div
      css={css`
        width:100%;
        background-color: #434343; 
        @media (min-width: 767px) {
          display: grid;
          grid-template-columns: 10% repeat(3, auto) 10%;
          grid-template-rows: repeat(3, auto);
        }
        
        padding: 2.5rem 0;
        @media (max-width: 767px) {
          display: block;
          margin: 1rem 0
        }
      }`}
    >
      <h2
        css={css`
        font-size: 30px;
        align-self: center;
        color: white;
        grid-column: 2/5;
        grid-row: 1/2;
        @media (max-width: 767px) {
          text-align:center;
        }`
        }
      >
        Our Sponsors
      </h2>
      
      <p
        css={css`
          alignSelf: ${"start"};
          color: white;
          grid-column: 2/5;
          grid-row: 2/3;
          padding: 1rem 0 4rem 0;
          @media (max-width: 767px) {
            text-align:center;
            margin: 0 2rem;
          }
        }`}
      >
        Have ideas about improvements for OpenJ9? Share them in our Slack workspace.
      </p>
      <Card row="3/4" col="2/3"/>
      <Card row="3/4" col="3/4"/>
      <Card row="3/4" col="4/5"/>
      </div>

      
    <div
      css={css`
        background-image: url(${circlePatternBig});
        height: 50vh;
        background-repeat: no-repeat;
        background-size: cover;
        display: flex;
        flex-direction:column;
        align-items: center;
        width: 100%;
        @media (max-width: 767px) {
          display:none;
        }
      `}
    >
      <h2
        css={{
            color: "white",
            fontSize: "2.9rem",
            fontWeight: "500",
            width: "40%",
            marginLeft: "-30%",
            marginTop: "5rem",
        }}
      >
        Our Future
      </h2>
      <p
        css={{
          color: "white",
          fontSize: "1.5rem",
          width: "30%",
          marginLeft: "-40%",
          marginTop: "1rem",   
        }}
      >
       Interested in contributing to OpenJ9? Check out the contributor guide
          in our Github repository.
      </p>
    </div>
      
    <section
        css={{
         
          backgroundColor: "white",
          width: "80%",
          borderRadius: "30px",
          padding: "3% 3% 3% 3%",
          boxSizing: "border-box",
          marginTop: "100px",
        }}
      >
        
        <div
          css={css`
            display: flex;
            color: rgb(79, 79, 79);
            padding: 40px 10%;
            @media (max-width: 767px) {
              flex-direction: column;
            }
        `}
        >
          
          <div
            css={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
            }}
          >
            <h3 css={{ fontSize: "1.5rem", fontWeight: 400, marginBottom: "2rem" }}>
              Docs
            </h3>
            <p css={{ lineHeight: "1.6rem", marginBottom: "3rem", height:"8rem" }}>
              Interested in contributing to OpenJ9? Check out the contributor guide
              in our Github repository.
            </p>
            <button
              css={css`
                width: 75%;
                border-radius: 23.5px;
                height: 50px;
                background-color: #5DA7A3;
                border: none;
                color: white;
                font-size: 1rem;

                @media (max-width: 767px) {
                  margin-bottom: 2rem;
                }
              `}
            >
              Go To Docs
            </button>
          </div>
          <div
            css={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
            }}
          >
            <h3 css={{ fontSize: "1.5rem", fontWeight: 400, marginBottom: "2rem" }}>
              Blogs
            </h3>
            <p css={{ lineHeight: "1.6rem", marginBottom: "3rem", height: "8rem" }}>
              Our regular community hangouts are a great place to meet the team and
              find out what is going on in the OpenJ9 project.
            </p>
            <button
              css={{
                width: "75%",
                borderRadius: "23.5px",
                height: "50px",
                backgroundColor: "#5DA7A3",
                border: "none",
                color: "white",
                fontSize: "1rem",
              }}
            >
              Go To Blogs
            </button>
          </div>
        </div>
      </section>
    </div>
    
    
  </Layout>
)
