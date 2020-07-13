import React, {Component} from "react";

import { Bar } from 'react-chartjs-2';

class BarChart extends Component {
    constructor(props){
        super(props);
        this.state = {
            barChartData:props.barChartData,

        }
    }
    static defaultProps = {
        displayTitle: false,
        displayLegend: false,
        legendPosition:'right',
        location:'City'
      }
    render(){
        return(
            <div className="chart">
                <Bar
                    data={this.state.barChartData}
                    height={220}
                    width={300}
                    options={{
                        scales:{
                            xAxes: [{
                                display: true, //this will remove all the x-axis grid lines
                                ticks: {
                                    fontColor: "white",
                                },
                                gridLines: {
                                    color: "white",
                                },
                                scaleLabel: {
                                    display: false,
                                    labelString: this.props.xAxis,
                                    fontColor: 'white'                                    
                                  }
                            }],
                            yAxes: [{
                                display: true, //this will remove all the x-axis grid lines
                                ticks: {
                                    fontColor: "white",
                                    maxTicksLimit: 4,
                                    padding:2
                                },
                                gridLines: {
                                    color: "white",
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: this.props.yAxis,
                                    fontColor: 'white'                                    
                                  }
                            }]

                        },
                        title:{
                          display:this.props.displayTitle,
                          text:'Largest Cities In ' + this.props.location,
                          fontSize:25
                        },
                        legend:{
                            display:this.props.displayLegend,
                            position:this.props.legendPosition
                        },
                        animation: {
                            duration: 2000,
                            easing: 'easeOutCubic',

                        },
                      }}
                />                
            </div>
        )
    }
}

export default BarChart;