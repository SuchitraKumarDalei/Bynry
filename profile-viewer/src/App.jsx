import { Fragment, useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './component/home'
import AdminPannel from './component/admin-panel'
import ProfileDetails from './component/profile-details'
import UserHome from './component/user-home'
// import './App.css'

function App() {
  const navigate = useNavigate();
  return (
    <Fragment>
      <Routes>
      <Route path={'/home'} element={<Home/>}>
        <Route path={'admin-pannel'} element={<AdminPannel/>}/>
        <Route path={'profile-details'} element={<ProfileDetails/>}/>
        <Route path={'user-home'} element={<UserHome/>}/>
      </Route>
      </Routes>
    </Fragment>
  )
}

export default App
