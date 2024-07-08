import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { IoClose } from "react-icons/io5";

const NewTask = ({InputDiv, setInputDiv, UpdatedData, setUpdatedData}) => {
  const headers={
    id:localStorage.getItem("id"), 
    authorization:`Bearer ${localStorage.getItem("token")}`
  }
  const [Data, setData] = useState({title:"", desc:""})
  useEffect(() => {
    setData({title:UpdatedData.title, desc:UpdatedData.desc})
  }, [UpdatedData])
  
  const change=(e)=>{
    const {name,value}=e.target;
    setData({...Data,[name]:value})
  }
  const submit=async()=>{
    try{
      if(Data.title==="" || Data.desc===""){ 
        alert("All fields are required!")
      }else{
        await axios.post(`${window.location.origin}/api/v2/create-task`,Data,{headers})
        setData({title:"", desc:""})
        setInputDiv("hidden")
      }
    }catch(e){ alert(e.response.data.message) }
  }
  const updateTask=async()=>{
    try{
      if(Data.title==="" || Data.desc===""){ 
        alert("All fields are required!")
      }else{
        await axios.put(`${window.location.origin}/api/v2/update-task/${UpdatedData.id}`,Data,{headers})
        setData({title:"",desc:""})
        setUpdatedData({id:"",title:"", desc:""})
        setInputDiv("hidden")
      }
    }catch(e){ alert(e.response.data.message) }
  }
  return (
    <>
      <div className={`${InputDiv} top-0 left-0 bg-gray-800 opacity-70 h-screen w-full`}></div>
      <div className={`${InputDiv} top-0 left-0 flex items-center justify-center h-screen w-full`}>
        <div className='w-2/6 bg-gray-900 p-6 rounded-lg'>
          <div className='flex justify-end mb-4'>
            <button className='text-2xl hover:scale-110' onClick={()=>{
                setInputDiv("hidden");
                setData({title:"",desc:""})
                setUpdatedData({id:"",title:"", desc:""})
              }}>
              <IoClose/></button></div>
          <input type="text" name="title" id="" placeholder='Title' className='px-3 py-2 rounded w-full bg-gray-700' value={Data.title} onChange={change}/>
          <textarea name="desc" cols="30" rows="10" id="" placeholder='Description' className='px-3 py-2 rounded w-full my-3 bg-gray-700' value={Data.desc} onChange={change}></textarea>
          {UpdatedData.id==="" ? (
            <button className='px-3 py-2 mb-2 rounded w-full bg-blue-300 text-black hover:bg-blue-400 transition-all duration-200' onClick={submit}>Submit</button>
            ) : (
            <button className='px-3 py-2 mb-2 rounded w-full bg-teal-400 text-black hover:bg-teal-600 transition-all duration-200' onClick={updateTask}>Update</button>
          )}
        </div>
      </div>
    </>
  )
}

export default NewTask