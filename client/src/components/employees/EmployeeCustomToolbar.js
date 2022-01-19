/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";
import ViewEmployeeModal from "./modals/ViewEmployeeModal";
import ReactivateModal from "./modals/ReactivateModal";
import DeleteEmployeeModal from "./modals/DeleteEmployeeModal";
const EmployeeCustomToolbar = ({avatar,selectedRows,displayData}) => {
    const [openModal, setOpenModal] = React.useState(false);
    const [openDeleteModal, setDeleteModal] = React.useState(false);
    const [data,setData]=React.useState({});
    const handleOpenModal = () => {
        setOpenModal(true);
      }
    const handleCloseModal = () => setOpenModal(false);
    const handleDeleteModal = () => {
        setDeleteModal(true);
      }
    const handleCloseDeleteModal = () => setDeleteModal(false);
    return (
          <div>
              <button onClick={handleOpenModal} className="btn btn-primary "><i class="fa fa-info-circle" aria-hidden="true"></i></button>
              <button onClick={handleDeleteModal} className={(displayData[selectedRows.data[0].dataIndex].data[8] === "Active")?"btn btn-danger mx-2":"btn btn-success mx-2"}><i className={(displayData[selectedRows.data[0].dataIndex].data[8] === "Active")?"fa fa-eye-slash":"fa fa-eye"} aria-hidden="true"></i></button>
              <ViewEmployeeModal avatar={avatar} data={displayData[selectedRows.data[0].dataIndex].data} openModal={openModal} setOpenModal={setOpenModal} handleCloseModal={handleCloseModal}/>
              {(displayData[selectedRows.data[0].dataIndex].data[8] === "Active")?
            <DeleteEmployeeModal data={displayData[selectedRows.data[0].dataIndex].data} openDeleteModal={openDeleteModal} setDeleteModal={setDeleteModal} handleCloseDeleteModal={handleCloseDeleteModal}/>:<ReactivateModal data={displayData[selectedRows.data[0].dataIndex].data} openDeleteModal={openDeleteModal} setDeleteModal={setDeleteModal} handleCloseDeleteModal={handleCloseDeleteModal}/>}
          </div>
    )
}

export default EmployeeCustomToolbar
