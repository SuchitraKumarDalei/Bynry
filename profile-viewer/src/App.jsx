import { Fragment, useEffect, useState } from 'react'
import { Route, Routes,  useNavigate } from 'react-router-dom'
import Home from './component/home'
import AdminPannel from './component/admin-panel'
import ProfileDetails from './component/profile-details'
import UserHome from './component/user-home'
import NoPageFound from './component/no-page-found'
// import './App.css'

function App() {
  const navigate = useNavigate();
 
  useEffect(()=>{
    
  },[navigate])
  return (
    <Fragment>
      <Routes>
      <Route path={'/'} element={<Home/>}>
        <Route path={'admin-pannel'} element={<AdminPannel/>}/>
        <Route path={'profile-details'} element={<ProfileDetails/>}/>
        <Route path={'user-home'} element={<UserHome/>}/>
        <Route path='*' element={<NoPageFound/>}/>
      </Route>
      </Routes>
    </Fragment>
  )
}

export default App
