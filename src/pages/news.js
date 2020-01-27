import React from "react";
import Layout from "../components/layout";

/** @jsx jsx */
import { jsx, Styled } from "theme-ui";

import circlePatternBig from "../images/circle-pattern-big.svg";
import Card from "../components/card";
import Button from "../components/button";

export default () => (
  <Layout isHome={false}>
    <div sx={{ backgroundColor: "#F5F9FC", paddingX: "10%", paddingY: "5%" }}>
      <Styled.h1>What’s new in OpenJ9</Styled.h1>
      <div
        sx={{
          paddingY: 5,
          paddingX: "5%",
        }}
      >
        <Styled.p>
        This text should be the introduction of the overall purpose of this page.
        It might also be beneficial to use this text to do other things.
        To identify other important details to include in this text we can begin discussing the goals that this page will help users accomplish.
        </Styled.p>
      </div>
    </div>

    <div
      sx={{
        paddingX: "10%",
        paddingY: 5,
        backgroundColor: "#F5F9FC",
      }}
    >
      <div
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          backgroundColor: "white",
          paddingX: "5%",
          paddingY: "5%",
          borderRadius: "card"        
        }}
      >
        <article
          sx={{
            flex: "0 0 30%",
            maxWidth: "600px",
            minWidth: ["300px", "350px", "400px", "500px"]
          }}
        >
          <Styled.h5>Products Updates</Styled.h5>
          <Styled.p sx={{minHeight: "150px"}}>
          This text should be the introduction of the most recent udpate about the product. We might also want to consider using tags or something as a way to draw additional attention to topics not introduced in the product update lead-in.  Ultimately this should lead to a GIT Hub page. 
          </Styled.p>
          <Button isLink={true} text="NEW RELEASE INFO" primary={false} />
        </article>
        <article
          sx={{
            flex: "0 0 30%",
            maxWidth: "600px",
            minWidth: ["300px", "350px", "400px", "500px"],
            
                marginY: ["3rem", "3rem", "0", "0"],
          }}
        >
          <Styled.h5 
          >Upcoming Event</Styled.h5>
          <Styled.p sx={{minHeight: "150px"}}>
            MM-DD-YY - Event Title: Event Details <br/>
            MM-DD-YY - Event Title: Event Details <br/>
            MM-DD-YY - Event Title: Event Details <br/>
            MM-DD-YY - Event Title: Event Details <br/>
          </Styled.p>
          <Button isLink={true} text="CALENDAR" primary={false} />
          
        </article>
      </div>

      <div
        sx={{
          display: "flex",
          flexDirection: "column",
          paddingX: "5%",
          paddingY: "5%",      
        }}
      >
        <Styled.h5>Recent Blogs</Styled.h5>
        <div sx={{display: "flex", flexWrap: "wrap", justifyContent: "space-between"}}>
          <article
          sx={{
            flex: "0 0 30%",
            maxWidth: "600px",
            minWidth: ["300px", "350px", "400px", "500px"]
          }}
        >
          
          <Styled.p>
            Blog title here - MM-DD-YY (Most Recent)
            This text should be the first few sentences for this blog post. We might also want to consider using tags or something as a way to draw additional attention to topics not introduced…see more
          </Styled.p>
        </article>
        <article
          sx={{
            flex: "0 0 30%",
            maxWidth: "600px",
            minWidth: ["300px", "350px", "400px", "500px"],
          }}
        >
          {/* <Styled.h5  sx={{
           visibility: "hidden",
          }}
          
          >Blogs</Styled.h5> */}
          <Styled.p>
            Blog title here - MM-DD-YY
            This text should be the first few sentences for this blog post. We might also want to consider using tags or something as a way to draw additional attention to topics not introduced…see more
          </Styled.p>
        </article>
        </div>
        
      </div>
      <div sx={{display: ["block", "block", "block", "flex"], justifyContent: "center", paddingX: "5%",}}>
        <Button isLink={true} text="SEE ALL BLOGS" primary={false} />
      </div>
      
    </div>
  </Layout>
);
