/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";
import ViewEventModal from "./modals/ViewEventModal";
import EditEventModal from "./modals/EditEventModal";
import DeleteEventModal from "./modals/DeleteEventModal";
const EventCustomToolbar = ({setEvents,statusToast,setStatusToast,selectedRows,displayData}) => {
    const [openModal, setOpenModal] = React.useState(false);
    const [openDeleteModal, setDeleteModal] = React.useState(false);
    const[openEditModal, setEditModal] = React.useState(false);

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
              <button onClick={handleOpenModal} className="btn btn-success mx-1 "><i className="fa fa-eye" aria-hidden="true"></i></button>
              <button onClick={handleOpenEditModal} className="btn btn-warning mx-1 "><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
              <button onClick={handleDeleteModal} className="btn btn-danger mx-1"><i className="fa fa-trash" aria-hidden="true"></i></button>
              <ViewEventModal data={displayData[selectedRows.data[0].dataIndex].data} openModal={openModal} setOpenModal={setOpenModal} handleCloseModal={handleCloseModal}/>
              <EditEventModal data={displayData[selectedRows.data[0].dataIndex].data} setEvents={setEvents} statusToast={statusToast} setStatusToast={setStatusToast} openModal={openEditModal} setOpenModal={setEditModal} handleCloseModal={handleCloseEditModal}/>
              <DeleteEventModal data={displayData[selectedRows.data[0].dataIndex].data} statusToast={statusToast} setStatusToast={setStatusToast} setEvents={setEvents} openDeleteModal={openDeleteModal} setDeleteModal={setDeleteModal} handleCloseDeleteModal={handleCloseDeleteModal}/>
          </div>
    )
}

export default EventCustomToolbar
