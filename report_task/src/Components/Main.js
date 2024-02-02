import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Home from './Home'

const Main = () => {
    const [reports, setReports] = useState([{name:"Report1", childs:[]}, {name:"Report2", childs:[]}]);
    const [selectedReport, setSelecteReport] = useState("");
  
    function findLastNumber(str) {
      const numbers = str.match(/\d+/g);
        if (numbers) {
        return parseInt(numbers[numbers.length - 1]);
      } else {
        return null;
      }
    }
  
    const addReport = () => {
      if (reports.length === 0) {
        setReports([{name:"Report1", childs:[]}]);
      }
      const lastIdx = findLastNumber(reports[reports.length-1].name);
      const temp = [...reports];
      setReports([...temp, {name:`Report${lastIdx + 1}`, childs:[]}]);
    };

  return (
    <div className="App">
      <Sidebar
        addReport={addReport}
        selectedReport={selectedReport}
        reports={reports}
        setReports={setReports}
      />
      <Home
        reports={reports}
        setSelecteReport={setSelecteReport}
        selectedReport={selectedReport}
        setReports={setReports}
      />
    </div>
  )
}

export default Main