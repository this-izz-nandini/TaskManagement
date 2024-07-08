import React, { useState,useEffect } from 'react'
import Cards from '../components/Home/Cards'
import { IoIosAddCircle } from "react-icons/io";
import NewTask from '../components/Home/NewTask';
import axios from 'axios'

const AllTasks = () => {
  const [InputDiv, setInputDiv]=useState("hidden");
  const [Data, setData] = useState()
  const [UpdatedData, setUpdatedData] = useState({id:"",title:"",desc:""})
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
  { fetch();}
})
  return (
    <>
    <div>
      <div className='w-full flex justify-end px-4 py-2'>
        <button onClick={()=>setInputDiv("fixed")}>
          <IoIosAddCircle className='text-4xl text-gray-400 hover:text-gray-100 hover:scale-110 transition-all duration-300'/>
        </button></div>
      {Data && <Cards home={"true"} setInputDiv={setInputDiv} data={Data.tasks} setUpdatedData={setUpdatedData}/>}
    </div>
    <NewTask InputDiv={InputDiv} setInputDiv={setInputDiv} UpdatedData={UpdatedData} setUpdatedData={setUpdatedData}/>
    </>
  )
}

export default AllTasks