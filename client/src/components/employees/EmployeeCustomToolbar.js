/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";
import ViewEmployeeModal from "./modals/ViewEmployeeModal";
import DeleteEmployeeModal from "./modals/DeleteEmployeeModal";
const EmployeeCustomToolbar = ({selectedRows,displayData}) => {
    const [openModal, setOpenModal] = React.useState(false);
    const [openDeleteModal, setDeleteModal] = React.useState(false);
    const [data,setData]=React.useState({});
    const handleOpenModal = () => {
        console.log(displayData[selectedRows.data[0].dataIndex].data)
        setOpenModal(true);
      }
    const handleCloseModal = () => setOpenModal(false);
    const handleDeleteModal = () => {
        setDeleteModal(true);
      }
    const handleCloseDeleteModal = () => setDeleteModal(false);
    return (
          <div>
              <button onClick={handleOpenModal} className="btn btn-warning "><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
              <button onClick={handleDeleteModal} className="btn btn-danger mx-2"><i className="fa fa-trash" aria-hidden="true"></i></button>
              <ViewEmployeeModal data={displayData[selectedRows.data[0].dataIndex].data} openModal={openModal} setOpenModal={setOpenModal} handleCloseModal={handleCloseModal}/>
              <DeleteEmployeeModal data={displayData[selectedRows.data[0].dataIndex].data} openDeleteModal={openDeleteModal} setDeleteModal={setDeleteModal} handleCloseDeleteModal={handleCloseDeleteModal}/>
          </div>
    )
}

export default EmployeeCustomToolbar
