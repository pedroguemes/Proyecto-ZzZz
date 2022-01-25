import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify';
import userActions from '../redux/actions/userActions'
import { connect } from 'react-redux'
import { app } from '../fb'

const SignUp = (props) => {

    const inputName = useRef()
    const inputLastName = useRef()
    const inputUserMail = useRef()
    const inputPassword = useRef()
    const inputPhoneNumber = useRef()
    const [url, setUrl] = useState("")
    const [imgLoad, setImgLoad] = useState(false)
    const generateRandomString = (num) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result1 = ''
        for (let i = 0; i < num; i++) {
            result1 += Math.random().toString(36).substring(0, num);
        }

        return result1;
    }

    const archivoHandler = async (e) => {

        const archivo = e.target.files[0]
        const storageRef = app.storage().ref()
        const archivoPath = storageRef.child(generateRandomString(10) + archivo.name)
        await archivoPath.put(archivo)
        const enlaceUrl = await archivoPath.getDownloadURL()
        setUrl(enlaceUrl)
        setTimeout(() => {
            setImgLoad(true)
        }, 3000)
    }

    const handleSubmitInputs = async (e) => {
        e.preventDefault()

        const user = {
            name: inputName.current.value,
            lastName: inputLastName.current.value,
            email: inputUserMail.current.value,
            password: inputPassword.current.value,
            userImg: url,
            phone: inputPhoneNumber.current.value
        }

        const userResponse = await props.addUser(user)
        userResponse.succes
            ?
            toast.success('Your acount succesfuly Sign up', {
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
            inputName.current.value = ""
            inputLastName.current.value = ""
            inputUserMail.current.value = ""
            inputPassword.current.value = ""
            inputPhoneNumber.current.value = ""
        }
    }


    return (
        <>
            <form onSubmit={handleSubmitInputs} className='form-take-input'>
                <input type="text" name="Name" ref={inputName} placeholder="Name" />
                <input type="text" name="lastName" ref={inputLastName} placeholder="Last name" />
                <input type="email" name="userMail" ref={inputUserMail} placeholder="Email" />
                <input type="password" name="password" ref={inputPassword} placeholder="Password" />
                <input type="file" onChange={archivoHandler} />
                <input type="text" name="phoneNumberUser" ref={inputPhoneNumber} placeholder="2974758745" />
                <button type='submit'>Sign Up</button>
            </form>
        </>
    )
}

const mapDispatchToProps = {
    addUser: userActions.addUser
}
export default connect(null, mapDispatchToProps)(SignUp);



