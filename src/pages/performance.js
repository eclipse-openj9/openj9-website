import Layout from "../components/layout";

/** @jsx jsx */
import { jsx, Styled } from "theme-ui";

import FortyTwoPercentStartup from "../images/forty-two-percent-startup.png";
import SixtySixPercentSmallerFootprint from "../images/sixty-six-percent-smaller-footprint.png";
import TwentyEightPercentFaster from "../images/twenty-eight-percent-faster.png";
import SixtyThreePercentSmallerFootprint from "../images/sixty-three-percent-smaller-footprint.png";
import PerformanceCard from "../components/performanceCard";

export default () => (
  <Layout isHome={false}>
    <div sx={{ backgroundColor: "#F5F9FC",  paddingX: "10%", paddingTop: "3%", paddingBottom: "1%" }}>
      <Styled.h1 sx={{marginBottom:"1rem"}}>Performance Overview</Styled.h1>
        <Styled.p>
          Application performance can be measured using many different metrics, including startup time,
          ramp-up time, footprint, and response time, as well as throughput. At Eclipse OpenJ9, we keep a watchful eye on all
          of these metrics, making sensible tradeoffs and providing tuning options that allow the virtual machine (VM) to be optimized for different workloads.
        </Styled.p>
    </div>
    <div
      sx={{
        backgroundColor: "#F5F9FC",
        paddingX: "10%",
        paddingTop: "1%",
        paddingBottom: "5%"
      }}
    >
      <Styled.h2>OpenJDK 8 performance with Eclipse OpenJ9</Styled.h2>
      <Styled.p>
        The result is that OpenJDK 8 with OpenJ9 demonstrates significantly better performance than with Hotspot.
      </Styled.p>
      <div
        sx={{
          display: ["flex","none","none", "flex"],
          justifyContent: "space-between",
          flexWrap: "wrap"
        }}
      >
        <PerformanceCard image={SixtySixPercentSmallerFootprint} heading="66% smaller footprint after startup" flex="0 0 260px" primary={true}> 
         <p>OpenJ9 is highly optimized for cloud workloads, where minimising memory footprint is important.
           Even with other optimizations enabled, the footprint stays about the same.</p>
        </PerformanceCard>
        <PerformanceCard image={SixtyThreePercentSmallerFootprint} heading="63% smaller footprint during ramp up" flex="0 0 260px" primary={true}> 
        <p>Memory footprint increases rapidly when load is applied, but at steady state,
          OpenJDK 8 with OpenJ9 used around 63% less physical memory than OpenJDK 8 with HotSpot.</p>
        </PerformanceCard>
        <PerformanceCard image={FortyTwoPercentStartup} heading="42% faster startup time" flex="0 0 260px" primary={true}> 
        <p>Shared classes and Ahead-of-Time (AOT) technologies typically reduce startup time.
          By using -Xquickstart mode as well, you can reduce startup time by up to 42%.</p>
        </PerformanceCard>
        <PerformanceCard image={TwentyEightPercentFaster} heading="Faster ramp-up time in the cloud" flex="0 0 260px" primary={true}> 
        <p>OpenJ9 reaches peak throughput on a single CPU core in 8.5 minutes compared with 30 minutes for Hotspot.
          Doing more work more quickly is important for short-lived VMs running in resource-constrained environments like the cloud.</p>
        </PerformanceCard>
      </div>

      <div
        sx={{
          display: ["none", "flex", "flex", "none"],
          justifyContent: "space-around",
          flexWrap: "wrap"
        }}
      >
        <PerformanceCard image={SixtySixPercentSmallerFootprint} heading="66% smaller footprint after startup" flex="0 0 260px" primary={true}> 
        <p>OpenJ9 is highly optimized for cloud workloads, where minimising memory footprint is important.
          Even with other optimizations enabled, the footprint stays about the same.</p>
        </PerformanceCard>
        <PerformanceCard image={SixtyThreePercentSmallerFootprint} heading="63% smaller footprint during ramp up" flex="0 0 260px" primary={true}> 
        <p>Memory footprint increases rapidly when load is applied,
          but at steady state, OpenJDK 8 with OpenJ9 used around 63% less physical memory than OpenJDK 8 with HotSpot.</p>
        </PerformanceCard>
        </div>
        <div
        sx={{
          display: ["none", "flex", "flex", "none"],
          justifyContent: "space-around",
          flexWrap: "wrap"
        }}
      >
        <PerformanceCard image={FortyTwoPercentStartup} heading="42% faster startup time" flex="0 0 260px" primary={true}> 
        <p>Shared classes and Ahead-of-Time (AOT) technologies typically reduce startup time.
          By using -Xquickstart mode as well, you can reduce startup time by up to 42%.</p>
        </PerformanceCard>
        <PerformanceCard image={TwentyEightPercentFaster} heading="Faster ramp-up time in the cloud" flex="0 0 260px" primary={true}> 
        <p>OpenJ9 reaches peak throughput on a single CPU core in 8.5 minutes compared with 30 minutes for Hotspot.
          Doing more work more quickly is important for short-lived VMs running in resource-constrained environments like the cloud.</p>
        </PerformanceCard>
      </div>
      <div
      sx={{
        display: "flex",
        justifyContent: "center",
        paddingBottom: "5%"
      }}
    >
     <a sx={{
        variant: "buttons.secondary",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textDecoration: "none",
        width:"260px",
        marginTop:"2rem"
        }} 
        href="https://github.com/eclipse/openj9-website/blob/master/benchmark/daytrader7.md" rel="noopener noreferrer" target="_blank">Read more performance details</a>

      </div>
    </div>
   
  </Layout>
);
