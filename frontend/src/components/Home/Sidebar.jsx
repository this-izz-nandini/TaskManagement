import React, {useEffect, useState} from 'react'
import { MdTaskAlt } from "react-icons/md";
import { PiNotepadBold } from "react-icons/pi";
import { PiListHeartBold } from "react-icons/pi";
import { MdOutlinePendingActions } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import axios from 'axios';
const Sidebar = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const data=[
        {title:"All tasks", icon:<PiNotepadBold/>,link:'/'},
        {title:"Important tasks",icon:<PiListHeartBold/>,link:'/importantTasks'},
        {title:"Completed tasks",icon:<MdTaskAlt/>,link:'/completedTasks'},
        {title:"Incomplete tasks",icon:<MdOutlinePendingActions/>,link:'/incompleteTasks'},
    ];
    const [Data, setData] = useState()
    const logout=()=>{
        dispatch(authActions.logout());
        localStorage.clear("id");
        localStorage.clear("token");
        navigate('/signUp');
    }
    const headers={
        id:localStorage.getItem("id"), 
        authorization:`Bearer ${localStorage.getItem("token")}`
    }
    useEffect(() => {
      const fetch = async() =>{
        const res=await axios.get(`${window.location.origin}/api/v2/get-all-tasks`,{headers});
        setData(res.data.data);
      };
      if(localStorage.getItem('id') && localStorage.getItem('token'))
      {  fetch();}
    })
    
  return (
    <>
        {Data && (<div>
            <h2 className='text-xl font-semibold'>{Data.username}</h2>
            <h4 className='mb-1 text-gray-400'>{Data.email}</h4>
            <hr />
        </div>)}
        <div>
            {data.map((items,i)=>(
                <Link to={items.link} key={i} className='my-2 flex items-center hover:bg-gray-800 p-2 rounded transition-all duration-300'>
                    {items.icon} &nbsp; {items.title}</Link>
            ))}
        </div>
        <div><button className='bg-white w-full text-gray-900 p-2 rounded hover:bg-gray-400 hover:scale-105 transition-all duration-200' onClick={logout}>Log Out</button></div>
    </>
  )
}

export default Sidebar