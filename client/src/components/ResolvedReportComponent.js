import React, { useState } from 'react'
import MUIDataTable from "mui-datatables";
import ReportsandConcernsToolbar from './ReportsandConcernsToolbar';
import { useEffect } from 'react';
import { useReportsandConcernsPageContext } from '../pages/ReportsPage';

const ResolvedReportsComponent = () => {
    const {queryResult}= useReportsandConcernsPageContext();
    const reportsResolved = queryResult.data.data.reportsResolved
    const columns = ["Subject", "Message","Driver","Longitude", "Latitude", "Degree"];
    const [data, setData] = useState([]);
    const [openResolveModal, setOpenResolveModal] = useState(false);
    const [openViewModal, setOpenViewModal]=useState(false);
    const [openDeleteModal, setOpenDeleteModal]=useState(false); 

    useEffect(() => {
        var temp=[];
        // eslint-disable-next-line array-callback-return
        reportsResolved && reportsResolved.map((item)=>{
          temp.push([item.subject && item.subject, item.message && item.message, item.reportDriver.fname+" "+item.reportDriver.lname, item.longitude, item.latitude, item.degree]);
        })
        setData(temp);
        return()=>{
            setOpenDeleteModal(false);
        }
    }, [reportsResolved])

    const options = {
        selectableRowsHeader: false,
        selectableRows:'single',
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
        </div>
    )
}

export default ResolvedReportsComponent
