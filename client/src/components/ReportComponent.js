import React, { useState } from 'react'
import MUIDataTable from "mui-datatables";
import ReportsandConcernsToolbar from './ReportsandConcernsToolbar';
import { useEffect } from 'react';
import { useReportsandConcernsPageContext } from '../pages/ReportsPage';
import ResolveReportModal from './Reports/ResolveReportModal';
import ViewReportModal from './Reports/ViewReportModal';
import DeleteReportModal from './Reports/DeleteReportModal';
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
const ReportComponent = () => {
    const {queryResult}= useReportsandConcernsPageContext();
    const reports = queryResult.data.data.reports;
    const [rowData, setRowData] = useState(0);
    const [data, setData] = useState([]);
    const [openResolveModal, setOpenResolveModal] = useState(false);
    const [openViewModal, setOpenViewModal]=useState(false);
    const [openDeleteModal, setOpenDeleteModal]=useState(false); 
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
        reports && reports.map((item)=>{
          temp.push([item.subject && item.subject, item.message && item.message, item.reportDriver.fname+" "+item.reportDriver.lname, item.degree]);
        })
        setData(temp);
        return()=>{
            setOpenResolveModal(false);
            setOpenDeleteModal(false);
        }
    }, [reports])

    const columns = ["Subject", "Message","Driver","Degree",{
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
            <ReportsandConcernsToolbar
                data={reports[selectedRows.data[0].dataIndex]} 
                openResolveModal={openResolveModal} 
                setOpenResolveModal={setOpenResolveModal}
                openViewModal={openViewModal} 
                setOpenViewModal={setOpenViewModal}
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
                    title={"Reports"}
                    data={data}
                    columns={columns}
                    options={options}
            />
            </ThemeProvider>
            <ResolveReportModal data={reports[rowData]} openResolveModal={openResolveModal} setOpenResolveModal={setOpenResolveModal}/>
            <ViewReportModal data={reports[rowData]} openViewModal={openViewModal} setOpenViewModal={setOpenViewModal}/>
            <DeleteReportModal data={reports[rowData]} openDeleteModal={openDeleteModal} setOpenDeleteModal={setOpenDeleteModal}/>
        </div>
    )
}

export default ReportComponent
