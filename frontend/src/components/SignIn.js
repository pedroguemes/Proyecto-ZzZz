import React, { useRef } from "react"
import { toast } from 'react-toastify';
import nftActions from '../redux/actions/nftActions'
import { connect } from 'react-redux'
const SignIn = (props) => {

    const Email = useRef()
    const Password = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const user = {
            email: Email.current.value,
            password: Password.current.value
        }
        const userResponse = await props.signin(user)
        props.getNeftsByUser(userResponse.userId)
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
        if (userResponse.succes === true) {
            Email.current.value = ""
            Password.current.value = ""
        }
    }


    return (
        <>
            <form onSubmit={handleSubmit} className='form-take-input'>
                <input name='email' type="text" ref={Email} placeholder="  &#xF007;    Pepe@gmail.com" />
                <input name='password' type="password" ref={Password} placeholder="  &#xf084;    *****" />
                <button id='submit' type="submit">Log in</button>
            </form>
        </>
    )
}


const mapDispatchToProps = {
    getNeftsByUser: nftActions.getNftsByUser

}
export default connect(null, mapDispatchToProps)(SignIn);
