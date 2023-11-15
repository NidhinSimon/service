import axios from "axios";


const API=axios.create({baseURL:'http://localhost:5000/users'})


export const getCart=(id)=>API.get(`/cart/${id}`)


export const getServices=(id)=>API.get(`/services/${id}`)

export const addWishlist=(userId,serviceId)=>API.post(`/wishlist/add/${userId}`,{serviceId})




export const deletecart=(userId,serviceId)=>API.delete(`/cart/${userId}/${serviceId}`)


export const getProfile=(id,headers)=>API.get(`/profile/${id}`,{headers})



export const getWallet=(id,headers)=>API.get(`/wallet-history/${id}`,{headers})

export const EditProfile=(id)=>API.get(`profileedit/${id}`)



export const verifyFb=(accessToken)=>API.post(`/verifyfb`,{accessToken})


