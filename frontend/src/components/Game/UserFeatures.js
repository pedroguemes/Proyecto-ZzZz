import React, { useState, useEffect } from 'react'

const UserHealth = (props) => {
    const [porcentaje, setPorcentaje] = useState('100%')
    const [life, setLife] = useState('lightgreen')
    const healty = props.features.features.hp
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
        <div className='features-container center'>
            <div className='features-head'>
                <h2>{props.features.name}</h2>
                <h2>Lv<span>1</span></h2>
            </div>
            <div className='health-container'>

                <div className='features-health' style={{ width: porcentaje, backgroundColor: life }} />
            </div>
            <div className='features-footer'>{healty + '/' + maxhealty}</div>
        </div>
    )
}

export default UserHealth
