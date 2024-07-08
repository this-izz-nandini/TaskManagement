import React from 'react'
import { PiNotePencil } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { IoAddCircleOutline } from "react-icons/io5";
import axios from 'axios'

const Cards = ({home, setInputDiv, data, setUpdatedData}) => {
    const headers={
        id:localStorage.getItem("id"), 
        authorization:`Bearer ${localStorage.getItem("token")}`
    }
    const completeToggler=async(Id)=>{
        try{
            await axios.put(`${window.location.origin}/api/v2/update-complete-task/${Id}`,{},{headers});
            //extra {} for data in put request (since we're not sending data)
        }catch(e){ alert(e); }
    };
    const impToggler=async(Id)=>{
        try{
            await axios.put(`${window.location.origin}/api/v2/update-imp-task/${Id}`,{},{headers});
        }catch(e){ alert(e); }
    };
    const updateHandler=async(Id,title,desc)=>{
        setInputDiv("fixed")
        setUpdatedData({id:Id,title:title,desc:desc})
        try{
            await axios.put(`${window.location.origin}/api/v2/update-imp-task/${Id}`,{},{headers});
        }catch(e){ alert(e); }
    };
    const delTask=async(Id)=>{
        try{
            const res=await axios.delete(`${window.location.origin}/api/v2/delete-task/${Id}`,{headers});
            alert(res.data.message)
        }catch(e){ alert(e); }
    };
    return (
        <div className='grid grid-cols-4 gap-4 p-4'>
            {data && data.map((items,i)=>(
                <div className='flex flex-col justify-between border border-gray-500 bg-gray-700 rounded-md p-4'>
                    <div>
                        <h3 className='text-xl font-semibold' key={i}>{items.title}</h3>
                        <p className='text-gray-300 my-2'>{items.desc}</p>
                    </div>
                    <div className='mt-4 w-full flex items-center'>
                        <button className={`${items.completed===false? "bg-red-400":"bg-green-400"}  px-2 py-1 rounded`} onClick={()=>completeToggler(items._id)}>
                            {items.completed===true? "Completed": "Incomplete"}
                        </button>
                        <div className='text-white p-2 w-5/6 text-2xl font-semibold flex justify-around'>
                            <button onClick={()=>impToggler(items._id)}>
                                {items.imp===false ? <GoHeart/> : <GoHeartFill className='text-red-500'/>}
                            </button>
                            {home!=='false' && (<button onClick={()=>updateHandler(items._id, items.title, items.desc)}>
                                <PiNotePencil/>
                            </button>)}
                            <button onClick={()=>delTask(items._id)}>
                                <RiDeleteBin6Line/>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            { home==="true" &&
            (<button className='flex flex-col justify-center items-center border border-gray-500 bg-gray-700 rounded-md p-4 text-gray-300 hover:scale-105 hover:cursor-pointer transition-all duration-300' onClick={()=>setInputDiv("fixed")}>
                <IoAddCircleOutline className='text-4xl mt-5'/>
                <h2 className='text-2xl mt-2 mb-5'>Add Task</h2>
            </button>)}
        </div>
    )
}

export default Cards

