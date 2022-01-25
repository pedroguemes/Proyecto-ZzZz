import React from 'react'
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native'

const MarketPlace = () => {
    return (
        <ScrollView style={marketPlaceStyle.mainView}>
            <View style={marketPlaceStyle.view}>
                <Text style={marketPlaceStyle.title}>Collect & Sell Your NFTs</Text>
                <Image source={require('../../assets/mineria.png')} style={marketPlaceStyle.imagenMineria} />
                <Text style={marketPlaceStyle.title}>Live the new life check it out now.</Text>
            </View>
            <View style={marketPlaceStyle.view2}>
                <Text style={marketPlaceStyle.title2}>Top Sellers</Text>
                <Image source={require('../../assets/mineria.png')} style={marketPlaceStyle.imagenMineria} />
            </View>
            <View style={marketPlaceStyle.view3}>
                <Text style={marketPlaceStyle.title2}>All</Text>
                <Image source={require('../../assets/mineria.png')} style={marketPlaceStyle.imagenMineria} />
            </View>
        </ScrollView>
    )
}
const marketPlaceStyle = StyleSheet.create({
        mainView:{
            backgroundColor:'black',
        },
        view:{
            backgroundColor:'black',
        },
        view2:{
            backgroundColor:'black',
            marginTop:'1rem',
        },
        view3:{
            backgroundColor:'black',
            marginTop:'1rem',
        },
        title:{
            color:'white',
            width: '100%',
            height:'0.5rem',
            textAlign: 'center',
            margin: '1rem'
        },
        title2:{
            color:'white',
            width: '100%',
            height:'0.5rem',
            textAlign: 'left',
            margin: '1rem'
        },
        imagenMineria:{
            width: '100px',
            height: '100px',
            alignSelf: 'center',
        },
        
    })
    
export default MarketPlace
