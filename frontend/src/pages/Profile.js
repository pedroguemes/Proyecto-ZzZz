import { FaEthereum, FaHouseUser } from "react-icons/fa"
import { GiWallet } from "react-icons/gi"
import { MdAdminPanelSettings } from "react-icons/md"
import { useState } from "react"
import User from "../components/Profile/User"
import Admin from "../components/Profile/Admin"
import Wallet from "../components/Profile/Wallet"
import Dashboard from "../components/Profile/Dashboard"
import Ethereum from "../components/Profile/Ethereum"
import ManagementOffer from '../components/Profile/ManagementOffer'
import { AiFillDashboard } from 'react-icons/ai'
import { IoDuplicate } from "react-icons/io5";
import Lumn from '../components/Lumn'
import { connect } from 'react-redux'


const Profile = (props) => {

    const [active, setActive] = useState("user")

    return (
        <>
            <div style={{ height: "70px" }} ></div>
            <div className="total-profile-container">
                <div className="nav-profile-col">
                    <FaHouseUser onClick={() => { setActive("user") }} className={active === "user" ? "active" : null} />
                    {(props.user.role === 'admin' || props.user.role === 'moderator') && <MdAdminPanelSettings onClick={() => { setActive("admin") }} className={active === "admin" ? "active" : null} />}
                    {(props.user.role === 'admin' || props.user.role === 'moderator') && <AiFillDashboard onClick={() => { setActive("dashboard") }} className={active === "dashboard" ? "active" : null} />}
                    <GiWallet onClick={() => { setActive("wallet") }} className={active === "wallet" ? "active" : null} />
                    <IoDuplicate onClick={() => { setActive("managementOffer") }} className={active === "managementOffer" ? "active" : null} />
                    <FaEthereum onClick={() => { setActive("ethereum") }} className={active === "ethereum" ? "active" : null} />
                </div>
                <div className="profile-render-constant">
                    {active === "user" ? <User /> : active === "admin" ? <Admin /> : active === "wallet" ? <Wallet /> : active === "ethereum" ? <Ethereum /> : active === "managementOffer" ? <ManagementOffer /> : <Dashboard />}
                </div>
                <Lumn />
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    user: state.userReducers.user
})

export default connect(mapStateToProps, null)(Profile)