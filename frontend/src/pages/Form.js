import SignIn from "../components/SignIn"
import SignUp from "../components/SignUp"
import { Link } from "react-router-dom";
import { connect } from "react-redux"
import userActions from "../redux/actions/userActions"
import { GoogleLogin } from 'react-google-login';
import { BsFacebook, BsInstagram, BsGoogle } from "react-icons/bs";
import { toast } from 'react-toastify';

const Form = (props) => {

    const responseGoogle = async (response) => {
        const googleLoginUser = {
            email: response.profileObj.email,
            password: response.profileObj.googleId,
            google: true,
        }
        const googleRegisterUser = {
            email: response.profileObj.email,
            password: response.profileObj.googleId,
            name: response.profileObj.givenName,
            lastName: response.profileObj.familyName,
            userImg: response.profileObj.imageUrl,
            phone: "111111111"
        }
        if (props.location.pathname === "/SignIn") {
            const userResponse = await props.login(googleLoginUser)
            userResponse.succes
                ?
                toast.success('Welcom to the NFT world', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })

                : toast.warn(userResponse.error, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
        } else {
            const userResponse = await props.signup(googleRegisterUser)
            userResponse.succes
                ?
                toast.success('Welcom to the NFT world', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })

                : toast.warn(userResponse.error, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

        }

    }


    return (
        <div className="form-central-todo">
            <div className="form-color-todo">
                <div className="form-contenedor-input">
                    <div className='form-contenedor-title-actions'>
                        <h1>{props.location.pathname === "/SignIn" ? <>Sign In</> : <>Sign Up</>}</h1>
                        <h2 className='action-link-sign'>
                            {props.location.pathname === "/SignUp" ?
                                <>

                                    <Link className="btn-link-sign" to="/SignIn">SignIn</Link>
                                </>
                                :
                                <>

                                    <Link className="btn-link-sign" to="/SignUp">SignUp</Link>
                                </>}</h2>
                    </div>
                    <div className="social-container">
                        <ul>
                            <li>
                                <GoogleLogin
                                    clientId="236469815759-mv17kco0pfguvbkulm48aa2u6hnf5amq.apps.googleusercontent.com"
                                    render={renderProps => (
                                        <button className="google" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <BsGoogle className="googlecom" />
                                        </button>
                                    )}
                                    buttonText="Login"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                />
                            </li>
                        </ul>
                    </div>
                    {props.location.pathname === "/SignIn" ? <><SignIn signin={props.login} /></> : null}
                    {props.location.pathname === "/SignUp" ? <><SignUp signup={props.signup} /></> : null}
                </div>
                <div className="background-image">
                    {


                    }
                </div>
            </div>
        </div>

    )
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducers.user
    }
}

const mapDispatchToProps = {
    login: userActions.signIn,
    signup: userActions.addUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
