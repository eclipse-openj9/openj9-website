// Copyright (c) 2017, 2024 IBM Corp. and others

// This program and the accompanying materials are made available under
// the terms of the Eclipse Public License 2.0 which accompanies this
// distribution and is available at https://www.eclipse.org/legal/epl-2.0/
// or the Apache License, Version 2.0 which accompanies this distribution and
// is available at https://www.apache.org/licenses/LICENSE-2.0.

// This Source Code may also be made available under the following
// Secondary Licenses when the conditions for such availability set
// forth in the Eclipse Public License, v. 2.0 are satisfied: GNU
// General Public License, version 2 with the GNU Classpath
// Exception [1] and GNU General Public License, version 2 with the
// OpenJDK Assembly Exception [2].

// [1] https://www.gnu.org/software/classpath/license.html
// [2] https://openjdk.org/legal/assembly-exception.html

// SPDX-License-Identifier: EPL-2.0 OR Apache-2.0 OR GPL-2.0-only WITH Classpath-exception-2.0 OR GPL-2.0-only WITH OpenJDK-assembly-exception-1.0

// The project website pages cannot be redistributed

import Layout from "../components/layout";
import { graphql } from 'gatsby'

/** @jsx jsx */
import { jsx, Styled } from "theme-ui";

import Button from "../components/button";

export default ({data}) => {
  const nodes = data.allWordpressPost.nodes;

  return(
  <Layout isHome={false} title="What's new with Eclipse OpenJ9" description="Find out what's in the latest release; Learn about the technology directly from our developers.">
    <section sx={{ backgroundColor: "#F5F9FC", paddingX: "7%", paddingTop:"4rem" }}>
      <Styled.h1>What's new in the Eclipse OpenJ9 project</Styled.h1>
      <div
        sx={{
          paddingY: "2rem",
          paddingX: "5%"
        }}
      >
        <Styled.p>
          Find out what's happening at the project. Read about the highlights of our latest release.
          Catch the latest blog posts from our blog site; get top tips or deep dives about key features of Eclipse OpenJ9&trade; or simply read about experiences of working in the community.
        </Styled.p>
      </div>
    </section>

    <section
      sx={{
        paddingX: "7%",
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
          paddingY: "2rem",
          borderRadius: "card"        
        }}
      >
          <article>
            <Styled.h2>Latest release</Styled.h2>
            <div sx={{
                wordWrap: "break-word",
                minHeight: ["10rem", "13rem", "10rem", "8rem"], 
                marginBottom: "3rem",
                 p: {
                  margin: "1rem 0"
                 },
                 ul: {
                   marginLeft:"5%",
                   p:{
                    margin:0
                   }
                 },
                 a: {
                  color: "#5DA7A3",
                  textDecoration:"none",
                  "&:hover": {
                    fontWeight: "bold",
                    textDecoration:"none"
                  }
                 }
              }} dangerouslySetInnerHTML={{__html: ((data.allMarkdownRemark.edges[0].node.html))}}>
            </div>
            <Button link="https://www.eclipse.org/openj9/docs/openj9_releases/" primary={false} target={true}>New release info</Button>
          </article>
        </div>
      </section>
      <section
        sx={{
          paddingX: "7%",
          paddingTop:"2rem",
          paddingBottom: "4rem",   
          backgroundColor: "#F5F9FC",
        }}
      >
        <Styled.h2 sx={{marginTop:"2rem"}}>Recent blogs</Styled.h2>
      <div
        sx={{
          display: "grid",
          gridGap:['3rem', '3rem', '3rem', '6rem'],
          gridTemplateColumns:['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)'],
        }}
      >
        <div sx={{
              display:'flex',
              flexDirection:'column',
              justifyContent:'space-between'
            }}
        >
          <div>
            <Styled.h3 sx={{fontSize:["1.25rem", "1.4rem", "1.4rem", "1.4rem"]}}>
            <a
              sx={{
                    cursor: "pointer",
                    color: "black",
                    marginRight:'0.3rem',
                    textDecoration: "none",
                    "&:hover": {
                      color: "#5DA7A3",
                      textDecoration: "none"
                    }
              }}
              href={data.allWordpressPost.nodes[0].link} rel="noopener noreferrer" target="_blank"> {data.allWordpressPost.nodes[0].title}
              <i sx={{marginLeft: "0.5rem"}} className="fas fa-external-link-alt fa-xs"></i>
            </a>
            </Styled.h3>
            <Styled.p>
              <b>{nodes[0].date}</b>
            </Styled.p>
          </div>
          <Styled.p dangerouslySetInnerHTML={{__html:data.allWordpressPost.nodes[0].excerpt}}/>
        </div>

        <div
          sx={{
            display:'flex',
            flexDirection:'column',
            justifyContent:'flex-start',
          }}
        >
          <div>
            <Styled.h3 sx={{fontSize:["1.25rem", "1.4rem", "1.4rem", "1.4rem"]}}>
              <a 
                sx={{

                  cursor: "pointer",
                  color: "black",
                  textDecoration: "none",
                  marginRight:"0.3rem",
                  "&:hover": {
                    color: "#5DA7A3",
                    textDecoration: "none"
                  }
                }}
                href={data.allWordpressPost.nodes[1].link} rel="noopener noreferrer" target="_blank"> {data.allWordpressPost.nodes[1].title}
                <i sx={{marginLeft: "0.5rem"}} className="fas fa-external-link-alt fa-xs"></i>
              </a>
            </Styled.h3>
            <Styled.p >
              <b>{data.allWordpressPost.nodes[1].date}</b>
            </Styled.p>
          </div>
          <Styled.p dangerouslySetInnerHTML={{__html:data.allWordpressPost.nodes[1].excerpt}}/>    
        </div>
      </div>
      
      <div sx={{display: "flex", justifyContent: "center", paddingX: "5%",}}>
        <Button link="https://blog.openj9.org/" primary={false} target={true}>See all blogs</Button>
      </div>
      
    </section>
  </Layout>
  )}

export const query = graphql`
{
  allWordpressPost(limit: 2) {
    nodes {
      title
      date(formatString:"DD MMMM YYYY")
      excerpt
      link
    }
  },
  allMarkdownRemark {
    edges {
      node {
        html
      }
    }
  }
}`
