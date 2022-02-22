/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useState } from "react";
import EditAssignment from "./modals/EditAssignment";
import DeleteAssignment from "./modals/DeleteAssignment";
const TruckAssignmentCustomToolbar = ({setMessage,setMesAlert,selectedRows,displayData}) => {
    const [prevData,setPrevData] = useState(null);
    const [openEditModal, setEditModal] = useState(false);
    const [openDeleteModal, setDeleteModal] = useState(false);
    const handleOpenEditModal = () => setEditModal(true); 
    const handleCloseEditModal = () => setEditModal(false);
    const handleOpenDeleteModal = () => setDeleteModal(true); 
    const handleCloseDeleteModal = () => setDeleteModal(false);
    const handleClick = () => {
        console.log("click!", displayData[selectedRows.data[0].dataIndex].data); // a user can do something with these selectedRow values
      }
    return (
          <div>
              <button onClick={handleOpenEditModal} className="btn btn-warning "><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
              <button onClick={handleOpenDeleteModal} className="btn btn-danger mx-2"><i className="fa fa-trash" aria-hidden="true"></i></button>
              <EditAssignment setMessage={setMessage} setMesAlert={setMesAlert} data={prevData !== null ? prevData:displayData[selectedRows.data[0].dataIndex].data} openModal={openEditModal} setOpenModal={setEditModal} handleCloseModal={handleCloseEditModal}/>
              <DeleteAssignment setPrevData={setPrevData} setMessage={setMessage} setMesAlert={setMesAlert} data={prevData !== null ? prevData:displayData[selectedRows.data[0].dataIndex].data} openDeleteModal={openDeleteModal} setDeleteModal={setDeleteModal} handleCloseDeleteModal={handleCloseDeleteModal}/>
          </div>
    )
}

export default TruckAssignmentCustomToolbar
