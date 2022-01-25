import React, { useState, useEffect } from 'react'
import NftItem from './NftItem'
const Carousel = (props) => {
    const [nftProceced, setNftProceced] = useState([])
    const [slide, setSlide] = useState(0)
    const size = props.nfts.length
    const [uniq, setUniq] = useState(false)
    function handlerLeft() {
        if (slide > 0) {
            setSlide(prev => prev - 1)
        } else {
            setSlide(size - 1)
        }
    }
    function handlerRight() {
        if ((size - 1) === slide) {
            setSlide(0)
        } else {
            setSlide(prev => prev + 1)
        }
    }


    // se pueden cambiar los numeros en donde existen x, donde x representa la cantidad de slides del carrusel
    useEffect(() => {
        const filteredNfts = props.nfts.filter(nft => nft.type === 'Gamer')
        setNftProceced(filteredNfts)
        filteredNfts.length === 1 && setUniq(true)
        // const aux = []
        // let cont1 = 0
        // let cont2 = 1 // x
        // let auxcont
        // if (props.nfts.length % 1 === 0) {  // x
        //     auxcont = (Math.floor(props.nfts.length / 1))  // x
        // } else {
        //     auxcont = (Math.floor(props.nfts.length / 1) + 1)  // x
        // }

        // for (let index = 0; index < props.nfts.length; index++) {

        //     if (index < auxcont) {

        //         let retornado = props.nfts.slice(cont1, cont2)
        //         aux.push(retornado)
        //         cont1 = cont1 + 1   // x
        //         cont2 = cont2 + 1   // x
        //     }
        // }
    }, [props.nfts])
    return (
        <>
            {nftProceced.length > 0 && <NftItem choice={props.choice} uniq={uniq} right={handlerRight} left={handlerLeft} nftsProceced={nftProceced[slide]} />}
        </>

    )
}

export default Carousel
