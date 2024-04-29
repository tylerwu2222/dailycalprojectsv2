import React, { useState } from 'react';
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

const containerStyle = {
    // height: isMobile ? 500 : 800,
    height: 600,
    margin: {
        top: 20,
        // right: isMobile ? 20 : 120,
        right: 20,
        left: 20,
        // bottom: isMobile ? 130 : 120
        bottom: 20
    }
};



export default function BayPassRidershipLine() {

    const [asPercent, setAsPercent] = useState(false);

    const CustomizedLabelY = () => {
        return (
            <>
                {asPercent ? <Text
                    x={containerStyle.margin.left}
                    y={containerStyle.height / 2}
                    textAnchor="middle"
                    angle={-90}
                >
                    Percent of max rides since 2019 (per month)
                </Text>
                    : <Text
                        x={containerStyle.margin.left}
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
                        width={500}
                        height={300}
                        data={ridership}
                        margin={{
                            top: 20,
                            right: 50,
                            left: 50,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="Month"
                        // label={""}
                        />
                        <YAxis
                            label={CustomizedLabelY}
                            tick={{ fontSize: asPercent ? 16 : 14, fill: '#000' }}
                            textAnchor="end"
                        />
                        <Legend />
                        <Tooltip />
                        <ReferenceLine
                            x="Feb 2020"
                            stroke="red"
                            label={{ position: 'top', value: 'COVID cases in Norcal', fill: 'red', fontSize: 14 }}
                            strokeDasharray="3 3" />
                        <ReferenceLine
                            x="Jan 2021"
                            stroke="green"
                            label={{ position: 'top', value: "CA lifts stay-at-home order", fill: 'green', fontSize: 14 }}
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
