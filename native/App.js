import { NavigationContainer } from '@react-navigation/native';

import { createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import mainReducer from './src/redux/reducers/mainReducer';

import StackNavigator from './src/navigation/Stack'

import DrawerNavigator from './src/navigation/Drawer'

const reduxStore = createStore(mainReducer, applyMiddleware(thunk))

export  function App() {
  
  return(
    <Provider store={reduxStore} >

      <NavigationContainer>
      
        <DrawerNavigator/>
        
      </NavigationContainer>
    </Provider> 
  )
}
export default App
