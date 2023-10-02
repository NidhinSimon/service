import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || {
    
        cart: [],
    },
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
        },
        logout: (state, action) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo')
        },
        saveAddress:(state,action)=>{
            state.address=action.payload
        },
        addToCart:(state,action)=>{
            state.userInfo.cart.push(action.payload);
            localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
        }
    }
})



export const { setCredentials, logout ,addToCart} = userSlice.actions
export default userSlice.reducer