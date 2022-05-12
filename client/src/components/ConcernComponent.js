import React, { useState } from 'react'
import MUIDataTable from "mui-datatables";
import { useEffect } from 'react';
import { useReportsandConcernsPageContext } from '../pages/ReportsPage';
import ConcernToolbar from './ConcernToolbar';
import ResolveConcernMOdal from './Concerns/modals/ResolveConcernModal';
import ViewConcernModal from './Concerns/modals/ViewConcernModal';
import DeleteConcernModal from './Concerns/modals/DeleteConcernModal';
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
const ConcernComponent = () => {
    const {queryResult}= useReportsandConcernsPageContext();
    const concerns = queryResult.data.data.concerns
    const [data, setData] = useState([]);
    const [rowData, setRowData] = useState(0);
    const [openResolveModal, setOpenResolveModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal]=useState(false); 
    const [openViewModal, setOpenViewModal] = useState(false);
    const handleModalResolveOpen=(e,rowData)=>{
        e.stopPropagation();
        setOpenResolveModal(true);
        setRowData(rowData);
    }
    const handleModalViewOpen=(rowData)=>{
        setOpenViewModal(true);
        setRowData(rowData);
    }
    const handleModalDeleteOpen=(e,rowData)=>{
        e.stopPropagation();
        setOpenDeleteModal(true);
        setRowData(rowData);
    }
    useEffect(() => {
        var temp=[];
        // eslint-disable-next-line array-callback-return
        concerns && concerns.map((item)=>{
          temp.push([item.subject && item.subject, item.message && item.message, item.concernResident.fname+" "+item.concernResident.lname, item.classification]);
        })
        setData(temp);
        return()=>{
            setOpenResolveModal(false);
            setOpenDeleteModal(false);
        }
    }, [concerns])

    const columns = ["Subject", "Message","Resident", "Classification",{
        name:"Actions",
        label:"Actions",
        options:{
            filter:false,
            sort:false,
            customBodyRenderLite: (dataIndex, rowIndex)=>{
                return (
                    <ButtonGroup>
                        <button onClick={(e)=>handleModalResolveOpen(e,dataIndex)} className="btn btn-success mx-1"><i className="fa fa-check" aria-hidden="true"></i></button>
                        {/* <button onClick={()=>handleModalViewOpen(dataIndex)} className="btn btn-primary"><i className="fa fa-info-circle" aria-hidden="true"></i></button> */}
                        <button onClick={(e)=>handleModalDeleteOpen(e,dataIndex)} className="btn btn-danger mx-1"><i className="fa fa-trash" aria-hidden="true"></i></button>
                    </ButtonGroup>
                )
            }
        }
    }];

    const options = {
        selectableRowsHeader: false,
        selectableRows:false,
        filter: true,
        filterType: 'dropdown',
        customToolbarSelect:(selectedRows,displayData)=>(
            <ConcernToolbar
                data={concerns[selectedRows.data[0].dataIndex]} 
                openViewModal={openViewModal}
                setOpenViewModal={setOpenViewModal}
                openResolveModal={openResolveModal} 
                setOpenResolveModal={setOpenResolveModal}
                openDeleteModal={openDeleteModal} 
                setOpenDeleteModal={setOpenDeleteModal}
                selectedRows={selectedRows} 
                displayData={displayData}
            />
        ),
        onRowClick:(rowData, rowMeta) => {
            handleModalViewOpen(rowMeta.dataIndex);
        }
    };
    return (
        <div>
            <ThemeProvider theme={theme}>
            <MUIDataTable
                    title={"Concerns"}
                    data={data}
                    columns={columns}
                    options={options}
            />
            </ThemeProvider>
            <ResolveConcernMOdal data={concerns[rowData]} openResolveModal={openResolveModal} setOpenResolveModal={setOpenResolveModal}/>
            <ViewConcernModal data={concerns[rowData]} openViewModal={openViewModal} setOpenViewModal={setOpenViewModal}/>
            <DeleteConcernModal data={concerns[rowData]} openDeleteModal={openDeleteModal} setOpenDeleteModal={setOpenDeleteModal}/>
        </div>
    )
}

export default ConcernComponent
