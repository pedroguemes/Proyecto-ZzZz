import React from 'react';
import { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native'
import nftActions from "../redux/actions/nftActions"
import { connect } from "react-redux";
import CardNFTNative from '../components/CardNftNative';
// import Swiper from 'react-native-swiper'

const Store = (props) => {

    const [categoria, setCategoria] = useState("All");
    const [rareza, setRareza] = useState("All");

    useEffect(() => {
        props.nft()
    }, [])

    let arrayFalso = props.nfts

    return (
        <ScrollView style={storeStyle.mainView}>
                <View style={storeStyle.view}>
                    <Text style={storeStyle.titleWelcome}>Collect & Sell Your NFTs</Text>
                    <Image source={require('../../assets/mineria.png')} style={storeStyle.imagenMineria} />
                    <Text style={storeStyle.titleWelcome}>Live the new life check it out now.</Text>
                </View>

                <View style={storeStyle.view3}>
                    <Text style={storeStyle.title2}>NFTs on sale</Text>
                    {
                                props.nfts.map((element, index) => {
                                    return (
                                        <CardNFTNative name={element.name} type={element.type} price={element.price} img={element.img} clase={element.clase} id={element._id} favorite={element.favs} propiedad={element.users} userId={props.userId.userID} store={true} publicos={"no"} key={index}/>
                                    )
                                })
                            }
                </View>
    </ScrollView>
    )
}


const storeStyle = StyleSheet.create({
    mainView:{
        backgroundColor:'#14141d',
    },
    view:{
        backgroundColor:'#14141d',
        margin:'0.5rem',        
        // display: 'flex',
        // flexDirection:'row',
    },
    view2:{
        backgroundColor:'#14141d',
        marginTop:'1rem',
    },
    view3:{
        backgroundColor:'#14141d',
        marginTop:'1rem',
    },
    titleWelcome:{
        color:'white',
        width: '100%',
        height:'0.5rem',
        textAlign: 'center',
        margin: '.5rem',
        fontWeight: 'bold',
    },
    title:{
        color:'white',
        width: '100%',
        height:'0.5rem',
        textAlign: 'center',
        margin: '.5rem',
        fontSize:'1rem',
        fontWeight:'bold',
    },
    title2:{
       fontWeight:'bold',
        fontSize:'1rem',
        color:'white',
        width: '100%',
        textAlign: 'left',
        margin: '1rem'
    },
    imagenMineria:{
        width: '150px',
        height: '150px',
        alignSelf: 'center',
    },
    
})
// export default Store

const mapStateToProps = (state) => {
    return (
        {
            nfts: state.nftReducers.nfts,
            userId: state.userReducers.user
        }
    )
}
const mapDispatchToProps = {
    nft: nftActions.getNfts
}

export default connect(mapStateToProps, mapDispatchToProps)(Store)

