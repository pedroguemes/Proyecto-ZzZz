import React from 'react'
import {
    ResponsiveContainer,
    AreaChart,
    XAxis,
    YAxis,
    Area,
    Tooltip,
    CartesianGrid,
} from "recharts";
import TooltipChart from './TooltipChart'

const Graph = (props) => {
    return (

        <div className='dashboard-graph'>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={props.data}>
                    <defs>
                        <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
                            <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
                        </linearGradient>
                    </defs>

                    <Area dataKey="value" stroke="#2451B7" fill="url(#color)" />

                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                    />

                    <YAxis
                        datakey="value"
                        axisLine={false}
                        tickLine={false}
                        tickCount={5}
                    />

                    <Tooltip dashboard={props.dashboard} content={<TooltipChart />} />

                    <CartesianGrid opacity={0.1} vertical={false} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Graph
