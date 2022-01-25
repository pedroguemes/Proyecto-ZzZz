import React from 'react'

const TooltipChart = ({ active, payload, label, dashboard }) => {

    if (active) {
        if (dashboard) {

            return (
                <div className="tooltip">
                    <h4>{label}</h4>
                    {payload && <p>{payload[0].value}</p>}
                </div>
            );
        } else {
            return (
                <div className="tooltip">
                    <h4>{label}</h4>
                    {payload && <p>{payload[0].value.toFixed(2)} USD</p>}
                </div>
            );
        }
    }
    return null;
}

export default TooltipChart

