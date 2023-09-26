import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './store.js'
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import { Provider } from 'react-redux'
import "primereact/resources/primereact.min.css"; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
     <PrimeReactProvider>
 <React.StrictMode>
    <App />
  </React.StrictMode>,
  </PrimeReactProvider>

  </Provider>
 
)
