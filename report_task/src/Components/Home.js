import React, { useState } from "react";

const Home = ({ reports, setSelecteReport, selectedReport, setReports }) => {
  const [openSubReportButton, setOpenSubReportButton] = useState(false);
  const [selectSubReport, setSelectSubReport] = useState("");
  const selectReport = (report) => {
    setSelecteReport(report);
  };

  function findLastNumber(str) {
    const numbers = str.match(/\d+/g);
    if (numbers) {
      return parseInt(numbers[numbers.length - 1]);
    } else {
      return null;
    }
  }

  const newSubReportName = (name) => {
    const index = reports.findIndex((report) => report.name === name);
    const lastIdx = findLastNumber(
      reports[index].childs[reports[index].childs.length - 1]
    );

    return `subRepost${lastIdx + 1}`;
  };

  const addSubReports = (name) => {
    const index = reports.findIndex((report) => report.name === name);

    if (reports[index].childs.length === 0) {
      const updatedReports = [...reports];

      updatedReports[index] = {
        ...updatedReports[index],
        childs: [...updatedReports[index].childs, "subReport1"],
      };
      setReports(updatedReports);
    } else if (index !== -1) {
      const updatedReports = [...reports];

      updatedReports[index] = {
        ...updatedReports[index],
        childs: [...updatedReports[index].childs, newSubReportName(name)],
      };
      setReports(updatedReports);
    } else {
      console.log(`Report with name '${name}' not found.`);
    }
  };

  const deleteSubReport = (reportName, childNameToDelete) => {
    setReports((prevReports) =>
      prevReports.map((report) => {
        if (report.name === reportName) {
          const updatedChilds = report.childs.filter(
            (childName) => childName !== childNameToDelete
          );
  
          return { ...report, childs: updatedChilds };
        } else {
          return report;
        }
      })
    );
    setSelectSubReport("")
  };
  
  return (
    <div className="home_main">
      {reports.map((report, idx) => {
        return (
          <div key={idx} className="report_div">
            <div
              className="report_main"
              style={{
                backgroundColor:
                  selectedReport.name === report.name && "#ddddff",
              }}
              onClick={() => {
                selectReport(report);
                setOpenSubReportButton(true);
              }}
            >
              {idx + 1} {report.name}
            </div>
            <div>
              {openSubReportButton && selectedReport.name === report.name && (
                <div>
                  <div className="subreport_buttons">
                    <button onClick={() => addSubReports(report.name)}>
                      Add Subreport
                    </button>
                    <button onClick={()=>deleteSubReport(report.name, selectSubReport)}>Remove Subreport</button>
                  </div>
                  <div className="subchild_div">
                    {report.childs.map((child, idx) => {
                      return (
                        <div
                          className="subreport"
                          key={idx}
                          onClick={() => setSelectSubReport(child)}
                          style={{backgroundColor: child === selectSubReport && selectedReport.name === report.name &&"red"}}
                        >
                          {child}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
