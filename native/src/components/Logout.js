import React from "react"
import { useEffect } from "react"
import { connect } from "react-redux"
import userActions from "../redux/actions/userActions"
import { showMessage } from "react-native-flash-message"
import toasty from "./Toast";

const LogOut = (props) => {

    useEffect(() => {
        toasty('success', 'Successful Logout!')
        props.LogOut()
        props.navigation.navigate("Home")
    }, [])

    return null
    
}

const mapDispatchToProps = {
    LogOut: userActions.logout
}

export default connect(null, mapDispatchToProps)(LogOut)