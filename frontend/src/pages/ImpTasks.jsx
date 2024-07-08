import React,{useEffect, useState} from 'react'
import Cards from '../components/Home/Cards'
import axios from 'axios'
const ImpTasks = () => {
  const headers={
    id:localStorage.getItem("id"), 
    authorization:`Bearer ${localStorage.getItem("token")}`
  }
  const [Data, setData] = useState()
  useEffect(() => {
    const fetch = async() =>{
      const res=await axios.get(`${window.location.origin}/api/v2/get-imp-tasks`,{headers});
      setData(res.data.data);
    }; fetch();
  })
  return (
    <div>
      <Cards home={"false"} data={Data}/>
    </div>
  )
}

export default ImpTasks