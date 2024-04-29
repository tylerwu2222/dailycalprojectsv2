import React, { useState, useEffect } from 'react';
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

import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';

import ridership from './data/BART_ridership.json';




export default function BayPassRidershipLine() {

    const [asPercent, setAsPercent] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 1024);
    }, []);

    const containerStyle = {
        height: isMobile ? 500 : 700,
        // height: 600,
        margin: {
            top: 30,
            // right: isMobile ? 20 : 120,
            right: 50,
            left: isMobile ? 20 : 40,
            // bottom: isMobile ? 130 : 120
            bottom: 20
        }
    };
    const CustomizedLabelY = () => {
        return (
            <>
                {asPercent ? <Text
                    x={isMobile ? containerStyle.margin.left : containerStyle.margin.left / 3}
                    y={containerStyle.height / 2}
                    textAnchor="middle"
                    angle={-90}
                >
                    Percent of max rides since 2019 (per month)
                </Text>
                    : <Text
                        x={isMobile ? containerStyle.margin.left : containerStyle.margin.left / 3}
                        y={containerStyle.height / 2}
                        textAnchor="middle"
                        angle={-90}
                    >
                        Total rides (per month)
                    </Text>
                }
            </>
        );
    };

    return (
        <>
            <div className='bp-ridership-title-div'>
                <h2>BART ridership recovery post-pandemic</h2>
            </div>
            <div className='bp-ridership-radio-div'>
                <FormControl>
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
                        <FormControlLabel value={false} control={<Radio />} label="total ridership" />
                        <FormControlLabel value={true} control={<Radio />} label="percent ridership" />
                    </RadioGroup>
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
                            tick={{ fontSize: isMobile ? asPercent ? 14 : 11 : asPercent ? 16 : 14, fill: '#000' }}
                            textAnchor="end"
                        />
                        <Legend />
                        <Tooltip />
                        <ReferenceLine
                            x="Feb 2020"
                            stroke="red"
                            label={isMobile ?
                                { position: 'top', value: 'lockdown', fill: 'red', fontSize: 10 } :
                                { position: 'top', value: 'COVID cases in Norcal', fill: 'red', fontSize: 10 }
                            }
                            strokeDasharray="3 3" />
                        <ReferenceLine
                            x="Jan 2021"
                            stroke="green"
                            label={isMobile ?
                                { position: 'top', value: "lifted", fill: 'green', fontSize: 10 } :
                                { position: 'top', value: "CA lifts stay-at-home order", fill: 'green', fontSize: 10 }
                            }
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
        </>
    )
}
