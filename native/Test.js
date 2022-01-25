import React, { useState } from 'react';
import { View, Text, Button, TextInput} from "react-native";
import CatApp from "./src/components/ComponenteUno";
import PizzaTranslator from "./src/components/ComponenteDos";
import { styles } from './src/styles/styles';
import {useStateValue} from './src/core/StateProvider'
import {actionTypes} from './src/core/reducer'


export const Separator = () => (
  <View style={styles.separator} />
);

export default function Test() {
  const [ver,setVer] = useState(false)
  const [{text},dispatch] = useStateValue();

  

  const verComponente=()=>{
    ver?setVer(false):setVer(true)
  }

 
  return (
    
    <View
    
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Universal React with Expo</Text>
     
      <CatApp/>
      <Separator/>
      <TextInput
        style={{height: 40}}
        placeholder="Type here to translate the text test aaa!"
        onChangeText={texto => dispatch({type: actionTypes.TEXT,
                                        text:texto})}
       
      />
      <Separator/>
      <Text>{text}</Text>
      <Separator/> 
      <View>
      <Button
        title="Press me"
        onPress={verComponente}
      />
     
      </View>
      
      
      
    <View>
      {ver && <PizzaTranslator/>}
    </View>

    </View>
    
  );
}