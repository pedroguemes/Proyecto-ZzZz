import React, { useState, useEffect } from 'react'

const BootHealth = (props) => {
    const [porcentaje, setPorcentaje] = useState('100%')
    const healty = props.features.features.hp
    const [life, setLife] = useState('lightgreen')
    const maxhealty = props.features.features.maxHp

    let newPercentage = (healty / maxhealty) * 100 + "%";

    useEffect(() => {
        if (healty <= Math.round(maxhealty / 3)) {
            setLife('darkred')
        } else if (healty <= (maxhealty / 2)) {
            setLife('red')
        }
        setPorcentaje(newPercentage)

    }, [props.features.features.hp])// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className='features-container left'>
            <div className='features-head'>
                <h2>{props.features.name}</h2>
                <h2>Lv<span>100</span></h2>
            </div>
            <div className='health-container'>
                <div className='features-health' style={{ width: porcentaje, backgroundColor: life }} />
            </div>
        </div>
    )
}

export default BootHealth
