import React, { useEffect, useState } from 'react'
import MUIDataTable from "mui-datatables";
import EmployeeCustomToolbar from './EmployeeCustomToolbar';
import AddNewEmployeeModal from './modals/AddNewEmployeeModal';
import moment from 'moment';
import { useEmployeePageContext } from '../../pages/EmployeesPage';
import ViewEmployeeModal from './modals/ViewEmployeeModal';
import DeleteEmployeeModal from './modals/DeleteEmployeeModal';
import { ButtonGroup} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
const theme = createTheme({
  components: {
      MUIDataTableBodyRow: {
        styleOverrides:{
          root: {
              "&.MuiTableRow-hover": {
                  "&:hover": {
                    cursor:'pointer'
                  }
                }
          }
        }
      },
    }})
const DriversComponent = () => {
  // const [, setDriverList] = useState([]);
  const {queryResult}=useEmployeePageContext();
  const drivers=queryResult.data.data.drivers;
  const [data, setData] = useState([]);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openDeleteModal, setDeleteModal] = useState(false);
  const [rowData, setRowData] = useState([]);
  useEffect(() => {
    // setDriverList(drivers);
    var temp=[];
    // eslint-disable-next-line array-callback-return
    drivers && drivers.map((item)=>{
      temp.push([item.fname && item.fname,item.lname && item.lname,item.email && item.email,item.contact_no && item.contact_no,`${item.purok?item.purok:""} ${item.street?item.street:""} ${item.barangay?item.barangay:""}`,item.birthday && moment().diff(item.birthday, 'years'),item.gender && item.gender,item.createdAt && moment(item.createdAt).format("MMMM DD, YYYY"),item.status && item.status===true?'Active':'Inactive',item.image]);
    })
    setData(temp);
  }, [drivers])
  const handleOpenViewModal=(rowData)=>{
    setOpenViewModal(true);
    console.log(rowData);
    setRowData(rowData);
  }
  const handleDeleteModal=(e,rowData)=>{
    e.stopPropagation();
    setDeleteModal(true)
    setRowData(rowData);
  }
  const columns = ["First Name", "Last Name", "Email", "Contact Number","Address","Age","Gender","Date Added","Status",
  {
    name:"Image",
    label:"Image",
    options:{
      display:false,
    }
  },{
    name:"Actions",
        label:"Actions",
        options:{
            filter:false,
            sort:false,
            customBodyRender: (value,tableMeta,updateValue)=>{
                return (
                    <ButtonGroup>
                        {/* <button onClick={()=>handleOpenViewModal(tableMeta.rowData)} className="btn btn-primary mx-1"><i className="fa fa-info-circle" aria-hidden="true"></i></button> */}
                        <button onClick={(e)=>handleDeleteModal(e,tableMeta.rowData)} className={(tableMeta.rowData[8] === "Active")?"btn btn-danger":"btn btn-success"}><i className={(tableMeta.rowData[8] === "Active")?"fa fa-eye-slash":"fa fa-check"} aria-hidden="true"></i></button>
                    </ButtonGroup>
                )
            }
        }
  }];

  const [openModal, setOpenModal] = React.useState(false);
  useEffect(() => {
    return () => {
      setOpenModal(false);
    }
  }, [])
    const options = {
      selectableRowsHeader: false,
      selectableRows:false,
      filter: true,
      filterType: 'dropdown',
      customToolbarSelect:(selectedRows,displayData)=>(
        <EmployeeCustomToolbar
          data={data[selectedRows.data[0].dataIndex]} 
          selectedRows={selectedRows} 
          displayData={displayData}
        />    
      ),
      onRowClick:(rowData, rowMeta) => {
        handleOpenViewModal(rowData);
      }
    };
    return (
        <div>
            <div className='mb-3'>
              <button className='btn btn-success' onClick={()=>setOpenModal(true)}><i className="fa fa-plus" aria-hidden="true"></i> Add New Employee</button>
            </div>
            <AddNewEmployeeModal
              openModal={openModal}
              setOpenModal={setOpenModal}
            />
            <ViewEmployeeModal data={rowData} openModal={openViewModal} setOpenModal={setOpenViewModal} handleCloseModal={()=>setOpenViewModal(false)}/>
            <DeleteEmployeeModal data={rowData} openDeleteModal={openDeleteModal} setDeleteModal={setDeleteModal}/>
            <ThemeProvider theme={theme}>
              <MUIDataTable
                title={"Drivers List"}
                data={data}
                columns={columns}
                options={options}
              />
            </ThemeProvider>
        </div>
    )
}

export default DriversComponent
