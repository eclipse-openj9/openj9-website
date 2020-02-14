import Layout from "../components/layout";
import { graphql } from 'gatsby'

/** @jsx jsx */
import { jsx, Styled } from "theme-ui";

import Button from "../components/button";

export default ({data}) => (
  <Layout isHome={false}>
    <div sx={{ backgroundColor: "#F5F9FC", paddingX: "10%", paddingY: "5%" }}>
      <Styled.h1>What's new in the OpenJ9 project</Styled.h1>
      <div
        sx={{
          paddingY: 5,
          paddingX: "5%",
        }}
      >
        <Styled.p>
          Find out what's happening at the project. Read about the highlights of our latest release and see upcoming events that we're involved in.
          Catch the latest blog posts from our blog site; get top tips or deep dives about key features of OpenJ9 or simply read about experiences of working in the community.
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
          paddingTop: "5%",
          paddingBottom: "3%",
          borderRadius: "card"        
        }}
      >
        <article
          sx={{
            flex: "1 1 30%",
            minWidth: ["250px", "350px", "400px", "500px"]
          }}
        >
          <Styled.h3>Latest release</Styled.h3>
          <Styled.p sx={{minHeight: "13rem", width:"90%", marginBottom: ["3rem", "0", 0, 0]}}>
            {((data.allMarkdownRemark.edges[0].node.html).replace(/(<([^>]+)>)/ig,""))}
          </Styled.p>
          
          <Button link="https://www.eclipse.org/openj9/docs/openj9_releases/" isLink={true} primary={false} target={true}>New release info</Button>
        </article>
        <article
          sx={{
            flex: "1 1 30%",
            maxWidth: "600px",
            minWidth: ["250px", "350px", "400px", "500px"],
            marginTop: ["5rem", "5rem", "5rem", "0"],
          }}
        >
          <Styled.h3 
          >Events</Styled.h3>
            <ul sx={{minHeight: "14rem", width: "90%", 
            li: {
              padding: ["0.5rem", "0.2rem", "0.2rem", "0.2rem"]
            }}}>
              {data.allUpcomingEventsYaml.edges.map((event) => {
                return <li sx={{listStyleType: "none"}}> {event.node.title} - {event.node.date} - {event.node.details}</li>
              })}
            </ul>
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
        <Styled.h3>Recent blogs</Styled.h3>
        <div sx={{display: "flex", flexWrap: "wrap", justifyContent: "space-between"}}>
          <article
          sx={{
            flex: "1 1 30%",
            minWidth: ["250px", "350px", "400px", "500px"]
          }}
        >
          
          <Styled.h4 sx={{width:"90%", marginBottom: "0.8rem", height: ["5.5rem", "2.5rem", "2.5rem", "3rem"]}}>
            {data.allWordpressPost.nodes[0].title}
          </Styled.h4>
          <Styled.p sx={{width:"90%", marginBottom: "1rem"}}>
            <b>{data.allWordpressPost.nodes[0].date}</b>
          </Styled.p>
          <Styled.p sx={{width:"90%"}}>
            {(((data.allWordpressPost.nodes[0].excerpt).replace(/(<([^>]+)>)/ig,"")).replace("&nbsp;", " ")).replace("&nbsp;", " ").replace("Continue reading", "")}
            <a target="_blank" rel="noopener noreferrer" href={data.allWordpressPost.nodes[0].excerpt.match(/href="([^"]*)/g)[0].replace('href="', "")}>see more</a>
          </Styled.p>
        </article>
        <article
          sx={{
            flex: "1 1 30%",
            minWidth: ["250px", "350px", "400px", "500px"],
          }}
        >
          <Styled.h4 sx={{width:"90%", marginBottom:"0.8rem", height: ["5.5rem", "2.5rem", "2.5rem", "3rem"]}}>
            {data.allWordpressPost.nodes[1].title}
          </Styled.h4>
          <Styled.p sx={{width:"90%", marginBottom: "1rem"}}>
            <b>{data.allWordpressPost.nodes[1].date}</b>
          </Styled.p>
          <Styled.p sx={{width:"90%", marginBottom: "1rem"}}>
            {(((data.allWordpressPost.nodes[1].excerpt).replace(/(<([^>]+)>)/ig,"")).replace("&nbsp;", " ")).replace("&nbsp;", " ").replace("Continue reading", "")}
            <a target="_blank" rel="noopener noreferrer" href={data.allWordpressPost.nodes[1].excerpt.match(/href="([^"]*)/g)[0].replace('href="', "")}>see more</a>
          </Styled.p>          
        </article>
        </div>
        
      </div>
      <div sx={{display: ["block", "flex", "flex", "flex"], justifyContent: "center", paddingX: "5%",}}>
        <Button link="https://blog.openj9.org/" isLink={true} primary={false} target={true}>See all blogs</Button>
      </div>
      
    </div>
  </Layout>
);

export const query = graphql`
{
  allUpcomingEventsYaml(sort: {fields: date, order: ASC} limit: 5) {
    edges {
      node {
        id
        title
        date(formatString:"MMMM-DD-YYYY")
        details
      }
    }
  },
    allWordpressPost(limit: 2) {
      nodes {
        title
        date(formatString:"MMMM-DD-YYYY")
        excerpt
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
