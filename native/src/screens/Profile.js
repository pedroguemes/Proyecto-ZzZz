import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'

const Tab = createBottomTabNavigator();

const Profile = ({ navigation}) => {

    
    return (
        <Tab.Navigator
        screenOptions={{
            tabBarStyle: {
                backgroundColor: '#1f1f36',
                border: '#1f1f36',
                paddingBottom: 10,  
            },
            tabBarInactiveTintColor: 'white',
            tabBarActiveTintColor: '#96faaf',
            headerStyle: {
            backgroundColor: '#1f1f36',
            borderBottomWidth: 0,
          },
          headerTintColor: '#85deb4',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
            <Tab.Screen name="Signin" component={SignIn} options={{title: 'Sign In'}}/>
            <Tab.Screen name="SignUp" component={SignUp} options={{title: 'Sign Up'}}/>
        </Tab.Navigator>
    )
}

export default Profile
