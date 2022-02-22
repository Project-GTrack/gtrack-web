import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import CustomSelectToolbar from "./CustomSelectToolbar";
import axios from "axios";
import { Grid } from "@material-ui/core";
import moment from "moment";
import AddNewAssignment from "./assignments/modals/AddNewAssignment";
import MessageModal from "./helpers/MessageModal";
import TruckAssignmentCustomToolbar from "./assignments/TruckAssignmentCustomToolbar";

const TruckAssignmentPanel = () => {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [message,setMessage]=useState({
    success:false,
    content:"",
  });
  const [mesAlert,setMesAlert]=useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleOpenMesModal = () => setMesAlert(true);
  const handleCloseMesModal = () => setMesAlert(false);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/admin/assignment/get-assignments`)
      .then((res) => {
        if (res.data.success) {
          let data = [];
          let weekly = [];
          let specific = [];
          for (var x = 0; x < res.data.data.length; x++) {
            if (res.data.data[x].assignmentSchedule.length > 0) {
              for (var i = 0;i < res.data.data[x].assignmentSchedule.length;i++) {
                for (var y = 0;y <JSON.parse(res.data.data[x].assignmentSchedule[i].schedule).when.length;y++) {
                  var street = res.data.data[x].assignmentSchedule[i].street.toString().charAt(0).toUpperCase() +res.data.data[x].assignmentSchedule[i].street.slice(1);
                  var purok = res.data.data[x].assignmentSchedule[i].purok.toString().charAt(0).toUpperCase() +res.data.data[x].assignmentSchedule[i].purok.slice(1);
                  var barangay = res.data.data[x].assignmentSchedule[i].barangay.toString().charAt(0).toUpperCase() +res.data.data[x].assignmentSchedule[i].barangay.slice(1);
                  if (JSON.parse(res.data.data[x].assignmentSchedule[i].schedule).type === "weekly") {
                    var temp =JSON.parse(res.data.data[x].assignmentSchedule[i].schedule).when[y].schedule +" - " + street +", " + purok +", " + barangay;
                    weekly.push(temp);
                  } else {
                    var temp =moment(new Date(JSON.parse(res.data.data[x].assignmentSchedule[i].schedule).when[y].schedule)).format("MM/DD/YY") +" - " + street + ", " + purok + ", " + barangay;
                    specific.push(temp);
                  }
                }
              }
            }
            var temp = [
              res.data.data[x].assignment_id,
              res.data.data[x].truckAssignmentDriver.user_id,
              res.data.data[x].truckAssignmentTruck.truck_id,
              weekly,
              specific,
              res.data.data[x].truckAssignmentTruck.plate_no,
              res.data.data[x].truckAssignmentDriver.fname + " " +res.data.data[x].truckAssignmentDriver.lname,
              moment(res.data.data[x].createdAt).format("MM/DD/YY"),
              res.data.data[x].deletedAt === null ? "Active" : "Inactive",
            ];
            data.push(temp);
            weekly = [];
            specific = [];
          }
          setData(data);
        }
      });
  }, [mesAlert]);
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
        setMessage={setMessage} setMesAlert={setMesAlert}
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
            setMessage={setMessage}
            setMesAlert={setMesAlert}
            setOpenModal={setOpenModal}
            handleCloseModal={handleCloseModal}
            handleOpenModal={handleOpenModal}
          />
          <MessageModal
            openModal={mesAlert}
            message={message}
            setOpenModal={setMesAlert}
            handleCloseModal={handleCloseMesModal}
            handleOpenModal={handleOpenMesModal}
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
