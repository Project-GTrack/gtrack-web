import React, { useState } from 'react'
import MUIDataTable from "mui-datatables";
import { useEffect } from 'react';
import moment from 'moment';
import { useReportsandConcernsPageContext } from '../pages/ReportsPage';
import ConcernToolbar from './ConcernToolbar';

const TEST = () => {
    const {queryResult}= useReportsandConcernsPageContext();
    const concerns = queryResult.data.data.concerns
    const columns = ["Subject", "Message","Resident", "Classification"];
    const [data, setData] = useState([]);
    const [openResolveModal, setOpenResolveModal] = useState(false);
    const [openViewModal, setOpenViewModal]=useState(false);
    const [openDeleteModal, setOpenDeleteModal]=useState(false); 

    useEffect(() => {
        var temp=[];
        // eslint-disable-next-line array-callback-return
        concerns && concerns.map((item)=>{
          temp.push([item.subject && item.subject, item.message && item.message, item.concernResident.fname+""+item.concernResident.lname, item.classification]);
        })
        setData(temp);
    }, [concerns])

    const options = {
        selectableRowsHeader: false,
        selectableRows:'single',
        filter: true,
        filterType: 'dropdown',
        customToolbarSelect:(selectedRows,displayData)=>(
            <ConcernToolbar
                data={concerns[selectedRows.data[0].dataIndex]} 
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
        </div>
    )
}

export default TEST
