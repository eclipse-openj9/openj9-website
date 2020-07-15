import React, {Component} from "react";

import { Bar } from 'react-chartjs-2';

class BarChart extends Component {
    state = {
        barChartData: this.props.barChartData,
    }
    
    static defaultProps = {
        displayLegend: false,
        legendPosition:'bottom',
    }

    render(){
        return(
            <div>
                <Bar
                    data={this.state.barChartData}
                    height={220}
                    width={280}
                    options={{
                        scales:{
                            xAxes: [{
                                display: true,
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
                                display: true,
                                ticks: {
                                    fontColor: "white",
                                    maxTicksLimit: 4,
                                    padding:2,
                                    beginAtZero: true
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