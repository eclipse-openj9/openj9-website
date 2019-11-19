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
