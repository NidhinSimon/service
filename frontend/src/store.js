import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice'
import { apiSlice } from "./slices/apiSlice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from "./components/Features/cartSlice";


const persistConfig={
    key:'root',
    storage,
}

const persistCartReducer=persistReducer(persistConfig,cartReducer)

const store = configureStore({
    reducer: {
        user: userReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        cart: persistCartReducer

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})


const persistor=persistStore(store)


export {store,persistor}


