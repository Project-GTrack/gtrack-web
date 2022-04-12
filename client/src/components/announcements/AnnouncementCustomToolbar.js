/* eslint-disable jsx-a11y/anchor-has-content */
import React,{useEffect, useState } from "react";
import ViewAnnouncementModal from "./modals/ViewAnnouncementModal";
import EditAnnouncementModal from "./modals/EditAnnouncementModal";
import DeleteAnnouncementModal from "./modals/DeleteAnnouncementModal";
const AnnouncementCustomToolbar = ({selectedRows,displayData}) => {

    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModal, setDeleteModal] = useState(false);
    const[openEditModal, setEditModal] = useState(false);
    useEffect(() => {
      return () => {
        setOpenModal(false);
        setDeleteModal(false);
        setEditModal(false);
      }
    }, [])
    
    const handleOpenModal = () => {
        setOpenModal(true);
    }

    const handleOpenEditModal = () => {
        setEditModal(true);
    }  
    const handleCloseModal = () => setOpenModal(false);
    const handleDeleteModal = () => {
        setDeleteModal(true);
      }
    const handleCloseDeleteModal = () => setDeleteModal(false);
    const handleCloseEditModal = () => setEditModal(false);
    return (
          <div>
              <button onClick={handleOpenModal} className="btn btn-primary mx-2 "><i className="fa fa-info-circle" aria-hidden="true"></i></button>
              <button onClick={handleOpenEditModal} className="btn btn-warning "><i className="fa fa-pencil" aria-hidden="true"></i></button>
              <button onClick={handleDeleteModal} className="btn btn-danger mx-2"><i className="fa fa-trash" aria-hidden="true"></i></button>
              <ViewAnnouncementModal data={displayData[selectedRows.data[0].dataIndex].data}  openModal={openModal} setOpenModal={setOpenModal} handleCloseModal={handleCloseModal}/>
              <EditAnnouncementModal data={displayData[selectedRows.data[0].dataIndex].data} openModal={openEditModal} setOpenModal={setEditModal} handleCloseModal={handleCloseEditModal}/>
              <DeleteAnnouncementModal data={displayData[selectedRows.data[0].dataIndex].data} openDeleteModal={openDeleteModal} setDeleteModal={setDeleteModal} handleCloseDeleteModal={handleCloseDeleteModal}/>
          </div>
    )
}

export default AnnouncementCustomToolbar
