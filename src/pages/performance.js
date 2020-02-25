import Layout from "../components/layout";

/** @jsx jsx */
import { jsx, Styled } from "theme-ui";

import FortyTwoPercentStartup from "../images/forty-two-percent-startup.png";
import SixtySixPercentSmallerFootprint from "../images/sixty-six-percent-smaller-footprint.png";
import TwentyEightPercentFaster from "../images/twenty-eight-percent-faster.png";
import SixtyThreePercentSmallerFootprint from "../images/sixty-three-percent-smaller-footprint.png";
import ComaparableThroughput from "../images/comaparable-throughput.png";

export default () => (
  <Layout isHome={false}>
    <div sx={{ backgroundColor: "#F5F9FC", paddingX: "10%", paddingY: "5%"}}>
      <Styled.h1 sx={{ marginBottom:"4rem"}}>A Superior JVM Experience</Styled.h1>
      <div
        sx={{
          display: "flex",
          justifyContent:"center",
          alignItems:"center",
          flexDirection: ["column", "row", "row", "row"]
        }}
      >
        <img sx={{
          width:["240px", "240px", "240px", "320px"],
          height:["240px", "240px", "240px", "240px"],
          marginRight:["0", "6rem", "6rem", "6rem"],
          marginBottom:["3rem", 0, 0, 0]
        }}src={SixtySixPercentSmallerFootprint} alt="Sixty Six Percent Smaller Footprint Graph"></img>
        <Styled.p>
        OpenJ9 is highly optimized for cloud workloads, where minimising memory footprint is important.
        Even with other optimizations enabled, the footprint stays about the same.
        </Styled.p>
      </div>

      <div
        sx={{
          display: "flex",
          justifyContent:"center",
          alignItems:"center",
          marginTop: [0, "8rem", "8rem", "8rem"],
          flexDirection: ["column-reverse", "row", "row", "row"]
        }}
      >
        <Styled.p sx={{  marginRight:["0", "6rem", "6rem", "6rem"]}}>
            Memory footprint increases rapidly when load is applied, but at steady state,
            OpenJDK 8 with OpenJ9 used around 63% less physical memory than OpenJDK 8 with HotSpot.
        </Styled.p>

        <img sx={{
           width:["240px", "240px", "240px", "320px"],
           height:["240px", "240px", "240px", "240px"],
           marginBottom:["3rem", 0, 0, 0]
        }}src={SixtyThreePercentSmallerFootprint} alt="Sixty Three Percent Smaller Footprint Graph"></img>
      </div>

      <div
        sx={{
          display: "flex",
          justifyContent:"center",
          alignItems:"center",
          marginTop: [0, "8rem", "8rem", "8rem"],
          flexDirection: ["column", "row", "row", "row"]
        }}
      >
        <img sx={{
            width:["240px", "240px", "240px", "320px"],
            height:["240px", "240px", "240px", "240px"],
            marginRight:["0", "6rem", "6rem", "6rem"],
            marginBottom:["3rem", 0, 0, 0],
        }}src={FortyTwoPercentStartup} alt="Forty Two Percent Startup "></img>
        <Styled.p>
            Shared classes and Ahead-of-Time (AOT) technologies typically reduce startup time.
            By using -Xquickstart mode as well, you can reduce startup time by up to 42%.
        </Styled.p>
      </div>

      <div
        sx={{
          display: "flex",
          justifyContent:"center",
          alignItems:"center",
          marginTop: [0, "8rem", "8rem", "8rem"],
          flexDirection: ["column-reverse", "row", "row", "row"]
        }}
      >
        <Styled.p sx={{ marginRight:["0", "6rem", "6rem", "6rem"]}}>
            Although both OpenJDK 8 with OpenJ9 and OpenJDK 8 with Hotspot reach a similar peak throughput,
            OpenJDK 8 with OpenJ9 reaches that peak about 1 minute faster.
        </Styled.p>

        <img sx={{
          width:["240px", "240px", "240px", "320px"],
          height:["240px", "240px", "240px", "240px"],
          marginBottom:["3rem", 0, 0, 0],
        }}src={ComaparableThroughput} alt="Comaparable Throughput Graph"></img>
      </div>

      <div
        sx={{
          display: "flex",
          justifyContent:"center",
          alignItems:"center",
          marginTop: [0, "8rem", "8rem", "8rem"],
          flexDirection: ["column", "row", "row", "row"]
        }}
      >
        <img sx={{
         width:["240px", "240px", "240px", "320px"],
         height:["240px", "240px", "240px", "240px"],
         marginRight:["0", "6rem", "6rem", "6rem"],
         marginBottom:["3rem", 0, 0, 0],
        }}src={TwentyEightPercentFaster} alt="Twenty Eight Percent Faster Graph"></img>
        <Styled.p>
            OpenJ9 reaches peak throughput on a single CPU core in 8.5 minutes compared with 30 minutes for Hotspot.
            Doing more work more quickly is important for short-lived VMs running in resource-constrained environments like the cloud.
        </Styled.p>
      </div>

      <div
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          backgroundColor: "white",
          paddingX: "5%",
          paddingY: "5%",
          borderRadius: "card",   
          marginTop:"8rem"
        }}
      >
        <article
          sx={{
            flex: "30%",
            maxWidth: "600px",
            minWidth: ["250px", "350px", "400px", "500px"],
            marginBottom:"2rem"
          }}
        >
          <Styled.h3>OpenJ9</Styled.h3>
          <Styled.p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Styled.p>
        </article>
        <article
          sx={{
            flex: "30%",
            maxWidth: "600px",
            minWidth: ["250px", "350px", "400px", "500px"]
          }}
        >
          <Styled.h3>HotSpot</Styled.h3>
          <Styled.p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Styled.p>
        </article>
      </div>

      <Styled.p sx={{marginTop:"8rem", marginBottom:"1rem"}}>Ready to get started?</Styled.p>
      <Styled.p sx={{marginTop:"0rem", marginBottom:"1rem"}}>See how your applications perform when the OpenJ9 JVM is at work</Styled.p>
      <Styled.p sx={{marginTop:"0rem"}}><a href="https://adoptopenjdk.net/releases.html?variant=openjdk8&jvmVariant=openj9" rel="noopener noreferrer" target="_blank">Download</a> a pre-built OpenJDK binary from AdoptOpenJDK to install on your system</Styled.p>
    </div>
 
  </Layout>
);
