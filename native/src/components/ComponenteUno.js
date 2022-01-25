import React from 'react';
import {Text, View, Image } from 'react-native';
import { styles } from '../styles/styles';


const CatApp = (props) => {
    
  const {navigate} = props.navigation;
  return (
    <View>
      <Image
        source={{uri: "https://reactnative.dev/docs/assets/p_cat1.png"}}
        style={{width: 200, height: 200}}
      />
      <Text style={styles.text}>Seleccione una opcion</Text>
      <View>
        <Text onPress={()=> navigate('C_Dos')} style={{textAlign:"center", color:"blue"}}>IR A PIZZA TRADUCTOR</Text> 
        <Text onPress={()=> navigate('SignUp')} style={{textAlign:"center", color:"red",marginTop:100}}>Ir a registro</Text> 
      </View>

    </View>
    
  );
}

export default CatApp;