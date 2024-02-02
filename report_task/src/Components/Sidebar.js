import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Sidebar = ({addReport, selectedReport, reports, setReports}) => {

  const deleteReport = () =>{
    setReports(reports.filter((report)=>report.name !== selectedReport.name))
  }

  return (
    <div className='sidebar_main'>
      <button onClick={addReport}>Add Report</button>
      <button onClick={deleteReport}>Remove Report</button>
      <Link to="/test">GO to Test Route Page</Link>
    </div>
  )
}

export default Sidebar