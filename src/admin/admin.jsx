import React from 'react'
import SideBar from './share/sideBar';
import './css/admin.css'
import TopBar from './share/topBar';
import { Outlet, useNavigate } from 'react-router-dom';
import ManageData_Configure from '../confrigration/constants';
import Login from '../Mycomponent/pages/login/login';
import { useEffect } from 'react';
const Admin = () => {
  const isAdminLogin = localStorage.getItem('loginOut')
  const navigate = useNavigate();
  useEffect(() => {
    if (isAdminLogin === 'true') {
      navigate('/admin/dashboard')
    }
  }, [])

  return (
    <>
      <ManageData_Configure />
      {
        isAdminLogin === 'true' ?
          <div className='admin-Layout'>

            <SideBar />
            <div className='admin-body'>
              <TopBar />
              <div className='admin-ground'>
                <Outlet />
              </div>
            </div>
          </div> : <Login />
      }
    </>
  )
}

export default Admin;