import React from "react";

class Tile extends React.Component {

  render() {
    return (
      <div className="tile card text-center">
        <h5>{this.props.heading}</h5>
        <p>{this.props.desc}</p>
      </div>
    );
  }
}

export default Tile;
