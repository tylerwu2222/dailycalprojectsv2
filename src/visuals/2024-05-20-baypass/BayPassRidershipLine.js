import React, { useState, useEffect, PureComponent } from 'react';
import {
    LineChart,
    Text,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ReferenceLine,
    ResponsiveContainer,
} from 'recharts';

import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Box } from '@mui/material';

import ridership from './data/BART_ridership.json';


export default function BayPassRidershipLine() {

    const [asPercent, setAsPercent] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 1024);
    }, []);

    const containerStyle = {
        height: isMobile ? 360 : 400,
        // height: 600,
        margin: {
            top: isMobile ? 20 : 30,
            // right: isMobile ? 20 : 120,
            right: isMobile ? 40 : 50,
            left: isMobile ? 15 : 20,
            // bottom: isMobile ? 130 : 120
            bottom: isMobile ? 10 : 20
        }
    };
    const CustomizedLabelY = () => {
        return (
            <>
                {asPercent ?
                    <Text
                        x={isMobile ? containerStyle.margin.left : containerStyle.margin.left}
                        y={containerStyle.height * 3 / 7}
                        // y={containerStyle.height / 2}
                        fontSize={14}
                        textAnchor="middle"
                        angle={-90}
                    >
                        Percent of maximum rides since 2019
                    </Text>
                    :
                    <Text
                        x={isMobile ? containerStyle.margin.left : containerStyle.margin.left}
                        y={containerStyle.height / 2}
                        textAnchor="middle"
                        angle={-90}
                    >
                        Total rides in millions
                    </Text>
                }
            </>
        );
    };

    // const numberWithCommas = (number) => {
    //     return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // };

    const inMillions = (number) => {
        if (!asPercent) {
            return number / 1000000;
        }
        else {
            return number;
        }
    };

    const CustomLegend = ({ payload }) => (
        <>
            <div className='bp-ridership-legend'>
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex' }}>
                    {/* original legend content */}
                    {payload.map((entry, index) => (
                        <li key={`item-${index}`} style={{ marginRight: 10 }}>
                            <svg width="15" height="10">
                                <line x1="0" y1="5" x2="20" y2="5" style={{ stroke: entry.color, strokeWidth: 2 }} />
                            </svg>
                            <span style={{ marginLeft: 8, color: entry.color }}>{entry.value}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='bp-ridership-legend'>
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex' }}>
                    {/* reference lines */}
                    <li style={{ marginRight: 10 }}>
                        <svg width="15" height="10">
                            <line x1="0" y1="5" x2="20" y2="5" style={{ stroke: 'red', strokeWidth: 1, strokeDasharray: '6 2' }} />
                            {/* <line x1="5" y1="0" x2="5" y2="20" style={{ stroke: 'red', strokeWidth: 1.5, strokeDasharray: '5 2' }} /> */}
                        </svg>
                        <span style={{ color: 'red', marginLeft: 8, fontSize: 13 }}><i>COVID-19 reaches Bay Area</i></span>
                    </li>
                    <li style={{ marginRight: 10 }}>
                        <svg width="15" height="10">
                            <line x1="0" y1="5" x2="20" y2="5" style={{ stroke: 'green', strokeWidth: 1, strokeDasharray: '6 2' }} />
                            {/* <line x1="5" y1="0" x2="5" y2="20" style={{ stroke: 'green', strokeWidth: 1.5, strokeDasharray: '5 2' }} /> */}
                        </svg>
                        <span style={{ color: 'green', marginLeft: 8, fontSize: 13 }}><i>California lifts stay-at-home order</i></span>
                    </li>
                </ul >
            </div>
        </>
    );

    return (
        <div className='bp-line-div'>
            <div className='bp-ridership-title-div'>
                <h2>BART ridership recovery post-pandemic</h2>
            </div>
            <div className='bp-ridership-radio-div'>
                <FormControl>
                    <Box display="flex" flexDirection="column" alignItems={isMobile ? "left" : "center"}>
                        <FormLabel id="demo-row-radio-buttons-group-label">Monthly BART ridership</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={asPercent}
                            onChange={(e) => {
                                if (e.target.value === 'true') {
                                    setAsPercent(true);
                                }
                                else {
                                    setAsPercent(false);
                                }
                            }}
                        >
                            <FormControlLabel value={false} control={<Radio />} label="Total monthly ridership" />
                            <FormControlLabel value={true} control={<Radio />} label="Percent ridership" />
                        </RadioGroup>
                    </Box>
                </FormControl>
            </div>
            <div className='bp-ridership-viz-div'>
                <ResponsiveContainer
                    // width={isMobile ? "95%" : "80%"}
                    height={containerStyle.height}
                >
                    <LineChart
                        // width={500}
                        // height={300}
                        data={ridership}
                        style={containerStyle}
                        margin={containerStyle.margin}

                    // margin={{
                    //     top: 20,
                    //     right: 50,
                    //     left: 80,
                    //     bottom: 5,
                    // }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="Month"
                        // label={""}
                        />
                        <YAxis
                            label={CustomizedLabelY}
                            tickFormatter={inMillions}
                            // tickFormatter={numberWithCommas}
                            // formatter={(value) => value && value.toLocaleString()}
                            tick={{ fontSize: isMobile ? asPercent ? 14 : 11 : asPercent ? 16 : 14, fill: '#000' }}
                            textAnchor="end"
                        />
                        {/* <Legend /> */}
                        <Legend content={<CustomLegend />} />
                        <Tooltip formatter={(value) => value && value.toLocaleString()} />
                        <ReferenceLine
                            x="Feb. 2020"
                            stroke="red"
                            // label={isMobile ?
                            //     { position: 'top', value: 'lockdown', fill: 'red', fontSize: 10 } :
                            //     { position: 'top', value: 'COVID in Norcal', fill: 'red', fontSize: 10 }
                            // }
                            strokeDasharray="3 3" />
                        <ReferenceLine
                            x="Jan. 2021"
                            stroke="green"
                            // label={isMobile ?
                            //     { position: 'top', value: "lifted", fill: 'green', fontSize: 10 } :
                            //     { position: 'top', value: "CA lifts stay-at-home order", fill: 'green', fontSize: 10 }
                            // }
                            strokeDasharray="3 3" />
                        {asPercent ?
                            <>
                                <Line
                                    key="Downtown Berkeley (%)"
                                    type="monotone"
                                    dataKey="Downtown Berkeley (%)"
                                    stroke="#4b9ccf"
                                    dot={false}
                                />
                                <Line
                                    key="North Berkeley (%)"
                                    type="monotone"
                                    dataKey="North Berkeley (%)"
                                    stroke="#fdd40c"
                                    dot={false} />
                                <Line
                                    key="All stops (%)"
                                    type="monotone"
                                    dataKey="All stops (%)"
                                    stroke="#96c066"
                                    dot={false} />
                            </> :
                            <>
                                <Line
                                    key="Downtown Berkeley"
                                    type="monotone"
                                    dataKey="Downtown Berkeley"
                                    stroke="#4b9ccf"
                                    dot={false}
                                />
                                <Line
                                    key="North Berkeley"
                                    type="monotone"
                                    dataKey="North Berkeley"
                                    stroke="#fdd40c"
                                    dot={false} />
                                <Line
                                    key="All stops"
                                    type="monotone"
                                    dataKey="All stops"
                                    stroke="#96c066"
                                    dot={false} />
                            </>
                        }
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div>
                <p className='bp-line-note'>
                    <b>Note: </b>
                    <i>Percent ridership</i> is the ridership compared to peak ridership pre-pandemic. Ridership is based on number of entrances at a given stop.
                    <span></span>
                </p>
                <p className='bp-line-about-data'>
                    <b>About the data: </b>This data was obtained from <a href="https://www.bart.gov/about/reports/ridership" target='_blank'>bart.gov</a>.
                </p>
            </div>
        </div >
    )
}
