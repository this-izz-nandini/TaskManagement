import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {authActions} from "../store/auth"
import { useDispatch } from 'react-redux'
const LogIn = () => {
  const [Data, setData] = useState({username:"",password:""})
  const navigate=useNavigate();
  const dispatch=useDispatch()
    const change=(e)=>{
        const {name, value}= e.target;
        setData({...Data, [name]:value});
    }
    const submit=async()=>{
        try{    
            if(Data.username==="" || Data.email===""|| Data.password===""){
                alert("All fields are mandatory!")
            }else{
                const res=await axios.post(`${window.location.origin}/api/v1/log-in`, Data);
                setData({username:"",password:""})
                console.log(res);
                localStorage.setItem("id",res.data.id)
                localStorage.setItem("token",res.data.token)
                dispatch(authActions.login())
                navigate('/')
            }
        }catch(e){
            alert(e.response.data.message)
        }
    }
  return (
    <div className='h-[98vh] flex items-center justify-center'>
        <div className='p-4 w-2/6 rounded bg-gray-800'>
            <div className='text-2xl mb-5 mt-1 font-semibold'>LogIn</div>
            <label htmlFor="username" className='text-gray-200 text-sm'>Username</label>
            <input type="text" name="username" placeholder='Username' className='bg-gray-700 px-3 py-2 mt-1 mb-4 w-full rounded' value={Data.username} onChange={change} required/>
            <label htmlFor="password" className='text-gray-200 text-sm'>Password</label>
            <input type="password" name="password" placeholder='Password' className='bg-gray-700 px-3 py-2 mt-1 mb-4 w-full rounded' value={Data.password} onChange={change} required/>
            <div className='w-full flex items-center justify-between '>
                <button className='px-3 py-2 my-3 w-2/6 rounded bg-blue-300 text-black hover:bg-blue-400 transition-all duration-200' onClick={submit}>LogIn</button>
                <Link to="/signUp" className='text-gray-400 hover:text-gray-200 px-3'>Don’t have an account? SignUp here.</Link>
            </div>
        </div>
    </div>
  )
}

export default LogIn