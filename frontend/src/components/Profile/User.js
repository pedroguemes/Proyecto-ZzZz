import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import userActions from '../../redux/actions/userActions'
import { app } from '../../fb'
import { useNavigate } from 'react-router-dom'

const User = (props) => {

    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }, []);

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

        handleInputChange(e.target.name, enlaceUrl)

    }

    const [modify, setModify] = useState(false)

    const [modifyUser, setModifyUser] = useState({})

    const handleInputChange = (name, value) => {
        setModifyUser({
            ...modifyUser,
            [name]: value
        })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        setModify(!modify)
        props.editUser(props.user.userID, modifyUser)
    }

    return (


        <div className="user-cont">
            <div className="user-container">
                <div className="user-header-container">
                    <div>
                        <div className="edit-user" onClick={() => setModify(!modify)}>Editar</div>
                        <div className="edit-user" onClick={() => { props.logout(); navigate('/') }}>Cerrar sesión</div>
                    </div>

                    {!props.user && <div className="user-img" style={{ backgroundImage: `URL("https://www.batiburrillo.net/wp-content/uploads/2019/07/Ampliacio%CC%81n-de-imagen-en-li%CC%81nea-sin-perder-calidad.jpg")` }}></div>}
                    {props.user && <div className="user-img" style={{ backgroundImage: `URL(${props.user.img})` }}></div>}
                </div>

                {modify ?

                    <form style={{ textAlign: 'center' }} onSubmit={handleRegister}>
                        <div className="user-info-container">
                            <div><label>First Name:</label><input type="text" placeholder="Name" name="name" defaultValue={props.user.userName} onChange={(e) => handleInputChange(e.target.name, e.target.value)} className="user-info-label" /></div>
                            <div><label>Last Name:</label><input type="text" placeholder="Last Name" name="lastName" defaultValue={props.user.lastName} onChange={(e) => handleInputChange(e.target.name, e.target.value)} className="user-info-label" /></div>
                            <div><label>Email:</label><input type="text" placeholder="Email" name="email" defaultValue={props.user.email} onChange={(e) => handleInputChange(e.target.name, e.target.value)} className="user-info-label" /></div>
                            <div><label>Phone:</label><input type="text" placeholder="Phone" name="phone" defaultValue={props.user.phone} onChange={(e) => handleInputChange(e.target.name, e.target.value)} className="user-info-label" /></div>
                            <div><label>Image:</label>{<input type="file" name="userImg" onChange={archivoHandler} className="user-info-label" />}</div>
                        </div>
                        <button type="submit" className="edit-user">Enviar</button>
                    </form>

                    :

                    <div className="user-info-container">
                        <div><span>First Name:</span><div className="user-info-label">{props.user.userName}</div></div>
                        <div><span>Last Name:</span><div className="user-info-label">{props.user.lastName}</div></div>
                        <div><span>Email:</span><div className="user-info-label">{props.user.email}</div></div>
                        <div><span>Phone:</span><div className="user-info-label">{props.user.phone}</div></div>
                    </div>

                }


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
    editUser: userActions.updateUser,
    logout: userActions.logout
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
