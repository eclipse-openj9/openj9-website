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

/** @jsx jsx */

import { jsx } from "theme-ui";
import LineChart from "../components/lineChart";
import BarChart from "../components/barChart";
const PerformanceCard = ({ children, primary, graph, heading, chartType, xAxis, yAxis }) => {
    if (chartType === "line") {
        return (
            <div
              sx={{
                boxShadow: primary ? "cardShadow" : null,
                borderRadius: "card",
                backgroundColor: "primary",
                color: "white",
                marginY: 5,
                marginX: 1,
                width:"18rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
                <h5 sx={{fontSize:"1.1rem",margin:"0.5rem 1.5rem 0.5rem 1.5rem", textAlign:"center", height:"3rem",}}>{heading}</h5>
                 <LineChart lineChartData={graph} legendPosition="bottom" xAxis={xAxis} yAxis={yAxis}/>
              <div
              sx={{
                boxShadowBottom: primary ? "cardShadow" : null,
                borderBottomRightRadius: "card",
                borderBottomLeftRadius: "card",
                backgroundColor: "white",
                borderTop: "5px solid #5DA7A3",
                color: "darkText",
                height:"50%",
                padding:"4rem 1rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width:"100%",
                marginBottom:"-4rem",
                marginTop:"1rem"
 
              }}
            >
              {children}
            </div>
            </div>
            
          );
    } else {
        return (
            <div
              sx={{
        
                boxShadow: primary ? "cardShadow" : null,
                borderRadius: "card",
                backgroundColor: "primary",
                color: "white",
                marginY: 5,
                marginX: 1,
                width:"18rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
                <h5 sx={{fontSize:"1.1rem",margin:"0.5rem 1rem 0.5rem 1rem", textAlign:"center", height:"3rem",}}>{heading}</h5>
                <BarChart barChartData={graph} yAxis={yAxis}/>
              <div
              sx={{
                boxShadowBottom: primary ? "cardShadow" : null,
                borderBottomRightRadius: "card",
                borderBottomLeftRadius: "card",
                backgroundColor: "white",
                borderTop: "5px solid #5DA7A3",
                color: "darkText",
                height:"50%",
                padding:"4rem 1rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width:"100%",
                marginBottom:"-4rem",
                marginTop:"1rem"
              }}
            >
              {children}
            </div>
            </div>
            
          );
    }
};

export default PerformanceCard;
