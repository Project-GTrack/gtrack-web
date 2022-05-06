import React, { useState } from 'react'
import MUIDataTable from "mui-datatables";
import { useEffect } from 'react';
import { useReportsandConcernsPageContext } from '../pages/ReportsPage';
import ConcernToolbar from './ConcernToolbar';
import ResolveConcernMOdal from './Concerns/modals/ResolveConcernModal';
import ViewConcernModal from './Concerns/modals/ViewConcernModal';
import DeleteConcernModal from './Concerns/modals/DeleteConcernModal';

const ConcernComponent = () => {
    const {queryResult}= useReportsandConcernsPageContext();
    const concerns = queryResult.data.data.concerns
    const [data, setData] = useState([]);
    const [rowData, setRowData] = useState(0);
    const [openResolveModal, setOpenResolveModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal]=useState(false); 
    const [openViewModal, setOpenViewModal] = useState(false);
    const handleModalResolveOpen=(rowData)=>{
        setOpenResolveModal(true);
        setRowData(rowData);
    }
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
            customBodyRenderLite: (dataIndex, rowIndex)=>{
                return (
                    <>
                        <button onClick={()=>handleModalResolveOpen(dataIndex)} className="btn btn-success mx-2"><i className="fa fa-check" aria-hidden="true"></i></button>
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
        )
    };
    return (
        <div>
            <MUIDataTable
                    title={"Concerns"}
                    data={data}
                    columns={columns}
                    options={options}
            />
            <ResolveConcernMOdal data={concerns[rowData]} openResolveModal={openResolveModal} setOpenResolveModal={setOpenResolveModal}/>
            <ViewConcernModal data={concerns[rowData]} openViewModal={openViewModal} setOpenViewModal={setOpenViewModal}/>
            <DeleteConcernModal data={concerns[rowData]} openDeleteModal={openDeleteModal} setOpenDeleteModal={setOpenDeleteModal}/>
        </div>
    )
}

export default ConcernComponent
