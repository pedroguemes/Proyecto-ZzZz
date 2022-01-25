import React, { useState, useEffect } from 'react'
import { AiTwotoneDelete } from 'react-icons/ai'

const CardNFT = ({data, remove}) => {
    const { img, name, price, type, clase, _id } =  data

    const [ color, setColor ] =  useState("")
    
    useEffect(() => {
        clase === "Common" ? setColor("rgba( 0, 232, 255, 0.25 )") : clase === "Rare" ? setColor("rgba( 0, 160, 42, 0.55 )") : setColor("rgba( 143, 7, 136, 0.55 )")
    }, [])
    
    return (
            <div style={{border: `6px solid ${color}`}} className='contenedor-nft-shopping'>
                <div style={{backgroundImage: `url(${img})`}} className='img-nft-shopping' ></div>
                <div className='contenedor-rarezas-shppoing'>
                    <h2>{name}</h2>
                    <p>{type}</p>
                    <p>{clase}</p>
                </div>
                <div>
                    <p>{price}ETH</p>
                </div>
                <div className='delete-card-nft-shopping'>
                    <AiTwotoneDelete onClick={() => remove(_id)}/>
                </div>
            </div>
    )
}

export default CardNFT
