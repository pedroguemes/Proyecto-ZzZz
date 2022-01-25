// import { useState } from 'react'
// import {app} from '../fb'
// const SubmitImg = () => {

//     const [url, setUrl] = useState("")

//     const  generateRandomString = (num) => {
//         const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//         let result1 = ''
//         for(let i = 0; i < num; i++){
//             result1 += Math.random().toString(36).substring(0,num);       
//         }

//         return result1;
//     }

//     const archivoHandler = async (e) => {

//         const archivo = e.target.files[0]
//         const storageRef = app.storage().ref()
//         const archivoPath = storageRef.child(generateRandomString(10) + archivo.name)
//         await archivoPath.put(archivo)
//         console.log("archivo cargado:", archivo.name)
//         const enlaceUrl = await archivoPath.getDownloadURL()
//         setUrl(enlaceUrl)

//     }   
// console.log(url)

//     return (
//         <>
//             <img src={url} />
//             <input type="file" onChange={archivoHandler} />
//         </>
//     )
// }

// export default SubmitImg
