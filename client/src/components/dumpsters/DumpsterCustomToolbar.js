/* eslint-disable jsx-a11y/anchor-has-content */
import React,{ useEffect, useState } from "react";
import ViewDumpsterModal from "./modals/ViewDumpsterModal";
import EditDumpsterModal from "./modals/EditDumpsterModal";
import DeleteDumpsterModal from "./modals/DeleteDumpsterModal";
const DumpsterCustomToolbar = ({selectedRows,displayData}) => {
    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModal, setDeleteModal] = useState(false);
    const [openEditModal, setEditModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const handleOpenEditModal = () => setEditModal(true);
    const handleCloseEditModal = () => setEditModal(false);
    const handleDeleteModal = () => setDeleteModal(true);
    const handleCloseDeleteModal = () => setDeleteModal(false);
    useEffect(() => {
      return () => {
        setOpenModal(false);
        setDeleteModal(false);
        setEditModal(false);
      }
    }, [])
    
    return (
          <div>
              <button onClick={handleOpenModal} className="btn btn-primary mx-1"><i className="fa fa-info-circle" aria-hidden="true"></i></button>
              <button onClick={handleOpenEditModal} className="btn btn-warning mx-1 "><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
              <button onClick={handleDeleteModal} className="btn btn-danger mx-1"><i className="fa fa-trash" aria-hidden="true"></i></button>
              <ViewDumpsterModal data={displayData[selectedRows.data[0].dataIndex].data} openModal={openModal} setOpenModal={setOpenModal} handleCloseModal={handleCloseModal}/>
              <EditDumpsterModal data={displayData[selectedRows.data[0].dataIndex].data} openModal={openEditModal} setOpenModal={setEditModal} handleCloseModal={handleCloseEditModal}/>
              <DeleteDumpsterModal data={displayData[selectedRows.data[0].dataIndex].data} openDeleteModal={openDeleteModal} setDeleteModal={setDeleteModal} handleCloseDeleteModal={handleCloseDeleteModal}/>
          </div>
    )
}

export default DumpsterCustomToolbar
