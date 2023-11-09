
import React, { useState,useEffect } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import toast, {Toaster} from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../../Redux/adminauth';
import {setCredentials} from '..//../Redux/adminSlice'
const AdminLogin = () => {


const [email,setEmail]=useState('')
const [password,setpassword]=useState('')

const navigate=useNavigate()
const dispatch=useDispatch()

const [login]=useLoginMutation()
const {adminInfo}=useSelector((state)=>state.admin)
console.log(adminInfo)
console.log(adminInfo,"_-------")

useEffect(()=>{
  if(adminInfo)
  {
    navigate('/dash')
  }
    },[navigate,adminInfo])
  


const handleSubmit=async(e)=>{
    e.preventDefault()
    

const res=await  login({email,password}).unwrap()
console.log(res,">>>>>>>>>>>>>>>>>>>>")
dispatch(setCredentials({...res}))
toast.success(`HELLO ${res.email}`)
 if(res.message==='success')
 {
  toast.success('Logged in Successfully')
navigate('/users')
 }else if(res.data.message==='wrong credentials'){
  toast.error("wrong credentials")
 }

}

  return (
    <>
    
  


<div className=''>

    <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white border rounded-lg shadow-2xl dark:bg-gray-800 lg:max-w-4xl mt-40 ">
    <Toaster/>
  <div className="hidden bg-cover lg:block lg:w-1/2" style={{
                backgroundImage:
                  "url(' https://res.cloudinary.com/dj8z6xx94/image/upload/v1695368438/Screenshot_2023-08-24_154442_goojc6.png')",
              }} >
    
  </div>

  <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
    <div className="flex justify-center mx-auto"  >

    </div>
   
    <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
      Welcome ADMIN
    </p>

 

    <div className="flex items-center justify-between mt-4">
      <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

      <a href="#" className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">ADMIN LOGIN</a>

      <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
    </div>

    <div className="mt-4">
      <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="LoggingEmailAddress">Email Address</label>
      <input  value={email}
              onChange={(e)=>setEmail(e.target.value)} id="LoggingEmailAddress" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="email" />
    </div>

    <div className="mt-4">
      <div className="flex justify-between">
        <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="loggingPassword">Password</label>
     
      </div>

      <input  value={password}
              onChange={(e)=>setpassword(e.target.value)} id="loggingPassword" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="password" />
    </div>

    <div className="mt-6">
      <button  onClick={handleSubmit} className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
        SUBMIT
      </button>
    </div>

    <div className="flex items-center justify-between mt-4">
      <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>


      <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
    </div>
  </div>
</div>
</div>




</>
  )
}

export default AdminLogin
