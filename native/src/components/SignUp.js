import React, { useState } from 'react';
import { Text, TextInput, View, ScrollView, TouchableHighlight, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from "react-redux"
import userAction from "../redux/actions/userActions"
import toasty from "./Toast";

const SignUp = (props) => {

  const dispatch = useDispatch()

  const { navigate } = props.navigation;

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userImage, setUserImage] = useState('');
  const [phone, setPhone] = useState('');

  const action = async () => {
    
    if ( lastName == "" || name == "" || email == "" || password == "" || userImage == "" || phone == "") {
      toasty('error', 'Fields cannot be left empty')
    } else {
      const user = {
        name: name,
        lastName: lastName,
        email: email,
        password: password,
        userImg: userImage,
        phone: Number(phone)
    }
      let resultado = await dispatch(userAction.addUser(user))
     
      if (resultado.succes == false) {
        toasty('error', resultado.error)
      } else {
        toasty('success', 'User successfully registered')
        navigate('Home')
      }
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.centerItems}>

        <TextInput
          style={styles.textInput}
          placeholder="Name"
          onChangeText={text => setName(text)}
     
        />
        <TextInput
          style={styles.textInput}
          placeholder="Last Name"
          onChangeText={text => setLastName(text)}
         
        />

        <TextInput
          style={styles.textInput}
          placeholder="Email"
          onChangeText={text => setEmail(text)}
    
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          onChangeText={text => setPassword(text)}
         
          secureTextEntry={true}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Profile picture image Url"
          onChangeText={text => setUserImage(text)}
         
        />
        <TextInput
          style={styles.textInput}
          placeholder="Telephone number"
          onChangeText={text => setPhone(text)}
        
          
        />

      </View>

      <View style={styles.centerItems}>

        <TouchableOpacity onPress={action} style={styles.touchableHighlight} activeOpacity={0.2} underlayColor="gray">
          <Text style={styles.buttonText}> Sign Up </Text>
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
  textInput: {
    height: 40,
    width: '70%',
    color: 'white',
    borderBottomWidth: 2,
    borderBottomColor: '#8f0788',
    borderStyle: 'solid',
    marginBottom: 50,
  },
  centerItems: {
    width: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  touchableHighlight: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#b903b0"
  },
  buttonText: {
    fontWeight: "bold",
    color: 'white',
  },

})

export default SignUp;