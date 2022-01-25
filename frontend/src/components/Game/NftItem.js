import React, { useEffect, useState } from 'react'

const NftItem = (props) => {

    //     // const [time, setTime] = useState(3000)
    //     // useEffect(() => {
    //     //     const interval = setInterval(() => {
    //     //         props.right()
    //     //     }, time)
    //     //     return () => clearInterval(interval)

    //     // })

    //     // function active() {
    //     //     setTime(3000)
    //     // }
    //     // function pause() {
    //     //     setTime(36000000)

    //     // }

    return (

        <div className="nft-item">
            {!props.uniq && <i style={{ cursor: 'pointer', alignSelf: 'center', marginRight: '1rem' }} onClick={() => props.left()} className="fa fa-chevron-left" aria-hidden="true"></i>}
            {props.nftsProceced &&
                <button className='nft-card' key={Math.random()} onClick={() => props.choice(props.nftsProceced.name)}>
                    <div className='nft-img' style={{ backgroundImage: `url(${props.nftsProceced.img})` }} >
                        <div className='nft-name'>{props.nftsProceced.name}</div>
                    </div>
                </button>
            }
            {!props.uniq && <i style={{ cursor: 'pointer', alignSelf: 'center', marginLeft: '1rem' }} onClick={() => props.right()} className="fa fa-chevron-right" aria-hidden="true"></i>}

        </div>

    )
}

export default NftItem
