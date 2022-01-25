import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import mainReducer from './redux/reducers/mainReducer';
import 'font-awesome/css/font-awesome.min.css';


const reduxStore = createStore(mainReducer, applyMiddleware(thunk))


ReactDOM.render(
  <Provider store={reduxStore} > 
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
