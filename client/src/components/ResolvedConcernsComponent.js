import React, { useState } from 'react'
import MUIDataTable from "mui-datatables";
import { useEffect } from 'react';
import { useReportsandConcernsPageContext } from '../pages/ReportsPage';
import ConcernToolbar from './ConcernToolbar';

const ResolvedConcernsComponent = () => {
    const {queryResult}= useReportsandConcernsPageContext();
    const concernsResolved = queryResult.data.data.concernsResolved
    const columns = ["Subject", "Message","Resident","Classification"];
    const [data, setData] = useState([]);
    const [openResolveModal, setOpenResolveModal] = useState(false);
    const [openViewModal, setOpenViewModal]=useState(false);
    const [openDeleteModal, setOpenDeleteModal]=useState(false); 

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

    const options = {
        selectableRowsHeader: false,
        selectableRows:'single',
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
        </div>
    )
}

export default ResolvedConcernsComponent
