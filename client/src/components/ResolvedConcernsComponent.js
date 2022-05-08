import React, { useState } from 'react'
import MUIDataTable from "mui-datatables";
import { useEffect } from 'react';
import { useReportsandConcernsPageContext } from '../pages/ReportsPage';
import ConcernToolbar from './ConcernToolbar';
import ViewConcernModal from './Concerns/modals/ViewConcernModal';
import DeleteConcernModal from './Concerns/modals/DeleteConcernModal';
import { ButtonGroup } from '@mui/material';

const ResolvedConcernsComponent = () => {
    const {queryResult}= useReportsandConcernsPageContext();
    const concernsResolved = queryResult.data.data.concernsResolved
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
        concernsResolved && concernsResolved.map((item)=>{
          temp.push([item.subject && item.subject, item.message && item.message, item.concernResident.fname+" "+item.concernResident.lname, item.classification]);
        })
        setData(temp);
        return()=>{
            setOpenDeleteModal(false);
        }
    }, [concernsResolved])

    
    const columns = ["Subject", "Message","Resident","Classification",{
        name:"Actions",
        label:"Actions",
        options:{
            filter:false,
            sort:false,
            customBodyRenderLite: (dataIndex, rowIndex)=>{
                return (
                    <ButtonGroup>
                        <button onClick={()=>handleModalViewOpen(dataIndex)} className="btn btn-primary"><i className="fa fa-info-circle" aria-hidden="true"></i></button>
                        <button onClick={()=>handleModalDeleteOpen(dataIndex)} className="btn btn-danger mx-1"><i className="fa fa-trash" aria-hidden="true"></i></button>
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
                data={concernsResolved[selectedRows.data[0].dataIndex]} 
                openResolveModal={openResolveModal} 
                openViewModal={openViewModal}
                setOpenViewModal={setOpenViewModal}
                setOpenResolveModal={setOpenResolveModal}
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
                    title={"Resolved Concerns"}
                    data={data}
                    columns={columns}
                    options={options}
            />
            <ViewConcernModal data={concernsResolved[rowData]} openViewModal={openViewModal} setOpenViewModal={setOpenViewModal}/>
            <DeleteConcernModal data={concernsResolved[rowData]} openDeleteModal={openDeleteModal} setOpenDeleteModal={setOpenDeleteModal}/>
        </div>
    )
}

export default ResolvedConcernsComponent
