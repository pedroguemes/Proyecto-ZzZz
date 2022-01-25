import React, { useState } from 'react';
import { Text, TextInput, View, ScrollView, TouchableHighlight, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from "react-redux"
import userAction from "../redux/actions/userActions"
import toasty from "./Toast";
const SignIn = (props) => {

  const {navigate} = props.navigation;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch()
  
 

  const action = async  () => {
    if (email == "" || password == ""){
      toasty('error','Fields cannot be left empty')
    }else{
      const user = {
        email: email,
        password: password
    }
      let resultado = await dispatch(userAction.signIn(user))
      
      if(resultado.succes == false){
        toasty('error',resultado.error)
      }else{
        toasty('success','Welcome back')
        navigate('Home')

      }
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.centerItems}>

        <TextInput
          style={styles.textInput}
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          defaultValue={email}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          onChangeText={text => setPassword(text)}
          defaultValue={password}
          secureTextEntry={true}
        />

      </View>
      
      <View style={styles.centerItems}>

        <TouchableOpacity onPress={action} style={styles.touchableHighlight} activeOpacity={0.2} underlayColor="gray">
          <Text style={styles.buttonText}> Sign In </Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#14141d" ,
    padding: 10,
  },
  textInput:{
    height: 40,
    width: '70%',
    color: 'white',
    borderBottomWidth: 2,
    borderBottomColor: '#8f0788',
    borderStyle: 'solid',
    marginBottom: 50,
  },
  centerItems:{
    width:'100%', 
    display: 'flex', 
    alignItems: 'center'
  },
  touchableHighlight:{
    padding: 10, 
    borderRadius:10,
    backgroundColor: "#b903b0" 
  },
  buttonText: {
    fontWeight: "bold",
    color: 'white',
  },
  
})

export default SignIn;