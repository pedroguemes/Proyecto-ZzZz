import './App.css';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Home from "./pages/Home"
import { withRouter } from './utils/withRouter';
import Form from './pages/Form'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from "react-redux";
import Navigation from "./components/Navigation"
import userActions from "../src/redux/actions/userActions"
import { useEffect } from 'react'
import Profile from './pages/Profile';
import Game from "./pages/Game"
import Store from "./pages/Store"
import nftActions from '../src/redux/actions/nftActions'
import Favs from './pages/Favs'
import Cart from './pages/Cart'
import Market from './components/MarketPlace/Market';
const Navigations = withRouter(Navigation)
const Forms = withRouter(Form)

function App({ user, rdxAuth, rdxLogin, getUserNfts, getNfts }) {
  
  useEffect(() => {
    async function fetchData() {
      const user = await rdxAuth();
      getUserNfts(user.response._id)
      user.error && toast(user.error)
      const userLogged = {
        email: user.response.email,
        password: user.response.password
      }
      user.response && rdxLogin(userLogged)
    }
    localStorage.getItem('token') && fetchData();
    getNfts()
  }, [rdxAuth, rdxLogin, getUserNfts])// eslint-disable-line react-hooks/exhaustive-deps


  return (
    <BrowserRouter>
      <Navigations user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Store" element={<Store />} />
        <Route path="/Game" element={<Game />} />
        <Route path="/Favs" element={<Favs />} />
        <Route path="/Cart" element={<Cart/>} />
        <Route path='/Market' element={<Market />} />
        <Route path="/SignIn" element={user === '' ? <Forms /> : <Navigate replace to="/" />} />
        <Route path="/SignUp" element={user === '' ? <Forms /> : <Navigate replace to="/" />} />
        <Route path="*" element={<Home />} />
        <Route path="/Store" element={<Store/>} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducers.user
  }
}

const mapDispatchToProps = {
  rdxAuth: userActions.isAuth,
  rdxLogin: userActions.signIn,
  getNfts: nftActions.getNfts,
  getUserNfts: nftActions.getNftsByUser,
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
