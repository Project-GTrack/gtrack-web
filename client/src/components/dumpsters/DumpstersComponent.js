import React, { useEffect, useState } from 'react'
import MUIDataTable from "mui-datatables";
import DumpsterCustomToolbar from './DumpsterCustomToolbar';
import AddNewDumpsterModal from './modals/AddNewDumpsterModal';
import { useDumpstersPageContext } from '../../pages/DumpstersPage';
import ViewDumpsterModal from './modals/ViewDumpsterModal';
import EditDumpsterModal from './modals/EditDumpsterModal';
import DeleteDumpsterModal from './modals/DeleteDumpsterModal';
import { ButtonGroup } from '@mui/material';
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
const DumpstersComponent = ({statusToast, setStatusToast}) => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [data,setData]=useState([]);
  const {queryResult}=useDumpstersPageContext();
  const dumpsters = queryResult.data.data;
  useEffect(() => {
    let tempD=[];
    for(var x = 0;x < dumpsters.length;x++){
          var address = dumpsters[x].street.toString().charAt(0).toUpperCase() + dumpsters[x].street.slice(1) +", "+dumpsters[x].purok.toString().charAt(0).toUpperCase()+ dumpsters[x].purok.slice(1)+", "+dumpsters[x].barangay.toString().charAt(0).toUpperCase()+ dumpsters[x].barangay.slice(1)+", "+dumpsters[x].town.toString().charAt(0).toUpperCase()+ dumpsters[x].town.slice(1);
          var temp = [
              dumpsters[x].dumpster_id,
              address,
              dumpsters[x].postal_code,
              dumpsters[x].landmark,
              dumpsters[x].latitude,
              dumpsters[x].longitude
          ]
          tempD.push(temp);
      }
      setData(tempD);  
      return () => {
          setData([]);
      }     
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
    const [openViewModal, setOpenViewModal] = useState(false);
    const [openDeleteModal, setDeleteModal] = useState(false);
    const [openEditModal, setEditModal] = useState(false);
    const[rowData,  setRowData] = useState([]);
    const handleOpenViewModal = (rowData) => {
        setOpenViewModal(true);
        setRowData(rowData);
    }
    const handleOpenEditModal = (e,rowData) => {
        e.stopPropagation();
        setEditModal(true);
        setRowData(rowData);
    }
    const handleDeleteModal = (e,rowData) => {
        e.stopPropagation();
        setDeleteModal(true);
        setRowData(rowData);
    }
    useEffect(() => {
      return () => {
        setOpenViewModal(false);
        setDeleteModal(false);
        setEditModal(false);
      }
    }, [])
    const columns = [
        {
        name:"ID",
        label:"ID",
        options: {
            filter:false,
            sort:false,
            display:false,
            viewColumns:false,
        }
        },
        {
            name:"Address",
            label:"Address",
            options: {
                filter:true,
                sort:true,
            }
        },
        {
            name:"Postal Code",
            label:"Postal Code",
            options: {
                filter:true,
                sort:true,
            }
        },
        {
            name:"Landmark",
            label:"Landmark",
            options: {
                filter:true,
                sort:true,
            }
        },
        {
            name:"Latitude",
            label:"Latitude",
            options: {
                filter:false,
                sort:false,
                display:false,
                viewColumns:false,
            }
            },
            {
                name:"Longitude",
                label:"Longitude",
                options: {
                    filter:false,
                    sort:false,
                    display:false,
                    viewColumns:false,
                }
            },
            {
                name:"Actions",
                label:"Actions",
                options:{
                    filter:false,
                    sort:false,
                    customBodyRender: (value,tableMeta,updateValue)=>{
                        return (
                            <ButtonGroup>
                                {/* <button onClick={()=>handleOpenViewModal(tableMeta.rowData)} className="btn btn-primary mx-1"><i className="fa fa-info-circle" aria-hidden="true"></i></button> */}
                                <button onClick={(e)=>handleOpenEditModal(e,tableMeta.rowData)} className="btn btn-warning "><i className="fa fa-pencil" aria-hidden="true"></i></button>
                                <button onClick={(e)=>handleDeleteModal(e,tableMeta.rowData)} className="btn btn-danger mx-1"><i className="fa fa-trash" aria-hidden="true"></i></button>
                            </ButtonGroup>
                        )
                    }
                }
            }
]
    const options = {
    selectableRowsHeader: false,
    selectableRows:false,
    filter: true,
    filterType: 'dropdown',
    customToolbarSelect:(selectedRows,displayData)=>(
        <DumpsterCustomToolbar selectedRows={selectedRows} displayData={displayData}/>
    ),
    onRowClick:(rowData, rowMeta) => {
        handleOpenViewModal(rowData);
    }
    };
    return (
        <div>
            <div className='mb-3'>
                <button className='btn btn-success' onClick={handleOpenModal}><i className="fa fa-plus" aria-hidden="true"></i> Add New Dumpster/Pickup Point</button>            </div>
            <AddNewDumpsterModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                handleCloseModal={handleCloseModal}
                handleOpenModal={handleOpenModal}
            />
            <ViewDumpsterModal data={rowData} openModal={openViewModal} setOpenModal={setOpenViewModal} handleCloseModal={()=>setOpenViewModal(false)}/>
            <EditDumpsterModal data={rowData} openModal={openEditModal} setOpenModal={setEditModal} handleCloseModal={()=>setEditModal(false)}/>
            <DeleteDumpsterModal data={rowData} openDeleteModal={openDeleteModal} setDeleteModal={setDeleteModal} handleCloseDeleteModal={()=>setDeleteModal(false)}/>
            <ThemeProvider theme={theme}>
            <MUIDataTable
                title={"Dumpsters List"}
                data={data}
                columns={columns}
                options={options}
            />
            </ThemeProvider>
        </div>
        
        
    )
}

export default DumpstersComponent
