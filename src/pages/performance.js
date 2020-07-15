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

import PerformanceCard from "../components/PerformanceCard";

class performance extends Component {

  state = {
      barChartJDK11Footprint:{ 
        labels: ['OpenJ9', 'HotSpot'],
        datasets:[
          {
            data:[
              50,              
              100,
            ],
            backgroundColor:[
              '#5DA7A3',
              '#E58B23'
            ]
          }
        ]
      },
      lineChartJDK11FootprintDuringLoad:{ 
        labels: [0, 100, 200, 300, 400, 500, 600],
        datasets:[
          {
            label: 'OpenJ9',
            data:[
              267,
              630,
              674,
              680,
              688,
              688,
              691
            ],
            fill: false,
            borderColor: "#5DA7A3",
            backgroundColor:'#5DA7A3'
          },
          {
            label: 'HotSpot',
            data:[
              500,
              786,
              945,
              975,
              985,
              1001,
              1011
            ],
            fill: false,
            borderColor:'#E58B23',
            backgroundColor:'#E58B23'
          },
        ]
      },
      barChartJDK11Startup:{ 
        labels: ['OpenJ9', 'HotSpot'],
        datasets:[
          {
            data:[
              49,              
              100,
            ],
            backgroundColor:[
              '#5DA7A3',
              '#E58B23'
            ]
          }
        ]
      },
      lineChartJDK11Throughout:{ 
        labels: [0, 102, 204, 306, 408, 510, 600],
        datasets:[
          {
            label: 'OpenJ9',
            data:[
              606,
              2853,
              3121,
              3102,
              3182,
              3069,
              3138
            ],
            fill: false,
            borderColor: "#5DA7A3",
            backgroundColor:'#5DA7A3'
          },
          {
            label: 'HotSpot',
            data:[
              139,
              2157,
              3252,
              3551,
              3469,
              3596,
              3600
            ],
            fill: false,
            borderColor:'#E58B23',
            backgroundColor:'#E58B23'
          },
        ]
      },

      barChartJDK8Footprint:{ 
        labels: ['OpenJ9', 'HotSpot'],
        datasets:[
          {
            data:[
              0.34,              
              1,
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
              232460,
              488840,
              505460,
              511838,
              516682,
              517688,
              520284,
              521074,
              521890,
              522264
            ],
            fill: false,
            borderColor: "#5DA7A3",
            backgroundColor:'#5DA7A3'
          },
          {
              label: 'HotSpot',
              data:[
                563350,
                902652,
                1023266,
                1140980,
                1200342,
                1218640,
                1220842,
                1289450,
                1359008,
                1368194
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
              1,
            ],
            backgroundColor:[
              '#5DA7A3',
              '#E58B23'
            ]
          }
        ]
      },

      lineChartJK8FasterRampupInTheCloud:{ 
        labels: [0, 155, 305, 455, 605, 755, 905, 1055, 1151, 1301, 1451],
        datasets:[
          {
            label: 'OpenJ9',
            data:[
              8.5,
              1127.5,
              1125.5,
              1132.5,
              1182,
              1061.5,
              1096.5,
              1148.5,
              1089.5,
              1066,
              1130.5
            ],
            fill: false,
            borderColor: "#5DA7A3",
            backgroundColor:'#5DA7A3'
          },
          {
              label: 'HotSpot',
              data:[
                10.5,
                508,
                675,
                808,
                900.5,
                806,
                720.5,
                808.5,
                938,
                1122,
                1166.5
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
          paddingBottom: "%"
        }}
      >
        <Styled.h2>OpenJDK 11 performance with Eclipse OpenJ9</Styled.h2>
        <Styled.p sx={{marginBottom:"0.5rem"}}>
          The result is that OpenJDK 11 with OpenJ9 demonstrates significantly better performance than with Hotspot.
        </Styled.p>
    
        <div className="row"
          sx={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
           <PerformanceCard graph={this.state.barChartJDK11Footprint} heading="Footprint" primary={true} yAxis="Normalized performance (%)"> 
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
          </PerformanceCard>
          <PerformanceCard graph={this.state.lineChartJDK11FootprintDuringLoad} heading="Footprint during load" primary={true} chartType="line" yAxis="Resident set size (MB)" xAxis="Time (s)"> 
           <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
             Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
             when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
          </PerformanceCard>
          <PerformanceCard graph={this.state.barChartJDK11Startup} heading="Startup time"  primary={true} yAxis="Normalized performance (%)"> 
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
             Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
             when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
          </PerformanceCard>
          <PerformanceCard graph={this.state.lineChartJDK11Throughout} heading="Throughput" primary={true} chartType="line" xAxis="Time (s)" yAxis="Throughput (pages/s)"> 
           <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
             Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
             when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
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
      
      <div
        sx={{
          backgroundColor: "#F5F9FC",
          paddingX: "10%",
          paddingTop: "1%",
          paddingBottom: "3%"
        }}
      >
        <Styled.h2>OpenJDK 8 performance with Eclipse OpenJ9</Styled.h2>
        <Styled.p sx={{marginBottom:"0.5rem"}}>
          The result is that OpenJDK 8 with OpenJ9 demonstrates significantly better performance than with Hotspot.
        </Styled.p>
    
        <div className="row"
          sx={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap"
          }}
        >
          <PerformanceCard graph={this.state.barChartJDK8Footprint} heading="66% smaller footprint after startup" flex="0 0 20rem" primary={true} chartType="bar" yAxis="Normalized JVM resident set size"> 
           <p>OpenJ9 is highly optimized for cloud workloads, where minimising memory footprint is important.
             Even with other optimizations enabled, the footprint stays about the same.</p>
          </PerformanceCard>
          <PerformanceCard graph={this.state.lineChartJK8FootprintDuringrampup} heading="63% smaller footprint during ramp up" flex="0 0 20rem" primary={true} chartType="line" yAxis="Process Resident Set Size" xAxis="Time (s)"> 
          <p>Memory footprint increases rapidly when load is applied, but at steady state,
            OpenJDK 8 with OpenJ9 used around 63% less physical memory than OpenJDK 8 with HotSpot.</p>
          </PerformanceCard>
          <PerformanceCard graph={this.state.barChartJDK8Startup} heading="42% faster startup time" flex="0 0 20rem" primary={true} chartType="bar" yAxis="Normalized start-up time"> 
           <p>Shared classes and Ahead-of-Time (AOT) technologies typically reduce startup time. By using -Xquickstart mode as well,
             you can reduce startup time by up to 42%.</p>
          </PerformanceCard>
          <PerformanceCard graph={this.state.lineChartJK8FasterRampupInTheCloud} heading="Faster ramp-up time in the cloud" flex="0 0 20rem" primary={true} chartType="line" xAxis="Time (s)" yAxis="Throughput"> 
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
 
