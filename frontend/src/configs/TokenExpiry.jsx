// import React, { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import localStorage from '../utils/localStorage'
// import {jwtDecode} from 'jwt-decode'

// const TokenExpiry = () => {
//     const navigate = useNavigate()

//     useEffect(()=> {
//         const token = localStorage.getDecryptedItem("token")
//         if(!token) return

//         try{
//             const decoded = jwtDecode(token)
//             const expiryTimer = decoded.exp * 1000;
//             const currentTime = Date.now();
//             if(expiryTimer <= currentTime) {
//                 localStorage.handleLogout();
//                 navigate('/login')
//             } else {
//                 const timeout = setTimeout(()=> {
//                     localStorage.handleLogout()
//                     navigate('/login')
//                 }, expiryTimer - currentTime)

//                 return()=> clearTimeout(timeout)
//             }
//         } catch(e) {
//             localStorage.handleLogout();
//             navigate('/login')
//         }
//     }, [])

//   return null;
// }

// export default TokenExpiry
