import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
// import { BsArrowDownCircle, BsFileEaselFill } from "react-icons/bs"
import { useEffect, useState} from "react"
import { connect } from "react-redux"
import CardNFTNative from "../components/Cart/CardNFTNative"
import cartActions from "../redux/actions/cartActions"
// import PayPal from "../components/Cart/PayPalForm/PayPal"

const Cart = ({cart, clearCartAll, deleteOneNFT, setTotalPrice}) => {

    const [ code, setCode ] =  useState(false)
    const [ discount, setDiscount ] = useState("")
    
    const descounts = [ "#246FIRSTPURCHASENFTCART", "#AGUANTELOSNFT2022", "ESTASFULLPICADOPAA" ]
    
    let subTotal = 0

    const [ total, setTotal ] = useState(subTotal)

    useEffect(()=> {
        discountes()
    }, [cart, subTotal])
    
    cart.forEach(item => {
        return subTotal = subTotal + item.price
    })   

    console.log(subTotal)

    const discountes = () => {
        if(descounts.some(item => item === discount)){
            setTotal(subTotal - (subTotal * 0.1)) 
        }else{
            setTotal(subTotal)
        }
    }   

    useEffect(() => {
        setTotalPrice(total)
    }, [total])

    return (
 <ScrollView style={cartStyle.mainView}>
     <View style={cartStyle.mainContainer}>
            <View  style={cartStyle.view1}>
                <Text style={cartStyle.title}>Get 10% off your first NFT purchase by entering the following discount code.</Text>                
            </View>
            <View>
                <Text style={cartStyle.textCart}>YOUR CART ({cart.length})</Text>
                <TouchableOpacity onPress={() => clearCartAll()} style={cartStyle.buttonClearCart} activeOpacity={0.2} underlayColor="gray">
                  <Text style={cartStyle.buttonText}> CLEAR CART </Text>
                </TouchableOpacity>
            </View>
            <View>
                {cart.map((element,i) => {
                    return <CardNFTNative key={i} data={element} remove={deleteOneNFT} />
                })}
            </View>
            
        <View style={cartStyle.summary}>
            <Text style={cartStyle.title2}>SUMMARY</Text> 
        </View>
        <View>
            <Text style={cartStyle.text}>Do you have a promo code?</Text>
            
                <TouchableOpacity onPress={() => {setCode(!code)}} style={cartStyle.buttonDiscount} activeOpacity={0.2} underlayColor="gray">
                  {!code ? <Text style={cartStyle.buttonText}>YES!</Text> : <Text style={cartStyle.buttonText}>NO!</Text>}
                </TouchableOpacity>   
            {code ?
                <>
                    <TextInput
                        style={cartStyle.textInput}
                        placeholder="Code"
                        onChangeText={text => setDiscount(text)}
                        defaultValue={code}
                    />
                    <TouchableOpacity onPress={()=> discountes()} style={cartStyle.applyDiscount} activeOpacity={0.2} underlayColor="gray">
                        <Text style={cartStyle.buttonText}> Enter </Text>
                    </TouchableOpacity>
                </>
            : null }
        </View>
        <View style={cartStyle.subTotalView}>
            <Text style={cartStyle.title}>SUBTOTAL</Text>
            <Text style={cartStyle.text}>${subTotal}</Text>
        </View>
        <View  style={cartStyle.textAdvice}>
            <Text style={cartStyle.text}>Once payment is made, no refunds are accepted, the proccess may take 1 to 10 minutes to be completed successfully</Text>
        </View>
        <View style={cartStyle.totalView}>
            <Text style={cartStyle.title}>TOTAL</Text>
            <Text style={cartStyle.text}>${total}</Text>
        </View>
     </View>
</ScrollView>
    )
}

const cartStyle = StyleSheet.create({
    mainView:{
        backgroundColor:'#14141d',
    },
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    view1:{
            color:'black',
        margin:'1rem',
    },
    title:{
        color:'white',
        width: '100%',
        textAlign: 'center',
        fontSize:'1rem',
        fontWeight:'bold',
    },
    title2:{
        color:'white',
        width: '100%',
        textAlign: 'center',
        fontSize:'1rem',
        fontWeight:'bold',
        fontSize: 24,
    },
    text: {
        color:'white',
        alignSelf: 'center',
        padding: '.5rem'
    },
    textAdvice: {
        textAlign: 'center',
    },
    textCart: {
        color: '#96faaf',
        fontWeight: 'bold',
        fontSize: 32,
    },
    totalView: {
        backgroundColor: '#8f0788',
        width: '90%',
    },
    subTotalView: {
        backgroundColor: '#001a33',
        width: '90%',
    },
    buttonClearCart: {
        backgroundColor:'#8f0788',
        borderColor: '#b903b0',
        borderWidth: 2,
        borderRadius: 10,
        margin: '.2rem',
    },
    buttonDiscount: {
        backgroundColor: '#001a33',
        borderColor: '#1874ec',
        borderWidth: 2,
        borderRadius: 10,
        margin: '.2rem',
    },
    applyDiscount: {
        backgroundColor: '#96faaf50',
        borderColor: '#96faaf',
        borderWidth: 2,
        borderRadius: 10,
        margin: '.2rem',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        padding: '.2rem',
        fontWeight: 'bold',
    },

})


const mapStateToProps = (state) => {
    return {
        cart : state.cartReducers.cart,
    }
}
const mapDispatchToProps = {
    clearCartAll : cartActions.removeAllFromCart,
    deleteOneNFT : cartActions.removeOneFromCart,
    setTotalPrice : cartActions.setTotalPrice
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)


//     return (
//         <>
//             <div style={{ height: "70px" }} ></div>
//             <div className="contenedor-total-shopping">
//                 <div className="contenedor-left-shopping">
//                     <div className="shippoing-left-divone"><h2>Get 10% off your first NFT purchase by entering the following discount code.</h2></div>
//                     <div className="shippoing-left-divtwo"><p>YOUR CART ({cart.length})</p> <p onClick={() => clearCartAll()}>CLEAR CART</p></div>
//                     <div className="shippoing-left-divtree">
//                         {cart.map((element, i) => {
//                             return <CardNFT key={i} data={element} remove={deleteOneNFT} />
//                         })}
//                     </div>
//                 </div>
//                 <div className="contenedor-rigth-shopping">
//                     <div><h2>SUMMARY</h2></div>
//                     <div></div>
//                     <div><p>DO YOU HAVE A PROMO CODE?</p><BsArrowDownCircle onClick={()=> { setCode(!code) }}/>
//                     {code ?<><input type="text" placeholder="#246FIRSTPURCHASENFTCART" onChange={(e)=> setDiscount(e.target.value)}></input><button onClick={()=> discountes()} style={{heigth:"40px", width: "40px"}}>enter</button></> : null }
//                     </div>
//                     <div></div>
//                     <div><p>SUBTOTAL</p><p>${subTotal}</p></div>
//                     <div></div>
//                     <div><p>Once payment is made, no refunds are accepted, the process may take 1 to 10 minutes to be completed successfully.</p></div>
//                     <div></div>
//                     <div><p>TOTAL</p><p>${total}</p></div>
//                     <div></div>
//                     <div>
//                         <PayPal clearCartAll={clearCartAll}/>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
