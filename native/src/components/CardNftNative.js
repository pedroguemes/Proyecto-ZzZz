import React,{ useState,useEffect } from "react"
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native'
import userActions from "../redux/actions/userActions";
import nftActions from "../redux/actions/nftActions";
import cartActions from "../redux/actions/cartActions";
import { connect } from "react-redux";
// import { BsFillBookmarkHeartFill} from "react-icons/bs"
// import { toast } from 'react-toastify';
import toasty from "./Toast";
import AsyncStorage from '@react-native-async-storage/async-storage'


const CardNFTNative = ({name, type, price, img, clase, favs, id, favorite, userId, nft, favClass, addNftToCart, nfts, cart, store, publicos, propiedad, updateNft, logInAsync}) =>{  

const favsAndDisFavs = async() => {
  let fav 
  favorite.some(fav => fav === userId) ? 
    fav = {
      nftId : id,
      bool:false
    } 
  :
    fav = {
      nftId : id,
      bool:true
    }
    const retorn =  await favs(fav)

    console.log(retorn)
    if(retorn.succes){
      nft()
    }
  }

const [color, setColor] = useState("")
const [backColor, setBackColor] = useState("")

useEffect(() => {
  
    getData()
  
    clase === "Common" ? setColor("rgba( 0, 232, 255, 0.25 )") : clase === "Rare" ? setColor("rgba( 0, 160, 42, 0.55 )") : setColor("rgba( 143, 7, 136, 0.55 )")
    clase === "Common" ? setBackColor("rgb(0, 234, 255)") : clase === "Rare" ? setBackColor("rgb(0, 160, 43)") : setBackColor("rgb(143, 7, 136)")
}, [clase])

const getData = async () => {
    const token = await AsyncStorage.getItem('token')
    if (token) {
      logInAsync(token)
    }
  } 
    
    return (
        <View style={CardNFTNativeStyle.contenedor}>
            <View style={CardNFTNativeStyle.contenedorTitulo}>
                <Text style={CardNFTNativeStyle.text}>{name}</Text>
            </View>
            <Image style={CardNFTNativeStyle.imagenNft} source={img} alt="nftImg" />
            <View style={CardNFTNativeStyle.contenedorDatos}>
                <Text style={CardNFTNativeStyle.text}>Class: {clase}</Text>
                <Text style={CardNFTNativeStyle.text}>Type: {type}</Text>
                <Text style={CardNFTNativeStyle.text}>Price: {price} ETH</Text>
            </View>
            <View style={CardNFTNativeStyle.contenedorButtons}>

            {/* <Button onPress={()=> favsAndDisFavs()} style={CardNFTNativeStyle.button} title="❤" /> */}

            <View>
              {
                favorite && favorite.some(fav => fav === userId) ?
                    
                <TouchableOpacity onPress={()=> favsAndDisFavs()} style={CardNFTNativeStyle.buttonFavOn} activeOpacity={0.2} underlayColor="gray">
                  <Text style={CardNFTNativeStyle.buttonText}> Added To Favourites </Text>
                </TouchableOpacity>
                              
                :

                <TouchableOpacity onPress={()=> favsAndDisFavs()} style={CardNFTNativeStyle.buttonFavOff} activeOpacity={0.2} underlayColor="gray">
                  <Text style={CardNFTNativeStyle.buttonText}> Add To Favourites </Text>
                </TouchableOpacity>
              }
            </View>
            <TouchableOpacity onPress={()=>{if(cart.some(element => element._id === id)){
                toasty('error','NFT already added to your cart') 
                }else{
                addNftToCart(id, nfts)
                toasty('success','NFT added to your cart')
                }}} 
                style={CardNFTNativeStyle.buttonBuy} activeOpacity={0.2} underlayColor="gray">
                  <Text style={CardNFTNativeStyle.buttonTextBuy}> Add to cart </Text>
            </TouchableOpacity>
          </View>
        </View>
)}                            

const CardNFTNativeStyle = StyleSheet.create({
    contenedor:{
        width:'95%',
        display: 'flex',
        backgroundColor:'#1f1f36',
        alignSelf: 'center',
        padding: '1rem',
        margin: '.5rem',
        borderRadius:'10',
    },
    contenedorTitulo:{
        width:'95%',
        display: 'flex',
        alignSelf: 'center',
        padding:'0.5rem',  
    },
    contenedorDatos:{
        width:'95%',
        padding:'0.5rem',
        display: 'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignSelf: 'center',
    },
    contenedorButtons:{
        width:'95%',
        padding:'0.5rem',
        display: 'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        alignSelf: 'center',
    },
    text:{
        color:'white',
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    imagenNft:{
        margin:'0.5rem',        
        width: '250px',
        height: '250px',
        alignSelf: 'center',
    },
    button:{
        padding: '0.5rem',
    },
    buttonFavOff:{
      padding: 10, 
      borderRadius:10,
      backgroundColor: "#b903b0" 
    },
    buttonFavOn:{
      padding: 10, 
      borderRadius:10,
      backgroundColor: "#1874ec" 
    },
    buttonBuy:{
      padding: 10, 
      borderRadius:10,
      backgroundColor: "#96faaf" 
    },
    buttonText: {
      fontWeight: "bold",
      color: 'white',
    },
    buttonTextBuy: {
      fontWeight: "bold",
      color: 'black',
    },
})


const mapStateToProps = (state) => {
    return {
      nfts : state.nftReducers.nfts,
      cart : state.cartReducers.cart
    }
  }
  const mapDispatchToProps = {
    favs : userActions.favs,
    nft : nftActions.getNfts,
    logInAsync: userActions.logInAsync,
    addNftToCart : cartActions.addNftToCart
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(CardNFTNative);
  

