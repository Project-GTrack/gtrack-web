import React from 'react'
import MUIDataTable from "mui-datatables";
import EmployeeCustomToolbar from './EmployeeCustomToolbar';
import AddNewEmployeeModal from './modals/AddNewEmployeeModal';
const DriversComponent = () => {
  const columns = ["Last Name", "First Name", "Email", "Contact Number","Address","Age","Gender","Date Added","Status"];

  const data = [
  ["Stark", "Tony", "ironman@gmail.com", "09123456789","America","52","Male","01/02/22","Active","/images/gtrack-logo-1.png","Driver"],
  ["Rogers", "Steve", "capamerica@gmail.com", "09123456789","America","75","Male","01/02/22","Active","/images/gtrack-logo-1.png","Driver"],
  ];

  const [openModal, setOpenModal] = React.useState(false);
  const [gender, setGender] = React.useState("");
  const [employee,setEmployee] = React.useState("");
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleGender = (event) => {
    setGender(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value
    );
  };
  const handleEmployee = (event)=>{
    setEmployee(event.target.value);
  }
  
    const options = {
    selectableRowsHeader: false,
    selectableRows:'single',
    filter: true,
    filterType: 'dropdown',
    customToolbarSelect:(selectedRows,displayData)=>(
      <EmployeeCustomToolbar avatar={data[displayData[selectedRows.data[0].dataIndex].dataIndex][9]} selectedRows={selectedRows} displayData={displayData}/>    
    )
    };
    return (
        <div>
            <div className='mb-3'>
                <button className='btn btn-success' onClick={handleOpenModal}><i class="fa fa-plus" aria-hidden="true"></i> Add New Employee</button>            </div>
                <AddNewEmployeeModal
            openModal={openModal}
            handleCloseModal={handleCloseModal}
            handleOpenModal={handleOpenModal}
            gender={gender}
            employee={employee}
            handleGender={handleGender}
            handleEmployee={handleEmployee}
          />
            <MUIDataTable
                title={"Drivers List"}
                data={data}
                columns={columns}
                options={options}
            />
        </div>
    )
}

export default DriversComponent
