import React, { useState } from 'react'
import MUIDataTable from "mui-datatables";
import ReportsandConcernsToolbar from './ReportsandConcernsToolbar';
import { useEffect } from 'react';
import { useReportsandConcernsPageContext } from '../pages/ReportsPage';
import ViewReportModal from './Reports/ViewReportModal';
import DeleteReportModal from './Reports/DeleteReportModal';

const ResolvedReportsComponent = () => {
    const {queryResult}= useReportsandConcernsPageContext();
    const reportsResolved = queryResult.data.data.reportsResolved
    const [data, setData] = useState([]);
    const [openResolveModal, setOpenResolveModal] = useState(false);
    const [openViewModal, setOpenViewModal]=useState(false);
    const [openDeleteModal, setOpenDeleteModal]=useState(false); 
    const [rowData, setRowData] = useState(0);
    const handleModalViewOpen=(rowData)=>{
        setOpenViewModal(true);
        setRowData(rowData);
    }
    const handleModalDeleteOpen=(rowData)=>{
        setOpenDeleteModal(true);
        setRowData(rowData);
    }
    useEffect(() => {
        var temp=[];
        // eslint-disable-next-line array-callback-return
        reportsResolved && reportsResolved.map((item)=>{
          temp.push([item.subject && item.subject, item.message && item.message, item.reportDriver.fname+" "+item.reportDriver.lname, item.degree]);
        })
        setData(temp);
        return()=>{
            setOpenDeleteModal(false);
        }
    }, [reportsResolved])

    const columns = ["Subject", "Message","Driver","Degree",{
        name:"Actions",
        label:"Actions",
        options:{
            filter:false,
            customBodyRenderLite: (dataIndex, rowIndex)=>{
                return (
                    <>
                        <button onClick={()=>handleModalViewOpen(dataIndex)} className="btn btn-primary"><i className="fa fa-info-circle" aria-hidden="true"></i></button>
                        <button onClick={()=>handleModalDeleteOpen(dataIndex)} className="btn btn-danger mx-2"><i className="fa fa-trash" aria-hidden="true"></i></button>
                    </>
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
                data={reportsResolved[selectedRows.data[0].dataIndex]} 
                openResolveModal={openResolveModal} 
                setOpenResolveModal={setOpenResolveModal}
                openViewModal={openViewModal} 
                setOpenViewModal={setOpenViewModal}
                openDeleteModal={openDeleteModal} 
                setOpenDeleteModal={setOpenDeleteModal}
                selectedRows={selectedRows} 
                displayData={displayData}
            />
        )
    };
    return (
        <div>
            <MUIDataTable
                    title={"Resolved Reports"}
                    data={data}
                    columns={columns}
                    options={options}
            />
            <ViewReportModal data={reportsResolved[rowData]} openViewModal={openViewModal} setOpenViewModal={setOpenViewModal}/>
            <DeleteReportModal data={reportsResolved[rowData]} openDeleteModal={openDeleteModal} setOpenDeleteModal={setOpenDeleteModal}/>
        </div>
    )
}

export default ResolvedReportsComponent
