import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import AddNewAssignment from "./assignments/modals/AddNewAssignment";
import TruckAssignmentCustomToolbar from "./assignments/TruckAssignmentCustomToolbar";

const TruckAssignmentPanel = ({assignments,setAssignments,statusToast,setStatusToast}) => {
  const [data,setData]=useState([]);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  useEffect(()  => {
        let data = [];
        let weekly = [];
        let specific = [];
        let temp;
        for (var x = 0; x < assignments.length; x++) {
          if (assignments[x].assignmentSchedule.length > 0) {
            for (var i = 0;i < assignments[x].assignmentSchedule.length;i++) {
              for (var y = 0;y <JSON.parse(assignments[x].assignmentSchedule[i].schedule).when.length;y++) {
                var street = assignments[x].assignmentSchedule[i].street.toString().charAt(0).toUpperCase() +assignments[x].assignmentSchedule[i].street.slice(1);
                var purok = assignments[x].assignmentSchedule[i].purok.toString().charAt(0).toUpperCase() +assignments[x].assignmentSchedule[i].purok.slice(1);
                var barangay = assignments[x].assignmentSchedule[i].barangay.toString().charAt(0).toUpperCase() +assignments[x].assignmentSchedule[i].barangay.slice(1);
                if (JSON.parse(assignments[x].assignmentSchedule[i].schedule).type === "weekly") {
                  temp =JSON.parse(assignments[x].assignmentSchedule[i].schedule).when[y].schedule +" - " + street +", " + purok +", " + barangay;
                  weekly.push(temp);
                } else {
                  temp =moment(new Date(JSON.parse(assignments[x].assignmentSchedule[i].schedule).when[y].schedule)).format("MM/DD/YY") +" - " + street + ", " + purok + ", " + barangay;
                  specific.push(temp);
                }
              }
            }
          }
          temp = [
            assignments[x].assignment_id,
            assignments[x].truckAssignmentDriver.user_id,
            assignments[x].truckAssignmentTruck.truck_id,
            weekly,
            specific,
            assignments[x].truckAssignmentTruck.plate_no,
            assignments[x].truckAssignmentDriver.fname + " " +assignments[x].truckAssignmentDriver.lname,
            moment(assignments[x].createdAt).format("MM/DD/YY"),
            assignments[x].deletedAt === null ? "Active" : "Inactive",
          ];
          data.push(temp);
          weekly = [];
          specific = [];
        }
        setData(data);
      return ()=>{
          setData([]);
      }
  },[])
  // const columns = ["Schedule", "Plate Number", "Driver", "Route","Date Created","Status"];
  const columns = [
    {
      name: "Assignment ID",
      label: "Assignment ID",
      options: {
        filter: false,
        sort: false,
        display: false,
        viewColumns: false,
      },
    },
    {
      name: "Driver ID",
      label: "Driver ID",
      options: {
        filter: false,
        sort: false,
        display: false,
        viewColumns: false,
      },
    },
    {
      name: "Truck ID",
      label: "Truck ID",
      options: {
        filter: false,
        sort: false,
        display: false,
        viewColumns: false,
      },
    },
    {
      name: "Weekly",
      label: "Weekly Schedule",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div>
              {(() => {
                if (value.length === 0) {
                  return <p>None</p>;
                } else if (value.length < 2) {
                  return <p>{value}</p>;
                } else {
                  return (
                    <ul style={{marginLeft: "-3vh"}}>
                      {value.map((data, i) => {
                        if (i + 1 === value.length) {
                          return <li key={i}>{data}</li>;
                        } else {
                          return (
                            <li key={i}>
                              {data}
                              <hr />
                            </li>
                          );
                        }
                      })}
                    </ul>
                  );
                }
              })()}
            </div>
          );
        },
      },
    },
    {
      name: "Specific",
      label: "Specific Schedule",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div>
              {(() => {
                if (value.length === 0) {
                  return <p>None</p>;
                } else if (value.length < 2) {
                  return <p>{value}</p>;
                } else {
                  return (
                    <ul style={{marginLeft: "-3vh"}}>
                      {value.map((data, i) => {
                        if (i + 1 === value.length) {
                          return <li key={i}>{data}</li>;
                        } else {
                          return (
                            <li key={i}>
                              {data}
                              <hr />
                            </li>
                          );
                        }
                      })}
                    </ul>
                  );
                }
              })()}
            </div>
          );
        },
      },
    },
    {
      name: "Plate Number",
      label: "Plate Number",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Driver",
      label: "Driver",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "Date Created",
      label: "Date Created",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Status",
      label: "Status",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  const options = {
    selectableRowsHeader: false,
    selectableRows: "single",
    filter: true,
    filterType: "dropdown",
    customToolbarSelect: (selectedRows, displayData) => (
      <TruckAssignmentCustomToolbar
        setAssignments={setAssignments}
        statusToast={statusToast}
        setStatusToast={setStatusToast}
        selectedRows={selectedRows}
        displayData={displayData}
      />
    ),
  };
  return (
    <div>
      <div className="mb-3">
        <button className="btn btn-success" onClick={handleOpenModal}>
          <i className="fa fa-plus" aria-hidden="true"></i> Add New Truck
          Assignment
        </button>
        <AddNewAssignment
            openModal={openModal}
            setOpenModal={setOpenModal}
            setAssignments={setAssignments}
            handleCloseModal={handleCloseModal}
            handleOpenModal={handleOpenModal}
            statusToast={statusToast}
            setStatusToast={setStatusToast} 
          />
      </div>
      <MUIDataTable
        title={"Truck Assignments List"}
        data={data}
        columns={columns}
        options={options}
      />
    </div>
  );
};

export default TruckAssignmentPanel;
