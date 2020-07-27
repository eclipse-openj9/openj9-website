// Copyright (c) 2017, 2020 IBM Corp. and others

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
// [2] http://openjdk.java.net/legal/assembly-exception.html

// SPDX-License-Identifier: EPL-2.0 OR Apache-2.0 OR GPL-2.0 WITH Classpath-exception-2.0 OR LicenseRef-GPL-2.0 WITH Assembly-exception

// The project website pages cannot be redistributed

import Layout from "../components/layout";

/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import {Component} from "react";

import PerformanceCard from "../components/performanceCard";

class performance extends Component {

  state = {
      barChartJDK8Footprint:{ 
        labels: ['OpenJ9', 'HotSpot'],
        datasets:[
          {
            data:[
              0.34,              
              1
            ],
            backgroundColor:[
              '#5DA7A3',
              '#E58B23'
            ]
          }
        ]
      },
      lineChartJK8FootprintDuringrampup:{ 
        labels: [0, 200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800],
        datasets:[
          {
            label: 'OpenJ9',
            data:[
              232,
              488,
              505,
              511,
              516,
              517,
              520,
              521,
              521,
              522
            ],
            fill: false,
            borderColor: "#5DA7A3",
            backgroundColor:'#5DA7A3'
          },
          {
            label: 'HotSpot',
            data:[
              563,
              902,
              1023,
              1140,
              1200,
              1218,
              1220,
              1289,
              1359,
              1368
            ],
            fill: false,
            borderColor:'#E58B23',
            backgroundColor:'#E58B23'
          },
        ]
      },
      barChartJDK8Startup:{ 
        labels: ['OpenJ9', 'HotSpot'],
        datasets:[
          {
            data:[
              0.58,              
              1
            ],
            backgroundColor:[
              '#5DA7A3',
              '#E58B23'
            ]
          }
        ]
      },
      lineChartJK8FasterRampupInTheCloud:{ 
        labels: [0, 150, 300, 450, 600, 750, 900, 1050, 1200, 1350],
        datasets:[
          {
            label: 'OpenJ9',
            data:[
              8.5,
              1064,
              1063,
              1133,
              1188.5,
              1071,
              1125.5,
              1084.5,
              1095,
              1104.5,
           
            ],
            fill: false,
            borderColor: "#5DA7A3",
            backgroundColor:'#5DA7A3'
          },
          {
            label: 'HotSpot',
            data:[
              10.5,
              529.5,
              700.5,
              832.5,
              796,
              829.5,
              698.5,
              791.5,
              1017,
              1175.5,
            ],
            fill: false,
            borderColor:'#E58B23',
            backgroundColor:'#E58B23'
          },
        ]
      },
    } 
  
  render (){
    return(
      <Layout isHome={false} title="Eclipse OpenJ9 performance" description="OpenJDK with OpenJ9 demonstrates significantly better performance than HotSpot.">
      <div sx={{ backgroundColor: "#F5F9FC",  paddingX: "7%", paddingTop: "3%", paddingBottom: "1%" }}>
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
          paddingX: "7%",
          paddingTop: "1%",
          paddingBottom: "3%"
        }}
      >
        <Styled.h2>OpenJDK 8 performance with Eclipse OpenJ9</Styled.h2>
        <Styled.p sx={{marginBottom:"0.5rem"}}>
          The result is that OpenJDK 8 with OpenJ9 demonstrates significantly better performance than with Hotspot.
        </Styled.p>
    
        <div
          sx={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap"
          }}
        >
          <PerformanceCard graphData={this.state.barChartJDK8Footprint} heading="66% smaller footprint after startup" primary={true} chartType="bar" yAxis="Relative resident set size"> 
            <p>OpenJ9 is highly optimized for cloud workloads, where minimizing memory footprint is important.
              Out of the box, the footprint is 66% smaller than HotSpot.</p>
          </PerformanceCard>
          <PerformanceCard graphData={this.state.lineChartJK8FootprintDuringrampup} heading="63% smaller footprint during ramp up" primary={true} chartType="line" yAxis="Resident Set Size (MB)" xAxis="Time (s)"> 
            <p>Memory footprint increases rapidly when load is applied. However, at steady state,
              OpenJ9 consistently used around 63% less physical memory than HotSpot.</p>
          </PerformanceCard>
          <PerformanceCard graphData={this.state.barChartJDK8Startup} heading="42% faster startup time" primary={true} chartType="bar" yAxis="Relative start-up time"> 
            <p>Shared classes and Ahead-of-Time (AOT) technologies typically reduce startup time. By using -Xquickstart mode as well,
              you can reduce startup time by up to 42%.</p>
          </PerformanceCard>
          <PerformanceCard graphData={this.state.lineChartJK8FasterRampupInTheCloud} heading="Faster ramp-up time in the cloud" primary={true} chartType="line" xAxis="Time (s)" yAxis="Throughput"> 
            <p>OpenJ9 reaches peak throughput on a single CPU core in 8.5 minutes compared with 30 minutes for Hotspot.
              Ideal for short-lived VMs running in the cloud.</p>
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
              width:"16rem",
              marginTop:"5rem"
              }} 
              href="https://github.com/eclipse/openj9-website/blob/master/benchmark/daytrader7.md" rel="noopener noreferrer" target="_blank">Read more performance details</a>
        </div>
      </div>
    </Layout>
    )
  }
}

export default performance;
 
