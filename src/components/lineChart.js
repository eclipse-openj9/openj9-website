import React, {Component} from "react";

import { Line, } from 'react-chartjs-2';

class LineChart extends Component {
   state = {
        lineChartData: this.props.lineChartData,

    }

    static defaultProps = {
        displayLegend: true,
        legendPosition:'right',
    }

    render(){
        return(
            <div>
                <Line
                    data={this.state.lineChartData}
                    height={220}
                    width={280}
                    options={{
                        scales:{
                            xAxes: [{
                                display: true,
                                ticks: {
                                    fontColor: "white",
                                    maxTicksLimit: 3,
                                },
                                gridLines: {
                                    color: "white",
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: this.props.xAxis,
                                    fontColor: 'white'                                    
                                  }
                            }],
                            yAxes: [{
                                display: true,
                                ticks: {
                                    fontColor: "white",
                                    maxTicksLimit: 3,
                    
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
                        legend:{
                            labels : {
                                fontColor: "white"
                            },
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

export default LineChart;