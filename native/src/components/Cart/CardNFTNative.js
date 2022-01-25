import React, { useState, useEffect } from 'react'
import {View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity} from 'react-native'
import { JumpingTransition } from 'react-native-reanimated'
// import { AiTwotoneDelete } from 'react-icons/ai'

const CardNFT = ({data, remove}) => {
    const { img, name, price, type, clase, _id } =  data

    const [ color, setColor ] =  useState("")
    
    useEffect(() => {
        // clase === "Common" ? setColor("rgba( 0, 232, 255, 0.25 )") : clase === "Rare" ? setColor("rgba( 0, 160, 42, 0.55 )") : setColor("rgba( 143, 7, 136, 0.55 )")
    }, [])
    
    return (
            // <div style={{border: `6px solid ${color}`}} className='contenedor-nft-shopping'>
            //     <div style={{backgroundImage: `url(${img})`}} className='img-nft-shopping' ></div>
            //     <div className='contenedor-rarezas-shppoing'>
            //         <h2>{name}</h2>
            //         <p>{type}</p>
            //         <p>{clase}</p>
            //     </div>
            //     <div>
            //         <p>{price}ETH</p>
            //     </div>
            //     <div className='delete-card-nft-shopping'>
            //         <AiTwotoneDelete onClick={() => remove(_id)}/>
            //     </div>
            // </div>

            <View style={styles.mainView}>
                <Image source={img} style={styles.image}/>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.text}>{name}</Text>
                        <Text style={styles.text}>{type}</Text>
                        <Text style={styles.text}>{clase}</Text>
                    </View>
                    <View>
                        <Text style={styles.text}>{price} ETH</Text>
                    </View>
                    <TouchableOpacity onPress={() => remove(_id)} style={styles.buttonRemove} activeOpacity={0.2} underlayColor="gray">
                    <Text style={styles.buttonText}> Remove NFT </Text>
                    </TouchableOpacity>
                </View>
            </View>
    )
}

export default CardNFT

const styles = StyleSheet.create({
    mainView:{
        backgroundColor:'#001a33',
        flexDirection: 'row',
        margin: '.5rem',
        borderRadius: 10,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: '1rem',
        textAlign: 'center'
    },
    buttonRemove: {
        backgroundColor:'#8f0788',
        borderColor: '#b903b0',
        borderWidth: 2,
        borderRadius: 10,
        margin: '.2rem',
    },
    image: {
        height: 150,
        width: 150,
    },
    text: {
        color: 'white',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        padding: '.2rem',
        fontWeight: 'bold',
    }
})