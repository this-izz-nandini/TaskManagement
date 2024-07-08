import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {useSelector} from 'react-redux'

const SignUp = () => {
    const navigate=useNavigate();
    const isLoggedIn= useSelector((state)=>state.auth.isLoggedIn)
    if(isLoggedIn===true){
        navigate("/")
    }
    const [Data, setData] = useState({username:"",email:"",password:""})
    const history=useNavigate();
    const change=(e)=>{
        const {name, value}= e.target;
        setData({...Data, [name]:value});
    }
    const submit=async()=>{
        try{    
            if(Data.username==="" || Data.email===""|| Data.password===""){
                alert("All fields are mandatory!")
            }else{
                const res=await axios.post(`${window.location.origin}/api/v1/sign-in`, Data);
                setData({username:"",email:"",password:""})
                alert(res.data.message);
                history("/logIn")
            }
        }catch(e){
            alert(e.response.data.message)
        }
    }
  return (
    <div className='h-[98vh] flex items-center justify-center'>
        <div className='p-4 w-2/6 rounded bg-gray-800'>
            <div className='text-2xl mb-5 mt-1 font-semibold'>Sign Up</div>
            <div className='flex gap-3'>
                <label htmlFor="firstname" className='w-full text-gray-200 text-sm'>First Name</label>
                <label htmlFor="lastname" className='w-full text-gray-200 text-sm'>Last Name</label>
            </div>
            <div className='flex gap-3'>
                <input type="text" name="firstname" placeholder='First Name' className='bg-gray-700 px-3 py-2 mb-4 mt-1 w-full rounded' />
                <input type="text" name="lastname" placeholder='Last Name' className='bg-gray-700 px-3 py-2 mb-4 mt-1 w-full rounded'/>
            </div>
            <label htmlFor="username" className='text-gray-200 text-sm'>Username <span className='text-xs text-gray-300'>(only letters, numbers and underscores)</span></label>
            <input type="text" name="username" placeholder='Username' className='bg-gray-700 px-3 py-2 mb-4 mt-1 w-full rounded' value={Data.username} onChange={change}/>
            <label htmlFor="email" className='text-gray-200 text-sm'>Email</label>
            <input type="text" name="email" placeholder='abc@example.com' className='bg-gray-700 px-3 py-2 mb-4 mt-1 w-full rounded' value={Data.email} onChange={change}/>
            <label htmlFor="password" className='text-gray-200 text-sm'>Password <span className='text-xs text-gray-300'>(min. 8 char)</span> </label>
            <input type="password" name="password" placeholder='Password' className='bg-gray-700 px-3 py-2 mb-4 mt-1 w-full rounded' value={Data.password} onChange={change}/>
            <div className='w-full flex items-center justify-between '>
                <button className='px-3 py-2 my-3 rounded w-2/6 bg-blue-300 text-black hover:bg-blue-400 transition-all duration-200'
                onClick={submit}>SignUp</button>
                <Link to='/logIn' className='text-gray-400 hover:text-gray-200 px-3'>Already have an account? LogIn here.</Link>
            </div>
        </div>
    </div>
  )
}

export default SignUp