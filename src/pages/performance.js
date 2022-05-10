// Copyright (c) 2017, 2022 IBM Corp. and others

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
import Testimonials from "../components/testimonials";

class performance extends Component {
  state = {
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
    lineChartJK8FootprintDuringLoad:{ 
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
    barChartJDK11Startup:{ 
      labels: ['OpenJ9', 'HotSpot'],
      datasets:[
        {
          data:[
            0.49,              
            1
          ],
          backgroundColor:[
            '#5DA7A3',
            '#E58B23'
          ]
        }
      ]
    },
    barChartJDK11Footprint:{ 
      labels: ['OpenJ9', 'HotSpot'],
      datasets:[
        {
          data:[
            0.50,              
            1
          ],
          backgroundColor:[
            '#5DA7A3',
            '#E58B23'
          ]
        }
      ]
    },
    lineChartJK11FasterRampupInTheCloud:{ 
      labels: [0, 25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300],
      datasets:[
        {
          label: 'OpenJ9',
          data:[
            606,
            2483,
            2621,
            2805,
            2853,
            2924,
            3049,
            3103,
            3122,
            3043,
            3069,
            3092,
            3167
          ],
          fill: false,
          borderColor: "#5DA7A3",
          backgroundColor:'#5DA7A3'
        },
        {
          label: 'HotSpot',
          data:[
            139,
            1208,
            1620,
            1952,
            2157,
            2551,
            2696,
            2879,
            3264,
            3337,
            3392,
            3436,
            3479
          ],
          fill: false,
          borderColor:'#E58B23',
          backgroundColor:'#E58B23'
        },
      ]
    },
    lineChartJK11FootprintDuringLoad:{ 
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
            691,
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
            1011,
          ],
          fill: false,
          borderColor:'#E58B23',
          backgroundColor:'#E58B23'
        },
      ]
    },

    barChartJDK11QuarkusStartup:{ 
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

    barChartJDK11QuarkusFootprint:{ 
      labels: ['OpenJ9', 'HotSpot'],
      datasets:[
        {
          data:[
            0.82,              
            1
          ],
          backgroundColor:[
            '#5DA7A3',
            '#E58B23'
          ]
        }
      ]
    },

    lineChartJK11QuarkusFasterRampupInTheCloud:{ 
      labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
      datasets:[
        {
          label: 'OpenJ9',
          data:[
            2,
            4233,
            4311,
            4307,
            4312,
            4347,
            4432,
            4468,
            4564,
            4601,
            4627,
            4606,
            4657
          ],
          fill: false,
          borderColor: "#5DA7A3",
          backgroundColor:'#5DA7A3'
        },
        {
          label: 'HotSpot',
          data:[
            1,
            1426,
            1959,
            3603,
            5545,
            5609,
            5616,
            5601,
            5583,
            5619,
            5560,
            5354,
            5639
          ],
          fill: false,
          borderColor:'#E58B23',
          backgroundColor:'#E58B23'
        },
      ]
    },

    barChartJK11QuarkusFootprintDuringLoad:{ 
      labels: ['OpenJ9', 'HotSpot'],
      datasets:[
        {
          data:[
            147,              
            178
          ],
          backgroundColor:[
            '#5DA7A3',
            '#E58B23'
          ]
        }
      ]
    },
  } 
  
  render (){
    return(
      <Layout isHome={false} title="Eclipse OpenJ9 performance" description="OpenJDK with OpenJ9 demonstrates significantly better performance than HotSpot.">
      <section sx={{ backgroundColor: "#F5F9FC",  paddingX: "7%", paddingTop: "4rem", paddingBottom: "0.1rem" }}>
        <Styled.h1 sx={{marginBottom:"1rem"}}>Performance Overview</Styled.h1>
          <Styled.p>
            Application performance can be measured using many different metrics, including startup time,
            ramp-up time, footprint, and response time, as well as throughput. At Eclipse OpenJ9, we keep a watchful eye on all
            of these metrics, making sensible tradeoffs and providing tuning options that allow the virtual machine (VM) to be
            optimized for different workloads. We regularly test and optimize OpenJ9 performance when running the most popular 
            Java frameworks such as Open Liberty, Quarkus, SpringBoot, and Micronaut. We're proud of our results. 
          </Styled.p>
      </section>

      <section id="openjdk11"
        sx={{
          backgroundColor: "#F5F9FC",
          paddingX: "7%",
          paddingTop: "0.1rem",
          paddingBottom: "4rem"
        }}
      >
        <Styled.h2>OpenJDK 11 performance with Eclipse OpenJ9</Styled.h2>
        <Styled.p sx={{marginBottom:"0.5rem"}}>
          OpenJDK 11 with OpenJ9 significantly outperforms HotSpot on Liberty startup, ramp up, and footprint.
        </Styled.p>
    
        
        <div
          sx={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap"
          }}
        >
          <PerformanceCard graphData={this.state.barChartJDK11Startup} heading="51% faster startup time" primary={true} chartType="bar" yAxis="Relative startup time"> 
            <p>By using shared classes cache and AOT technology, OpenJ9 starts in roughly half the time it takes HotSpot.</p>
          </PerformanceCard>
          <PerformanceCard graphData={this.state.barChartJDK11Footprint} heading="50% smaller footprint after startup" primary={true} chartType="bar" yAxis="Relative resident set size"> 
            <p>After startup, the OpenJ9 footprint is half the size of HotSpot, which makes it ideal for cloud workloads.</p>
          </PerformanceCard>
          <PerformanceCard graphData={this.state.lineChartJK11FasterRampupInTheCloud} heading="Faster ramp-up time in the cloud" primary={true} chartType="line" xAxis="Time (s)" yAxis="Throughput (pages/s)"> 
            <p>OpenJ9 reaches peak throughput much faster than HotSpot making it especially suitable for running short-lived applications.</p>
          </PerformanceCard>
          <PerformanceCard graphData={this.state.lineChartJK11FootprintDuringLoad} heading="33% smaller footprint during load" primary={true} chartType="line" yAxis="Resident Set Size (MB)" xAxis="Time (s)"> 
            <p>Consistent with the footprint results after startup, the OpenJ9 footprint remains much smaller than HotSpot when load is applied.</p>
          </PerformanceCard>
        </div>
        <div
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <a sx={{
              variant: "buttons.secondary",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              width:"16rem",
              marginTop:"7rem"
              }} 
              href="https://github.com/eclipse-openj9/openj9-website/blob/master/benchmark/openjdk11-daytrader7.md" rel="noopener noreferrer" target="_blank">Show me performance details</a>
        </div>

        <div
            sx={{
                display: "grid",
                gridGap:'3rem',
                gridTemplateColumns:['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)'],
                paddingTop:"4rem"
            }}
        >
          <Testimonials source="Open Liberty blog" link="https://openliberty.io/blog/2019/10/30/faster-startup-open-liberty.html">
            With version 19.0.0.9 of Open Liberty and OpenJ9, Open Liberty managed to cut the startup time to their goal of almost exactly one second.
          </Testimonials>

          <Testimonials source="Payara Enterprise" link="https://blog.payara.fish/faster-payara-micro-startup-times-with-openj9">
            Payara found that with datagrid enabled, Payara Micro with class data sharing, booted in about 6 seconds, improving startup time by almost 40%.
          </Testimonials>
        </div>	
        </section>

        <section id="openjdk11quarkus"
          sx={{
            backgroundColor: "#F5F9FC",
            paddingX: "7%",
            paddingTop: "0.1rem",
            paddingBottom: "4rem"
          }}
        >
          <Styled.h2>OpenJDK 11 performance with Quarkus and Eclipse OpenJ9</Styled.h2>
          <Styled.p sx={{marginBottom:"0.5rem"}}>
          Using Quarkus with OpenJ9 instead of HotSpot makes Java even more supersonic and subatomic!
          </Styled.p>
          
          <div
            sx={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap"
            }}
          >
            <PerformanceCard graphData={this.state.barChartJDK11QuarkusStartup} heading="66% faster startup time" primary={true} chartType="bar" yAxis="Relative startup time"> 
              <p>Quarkus might be supersonic, but running it with OpenJ9 instead of HotSpot reduces startup time by a further 66%.</p>
            </PerformanceCard>
            <PerformanceCard graphData={this.state.barChartJDK11QuarkusFootprint} heading="18% smaller footprint after startup" primary={true} chartType="bar" yAxis="Relative resident set size"> 
              <p>The ultra-supersonic startup time comes at some tradeoff to footprint, but OpenJ9 still has an edge over HotSpot.</p>
            </PerformanceCard>
            <PerformanceCard graphData={this.state.lineChartJK11QuarkusFasterRampupInTheCloud} heading="Faster ramp-up time in the cloud" primary={true} chartType="line" xAxis="Time (s)" yAxis="Throughput (pages/s)"> 
              <p>For short-lived cloud workloads running on Quarkus, OpenJ9 delivers excellent ramp-up performance compared to HotSpot.</p>
            </PerformanceCard>
            <PerformanceCard graphData={this.state.barChartJK11QuarkusFootprintDuringLoad} heading="18% smaller footprint during load" primary={true} chartType="bar" yAxis="Resident Set Size (MB)" xAxis="Time (s)"> 
              <p>When ramp-up completes, as well as getting there faster, OpenJ9 still retains a smaller footprint than HotSpot.</p>
            </PerformanceCard>
          </div>
          <div
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <a sx={{
                variant: "buttons.secondary",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
                width:"16rem",
                marginTop:"7rem"
                }} 
                href="https://github.com/eclipse-openj9/openj9-website/blob/master/benchmark/quarkus.md" rel="noopener noreferrer" target="_blank">Show me performance details</a>
          </div>

          <div
            sx={{
                display: "grid",
                gridGap:'3rem',
                gridTemplateColumns:['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)'],
                paddingTop:"4rem"
            }}
          >
            <Testimonials source="Trendyol Tech blog" link="https://medium.com/trendyol-tech/how-trendyol-jvm-applications-consume-less-memory-in-the-production-environment-87e419dd18a0">
              Trendyol Tech found 40% faster startup time and 73 MB less memory footprint when they ran Undertow + Rest + Couchbase Client with OpenJ9.
            </Testimonials>

            <Testimonials source="Graeme Rocher, Micronaut" link="https://twitter.com/graemerocher/status/1090204088065802240?lang=en">
              As reported on twitter, Micronautfw startup with OpenJ9 is as fast as Node.js.
            </Testimonials>
          </div>	  
      </section>

      <section id="openjdk8"
        sx={{
          backgroundColor: "#F5F9FC",
          paddingX: "7%",
          paddingTop: "0.1rem",
          paddingBottom: "4rem"
        }}
      >
        <Styled.h2>OpenJDK 8 performance with Eclipse OpenJ9</Styled.h2>
        <Styled.p sx={{marginBottom:"0.5rem"}}>
          Testing shows similar results for OpenJDK 8; OpenJ9 demonstrates significantly better performance than OpenJDK 8 with HotSpot
        </Styled.p>
    
        
        <div
          sx={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap"
          }}
        >
          <PerformanceCard graphData={this.state.barChartJDK8Startup} heading="42% faster startup time" primary={true} chartType="bar" yAxis="Relative startup time"> 
            <p>Shared classes and Ahead-of-Time (AOT) technologies typically reduce startup time. By using -Xquickstart mode as well,
              you can reduce startup time by up to 42%.</p>
          </PerformanceCard>
          <PerformanceCard graphData={this.state.barChartJDK8Footprint} heading="66% smaller footprint after startup" primary={true} chartType="bar" yAxis="Relative resident set size"> 
            <p>OpenJ9 is highly optimized for cloud workloads, where minimizing memory footprint is important.
              Out of the box, the footprint is 66% smaller than HotSpot.</p>
          </PerformanceCard>
          <PerformanceCard graphData={this.state.lineChartJK8FasterRampupInTheCloud} heading="Faster ramp-up time in the cloud" primary={true} chartType="line" xAxis="Time (s)" yAxis="Throughput (pages/s)"> 
            <p>OpenJ9 reaches peak throughput on a single CPU core in 8.5 minutes compared with 30 minutes for Hotspot.
              Ideal for short-lived VMs running in the cloud.</p>
          </PerformanceCard>
          <PerformanceCard graphData={this.state.lineChartJK8FootprintDuringLoad} heading="63% smaller footprint during load" primary={true} chartType="line" yAxis="Resident Set Size (MB)" xAxis="Time (s)"> 
            <p>Memory footprint increases rapidly when load is applied. However, at steady state,
              OpenJ9 consistently used around 63% less physical memory than HotSpot.</p>
          </PerformanceCard>
        </div>
        <div
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <a sx={{
              variant: "buttons.secondary",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              width:"16rem",
              marginTop:"7rem"
              }} 
              href="https://github.com/eclipse-openj9/openj9-website/blob/master/benchmark/daytrader7.md" rel="noopener noreferrer" target="_blank">Show me performance details</a>
        </div>

        <div
            sx={{
                display: "grid",
                gridGap:'3rem',
                gridTemplateColumns:['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)'],
                paddingTop:"4rem"
            }}
        >
          <Testimonials source="Eclipse Vert.x how-to guide" link="https://how-to.vertx.io/openj9-howto/">
            Vert.x found that OpenJ9 was very efficient with respect to memory consumption, without compromising the latency.
          </Testimonials>

          <Testimonials source="AMIS technology blog" link="https://technology.amis.nl/2019/09/03/microservice-framework-startup-time-on-different-jvms-aot-and-jit/">
            As reported on the Amis technology blog, when testing a number of JVMs, OpenJDK with OpenJ9 was the fastest to start for every framework.
          </Testimonials>
        </div>	 
      </section>
    </Layout>
    )
  }
}

export default performance;
 
