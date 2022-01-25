import {useEffect} from 'react'
import { Text, View, Image } from "react-native"
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Home from "../screens/Home"
import Store from "../screens/Store"
import Cart from "../screens/Cart"
import Profile from "../screens/Profile"
import Logout from "../components/Logout" 

import AsyncStorage from '@react-native-async-storage/async-storage'

import userActions from "../redux/actions/userActions"
import { connect } from "react-redux";

import { styles } from '../styles/styles';

const Drawer = createDrawerNavigator();

const DrawerNavigator = (props)=>{

    useEffect(() => {
      getData()
    },[])

    const getData = async () => {
      const token = await AsyncStorage.getItem('token')
      if (token) {
        props.logInAsync(token)
      }
    }

    const CustomDrawerContent = (props) => {
      return (
        <DrawerContentScrollView {...props}>
          {props.user ? <View style={styles.drawerContainerImage}>
            <Image style={styles.drawerImage} source={props.user.userImg}/>
          </View> : null }
          <View style={styles.drawerContainer}>
            <Text style={styles.drawerTitle}>Welcome to ProjectZzZz</Text>
            {props.user ? <Text style={styles.drawerName}>{props.user.name}</Text> : null}
          </View>
          <DrawerItemList {...props}/>
        </DrawerContentScrollView>
      )
    }
    return (
        <Drawer.Navigator 
        drawerContent={propsDrawer => <CustomDrawerContent {...propsDrawer}{...props} />}
        screenOptions={{
          drawerStyle:{
            backgroundColor: '#14141d',
          },
          drawerActiveBackgroundColor:"#1f1f36",
          drawerInactiveTintColor: 'white',
          drawerContentStyle:{
                margin: 45,
               backgroundColor:'white'},
          headerStyle: {
            backgroundColor: '#001a33',
            borderBottomWidth: 0,
          },
          headerTintColor: '#85deb4',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        >
              <Drawer.Screen name="Home" component={Home} options={{title: 'Home'}}/>
              <Drawer.Screen name="Store" component={Store} options={{title: 'Store'}}/>
              <Drawer.Screen name="Cart" component={Cart} options={{title: 'Cart'}}/>
              {props.user ? <Drawer.Screen name="Logout" component={Logout} /> 
              : <Drawer.Screen name="Profile" component={Profile} options={{title: 'Profile'}}/>}
        </Drawer.Navigator>
    )
}

const mapStateToProps = (state) => {
    return {
      user: state.userReducers.user
    }
  }
  
  const mapDispatchToProps = {
    logInAsync: userActions.logInAsync,
    
  }

export default connect(mapStateToProps, mapDispatchToProps)(DrawerNavigator)

