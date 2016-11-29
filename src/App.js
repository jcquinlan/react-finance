import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios';
import './App.css';

import { FinanceData } from './components/FinanceData';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';
import { CustomTooltip } from './components/CustomTooltip';
import CircularProgress from 'material-ui/CircularProgress';

function findYears(data) {
    let years = {};
    data.forEach(datum => {
        let year = datum[0].split('-')[0];
        if(!years[year]) years[year] = true;
    })
    return Object.keys(years);
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            gdpData: [],
        }
    }

    componentDidMount() {
        const _this = this;

        axios.get('https://www.quandl.com/api/v3/datasets/FRED/NGDPPOT.json?api_key=9U-i7bsxHbU6Px8x5teC')
            .then(function (response) {
                _this.setState({
                    gdpData: _this.parseData(response.data.dataset.data),
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    parseData(data) {
        let years = findYears(data);
        let financeYears = years.map(year => {
            return {
                year,
                gdp: +(data.filter(datum => {
                    return datum[0].split('-')[0] === year;
                }).reduce((datum1, datum2) => {
                    return datum1 + datum2[1];
                }, 0) / 4).toFixed(2)
            }
        })
        return financeYears;
    }

    render() {
        return (
            <MuiThemeProvider>
            <div className="App">

                <div className="container">
                    <div className="columns">

                        { !this.state.gdpData &&
                            <CircularProgress size={80} thickness={5} />
                        }

                        <div className="column">
                            <div className="card is-fullwidth">
                                <div className="card-content area-chart-wrapper">
                                    <div className="content">
                                    <h5>GDP from 1949 - 2026</h5>
                                        <ResponsiveContainer height={ 200 }>
                                            <AreaChart data={ this.state.gdpData }
                                                margin={{top: 5, right: 0, left: 0, bottom: -1}}>
                                                <Area type="monotone" dataKey="gdp" stroke="#E74C3C" fill="#E74C3C"/>
                                                <Tooltip content={ <CustomTooltip/> }/>
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="columns">

                        <div className="column">
                            <div className="card is-fullwidth">
                                <div className="card-content">
                                    <div className="content">

                                     <FinanceData financeData={ this.state.gdpData }></FinanceData>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="column">
                            <div className="card is-fullwidth">
                                <div className="card-content">
                                    <div className="content">
                                        <p>Simple React App by <a href="https://www.github.com/jcquinlan">James Quinlan</a></p>
                                        <p>Made to demonstrate the ability to learn React in a matter of hours.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
