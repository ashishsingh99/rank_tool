import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom'
import '../../css/addProject.css';

const AddProject = () => {
  const userProjectlimit = localStorage.getItem('userProjectlimit')
  const USERALLPROJECTNAME = useSelector(state => state.userallprojectname)
const [ShowAlert,setShowAlert]=useState(true)
  const navigate = useNavigate()
  useEffect(() => {
    if (USERALLPROJECTNAME.length >= userProjectlimit) {
      setShowAlert(true)
    }
    else{
      setShowAlert(false)

    }
  })

  const cusProductId = localStorage.getItem('cusProductId')

  // individual Plan Product Id
  const indMonthID = { id: 'prod_NZVsVtQ64t4WxW', project: 2, keywordLength: 150 }
  const indAnnualId = { id: 'prod_NZVtQIGAwU1Gsg', project: 2, keywordLength: 150 }

  // Business Plan Product Id
  const busMonthId = { id: 'prod_NZVuRSu6yY6UtB', project: 5, keywordLength: 300 }
  const busAnnualId = { id: 'prod_NZVuWs5XwBc2m0', project: 5, keywordLength: 300 }

  // Enterprice plan Product Id
  const enterMonthId = { id: 'prod_NZVuBUHEQcuhn5', project: 10, keywordLength: 100000 }
  const enterAnnualId = { id: 'prod_NZVvTBYc6zo97K', project: 10, keywordLength: 100000 }


  if (cusProductId === indMonthID.id) {
    localStorage.setItem("userProjectlimit", indMonthID.project)
    localStorage.setItem("userKeywordlimit", indMonthID.keywordLength)
  }
  else if (cusProductId === indAnnualId.id) {
    localStorage.setItem("userProjectlimit", indAnnualId.project)
    localStorage.setItem("userKeywordlimit", indAnnualId.keywordLength)
  }
  else if (cusProductId === busMonthId.id) {
    localStorage.setItem("userProjectlimit", busMonthId.project)
    localStorage.setItem("userKeywordlimit", busMonthId.keywordLength)


  }
  else if (cusProductId === busAnnualId.id) {
    localStorage.setItem("userProjectlimit", busAnnualId.project)
    localStorage.setItem("userKeywordlimit", busAnnualId.keywordLength)
  }
  else if (cusProductId === enterMonthId.id) {
    localStorage.setItem("userProjectlimit", enterMonthId.project)
    localStorage.setItem("userKeywordlimit", enterMonthId.keywordLength)


  }
  else if (cusProductId === enterAnnualId.id) {
    localStorage.setItem("userProjectlimit", enterAnnualId.project)
    localStorage.setItem("userKeywordlimit", enterAnnualId.keywordLength)
  }
  else {
    console.log('userProduct not Matched')
  }



  return (
    <div className='add-Pr'>
      <div className='cmd-b'> Add Project</div>

      <Outlet />
      {
        ShowAlert ? <div className='pop' onClick={() => setShowAlert(false)}  >
          <div className='popBody'>
            <div className='exeMark'><h1>?</h1> </div>
            <p>Your project limit exceeded if you want to add more projects please Upgrade your plan  </p>
            <div className='cmd' style={{ justifyContent: "space-evenly" }}><button onClick={()=>navigate(-1)} className='cm-btn-b'> Cancel</button><button onClick={()=>navigate('/upgrade')} className='cm-btn'> upgrade</button></div>
          </div>
        </div> : false
      }

    </div>
  )
}

export default AddProject;