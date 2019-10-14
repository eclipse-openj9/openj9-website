// Copyright (c) 2017, 2019 IBM Corp. and others
// This program and the accompanying materials are made available under the terms of the Eclipse Public License 2.0 which accompanies this distribution and is available at http://eclipse.org/legal/epl-2.0 or the Apache License, Version 2.0 which accompanies this distribution and is available at https://www.apache.org/licenses/LICENSE-2.0. 
// This Source Code may also be made available under the following Secondary Licenses when the conditions for such availability set forth in the Eclipse Public License, v. 2.0 are satisfied: GNU General Public License, version 2 with the GNU Classpath Exception [1] and GNU General Public License, version 2 with the OpenJDK Assembly Exception [2]. 
// [1] https://www.gnu.org/software/classpath/license.html  
// [2] http://openjdk.java.net/legal/assembly-exception.html 
// SPDX-License-Identifier: EPL-2.0 OR Apache-2.0 OR GPL-2.0 WITH Classpath-exception-2.0 OR LicenseRef-GPL-2.0 WITH Assembly-exception
// The project website pages cannot be redistributed


import React from "react";

import Carousel from 'react-bootstrap/Carousel'
import Tile from "../components/tile";

const Carousels = () => (
  <React.Fragment>
    <Carousel className="desktop-only">
      <Carousel.Item>
        <div className="row">
          <Tile className="col-xs-6" heading="LOW MEMORY FOOTPRINT" desc="Open J9 was found to use approximately 63% less physical memory than HotSpot."/>
          <Tile className="col-xs-6" heading="FAST STARTUP TIME" desc="AOT typically reduce startup time while improving the overall ramp up time of applications"/>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="row">
          <Tile className="col-xs-6" heading="HIGH APPLICATION THROUGHPUT"/>
          <Tile className="col-xs-6" heading="SMOOTHER RAMP-UP IN THE CLOUD"/>
        </div>
      </Carousel.Item>
    </Carousel>

    <Carousel className="mobile-only">
      <Carousel.Item>
        <Tile heading="LOW MEMORY FOOTPRINT" desc="Open J9 was found to use approximately 63% less physical memory than HotSpot."/>
      </Carousel.Item>
      <Carousel.Item>
        <Tile heading="FAST STARTUP TIME" desc="AOT typically reduce startup time while improving the overall ramp up time of applications"/>
      </Carousel.Item>
      <Carousel.Item>
        <Tile heading="HIGH APPLICATION THROUGHPUT"/>
      </Carousel.Item>
      <Carousel.Item>
        <Tile heading="SMOOTHER RAMP-UP IN THE CLOUD"/>
      </Carousel.Item>
    </Carousel>
  </React.Fragment>
)

export default Carousels;
