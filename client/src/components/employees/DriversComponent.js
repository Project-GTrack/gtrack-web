import React, { useEffect, useState } from 'react'
import MUIDataTable from "mui-datatables";
import EmployeeCustomToolbar from './EmployeeCustomToolbar';
import AddNewEmployeeModal from './modals/AddNewEmployeeModal';
import moment from 'moment';
import { useEmployeePageContext } from '../../pages/EmployeesPage';
const DriversComponent = ({statusToast,setStatusToast,setAccounts}) => {
  // const [, setDriverList] = useState([]);
  const {queryResult}=useEmployeePageContext();
  const drivers=queryResult.data.data.drivers;
  const [data, setData] = useState([]);
  useEffect(() => {
    // setDriverList(drivers);
    var temp=[];
    // eslint-disable-next-line array-callback-return
    drivers && drivers.map((item)=>{
      temp.push([item.fname && item.fname,item.lname && item.lname,item.email && item.email,item.contact_no && item.contact_no,`${item.purok?item.purok:""} ${item.street?item.street:""} ${item.barangay?item.barangay:""}`,item.birthday && moment().diff(item.birthday, 'years'),item.gender && item.gender,item.createdAt && moment(item.createdAt).format("MMMM DD, YYYY"),item.status && item.status===true?'Active':'Inactive',item.image]);
    })
    setData(temp);
  }, [drivers])
  
  const columns = ["Last Name", "First Name", "Email", "Contact Number","Address","Age","Gender","Date Added","Status"];

  const [openModal, setOpenModal] = React.useState(false);
  useEffect(() => {
    return () => {
      setOpenModal(false);
    }
  }, [])
    const options = {
      selectableRowsHeader: false,
      selectableRows:'single',
      filter: true,
      filterType: 'dropdown',
      customToolbarSelect:(selectedRows,displayData)=>(
        <EmployeeCustomToolbar
          statusToast={statusToast} 
          setStatusToast={setStatusToast} 
          setAccounts={setAccounts} 
          data={data[selectedRows.data[0].dataIndex]} 
          selectedRows={selectedRows} 
          displayData={displayData}
        />    
      )
    };
    return (
        <div>
            <div className='mb-3'>
              <button className='btn btn-success' onClick={()=>setOpenModal(true)}><i className="fa fa-plus" aria-hidden="true"></i> Add New Employee</button>
            </div>
            <AddNewEmployeeModal
              statusToast={statusToast} 
              setStatusToast={setStatusToast}
              openModal={openModal}
              setOpenModal={setOpenModal}
              setAccounts={setAccounts}
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
