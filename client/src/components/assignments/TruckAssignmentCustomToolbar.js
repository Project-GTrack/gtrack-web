/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useEffect, useState } from "react";
import EditAssignment from "./modals/EditAssignment";
import DeleteAssignment from "./modals/DeleteAssignment";
const TruckAssignmentCustomToolbar = ({selectedRows,displayData}) => {
    const [openEditModal, setEditModal] = useState(false);
    const [openDeleteModal, setDeleteModal] = useState(false);
    const handleOpenEditModal = () => setEditModal(true); 
    const handleCloseEditModal = () => setEditModal(false);
    const handleOpenDeleteModal = () => setDeleteModal(true); 
    const handleCloseDeleteModal = () => setDeleteModal(false);
    useEffect(() => {
      return () => {
        setEditModal(false);
        setDeleteModal(false);
      }
    }, [])
    
    return (
          <div>
              <button onClick={handleOpenEditModal} className="btn btn-warning "><i className="fa fa-pencil" aria-hidden="true"></i></button>
              <button onClick={handleOpenDeleteModal} className="btn btn-danger mx-2"><i className="fa fa-trash" aria-hidden="true"></i></button>
              <EditAssignment data={displayData[selectedRows.data[0].dataIndex].data} openModal={openEditModal} setOpenModal={setEditModal} handleCloseModal={handleCloseEditModal}/>
              <DeleteAssignment data={displayData[selectedRows.data[0].dataIndex].data} openDeleteModal={openDeleteModal} setDeleteModal={setDeleteModal} handleCloseDeleteModal={handleCloseDeleteModal}/>
          </div>
    )
}

export default TruckAssignmentCustomToolbar
