import React,{useState,useEffect} from 'react'
import Cards from '../components/Home/Cards'
import axios from 'axios'
  
const CompletedTasks = () => {
  const headers={
    id:localStorage.getItem("id"), 
    authorization:`Bearer ${localStorage.getItem("token")}`
  }
  const [Data, setData] = useState()
  useEffect(() => {
    const fetch = async() =>{
      const res=await axios.get(`${window.location.origin}/api/v2/get-complete-tasks`,{headers});
      setData(res.data.data);
    }; fetch();
  })
  return (
    <div><Cards home={"false"} data={Data}/></div>
  )
}

export default CompletedTasks