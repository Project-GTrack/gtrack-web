import React, { useState } from 'react'
import MUIDataTable from "mui-datatables";
import { useEffect } from 'react';
import { useReportsandConcernsPageContext } from '../pages/ReportsPage';
import ConcernToolbar from './ConcernToolbar';

const ConcernComponent = () => {
    const {queryResult}= useReportsandConcernsPageContext();
    const concerns = queryResult.data.data.concerns
    const columns = ["Subject", "Message","Resident", "Classification"];
    const [data, setData] = useState([]);
    const [openResolveModal, setOpenResolveModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal]=useState(false); 
    const [openViewModal, setOpenViewModal] = useState(false);

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

    const options = {
        selectableRowsHeader: false,
        selectableRows:'single',
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
        </div>
    )
}

export default ConcernComponent
