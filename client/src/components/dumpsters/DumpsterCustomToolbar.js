/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useEffect } from "react";
import ViewDumpsterModal from "./modals/ViewDumpsterModal";
import EditDumpsterModal from "./modals/EditDumpsterModal";
import DeleteDumpsterModal from "./modals/DeleteDumpsterModal";
const DumpsterCustomToolbar = ({openEditModal,setEditModal,openDeleteModal,setDeleteModal,setMessage,setMesAlert,selectedRows,displayData}) => {
    const [openModal, setOpenModal] = React.useState(false);
    const [prevData,setPrevData]=React.useState(null);
    const handleOpenModal = () => {
        setOpenModal(true);
      }
    const handleCloseModal = () => setOpenModal(false);
    const handleOpenEditModal = () => {
      setEditModal(true);
  }  
  const handleCloseEditModal = () => setEditModal(false);
    const handleDeleteModal = () => {
        setDeleteModal(true);
      }
    const handleCloseDeleteModal = () => setDeleteModal(false);
    return (
          <div>
              <button onClick={handleOpenModal} className="btn btn-primary mx-1"><i className="fa fa-info-circle" aria-hidden="true"></i></button>
              <button onClick={handleOpenEditModal} className="btn btn-warning mx-1 "><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
              <button onClick={handleDeleteModal} className="btn btn-danger mx-1"><i className="fa fa-trash" aria-hidden="true"></i></button>
              <ViewDumpsterModal data={prevData !== null ? prevData:displayData[selectedRows.data[0].dataIndex].data} openModal={openModal} setOpenModal={setOpenModal} handleCloseModal={handleCloseModal}/>
              <EditDumpsterModal setMessage={setMessage} setMesAlert={setMesAlert} data={prevData !== null ? prevData:displayData[selectedRows.data[0].dataIndex].data} openModal={openEditModal} setOpenModal={setEditModal} handleCloseModal={handleCloseEditModal}/>
              <DeleteDumpsterModal setPrevData={setPrevData} setMessage={setMessage} setMesAlert={setMesAlert} data={prevData !== null ? prevData:displayData[selectedRows.data[0].dataIndex].data} openDeleteModal={openDeleteModal} setDeleteModal={setDeleteModal} handleCloseDeleteModal={handleCloseDeleteModal}/>
          </div>
    )
}

export default DumpsterCustomToolbar
