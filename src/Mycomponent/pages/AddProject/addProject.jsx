import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom'
import '../../css/addProject.css';

const AddProject = () => {
  const userProjectlimit = useSelector(state=>state.userprojectlimit)

  // redux data
  const USERALLPROJECTNAME = useSelector(state => state.userallprojectname)

  // state manage
  const [ShowAlert, setShowAlert] = useState(false)

  const navigate = useNavigate()

  // authentication lmt for customer Project
  useEffect(() => {
    if (USERALLPROJECTNAME.length >= userProjectlimit) {
      setShowAlert(true)
    }
    else {
      setShowAlert(false)
    }
  })

  return (
    <div className='add-Pr'>
      <div className='cmd-b'> Add Project</div>



      <Outlet />
      {
        ShowAlert ? <div className='pop' onClick={() => setShowAlert(false)}  >
          <div className='popBody'>
            <div className='exeMark'><h1>?</h1> </div>
            <p>Your project limit exceeded if you want to add more projects please Upgrade your plan  </p>
            <div className='cmd' style={{ justifyContent: "space-evenly" }}><button onClick={() => navigate(-1)} className='cm-btn-b'> Cancel</button><button onClick={() => navigate('/upgrade')} className='cm-btn'> upgrade</button></div>
          </div>
        </div> : false
      }

    </div>
  )
}

export default AddProject;
