import React, { useEffect } from 'react'
import Home from './pages/Home'
import AllTasks from './pages/AllTasks'
import ImpTasks from './pages/ImpTasks'
import CompletedTasks from './pages/CompletedTasks'
import IncompleteTasks from './pages/IncompleteTasks'
import {Routes, Route, useNavigate} from 'react-router-dom';
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import {useDispatch, useSelector} from 'react-redux'
import { authActions } from './store/auth'

const App = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch()
  const isLoggedIn= useSelector((state)=>state.auth.isLoggedIn)
  useEffect(() => {
    if(localStorage.getItem("id") && localStorage.getItem("token")){
      dispatch(authActions.login())
    }
    else if(!isLoggedIn){ 
      navigate('/signUp');
    }
  },[]);
  
  return (
    <div className='bg-gray-900 text-white h-screen p-2'>
        <Routes>
          <Route exact path='/' element={<Home/>}>
            <Route index element={<AllTasks/>}/>
            <Route path='/importantTasks' element={<ImpTasks/>}/>
            <Route path='/completedTasks' element={<CompletedTasks/>}/>
            <Route path='/incompleteTasks' element={<IncompleteTasks/>}/>
          </Route>
          <Route path="/signUp" element={<SignUp/>}/>
          <Route path="/logIn" element={<LogIn/>}/>
        </Routes>
    </div>
  )
}

export default App