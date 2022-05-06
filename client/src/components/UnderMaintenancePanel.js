import React, { useState } from 'react'
import MUIDataTable from "mui-datatables";
import GarbageTrucksToolbar from './GarbageTrucksToolbar';
import { useEffect } from 'react';
import moment from 'moment';
import { useTrucksPageContext } from '../pages/TrucksPage';
import ReactivateTruckModal from './trucks/ReactivateTruckModal';
const UnderMaintenancePanel = () => {
    const {queryResult}= useTrucksPageContext();
    const inactives = queryResult.data.data.inactives;
    const [data, setData] = useState([]);
    const [openReactivateModal, setOpenReactivateModal] = useState(false);
    const [rowData, setRowData] = useState(0);
    const handleOpenReactivateModal=(rowData)=>{
        setOpenReactivateModal(true);
        setRowData(rowData);
    }
    useEffect(() => {
        var temp=[];
        // eslint-disable-next-line array-callback-return
        inactives && inactives.map((item)=>{
          temp.push([item.plate_no && item.plate_no,item.model && item.model,item.truckUser.fname+ " " +item.truckUser.lname,item.createdAt && moment(item.createdAt).format("MMMM DD, YYYY"),item.active && item.active===true?'Active':'Inactive']);
        })
        setData(temp);
    }, [inactives])
    
    const columns = ["Plate Number", "Model","Added by","Date Added", "Status",{
        label:"Actions",
        options:{
            customBodyRenderLite: (dataIndex, rowIndex)=>{
                // console.log(tableMeta.tableData);
                return (
                    <>
                        <button onClick={()=>handleOpenReactivateModal(dataIndex)} className="btn btn-success mx-2"><i className="fa fa-check" aria-hidden="true"></i></button>
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
            <GarbageTrucksToolbar 
                data={inactives[selectedRows.data[0].dataIndex]} 
                openReactivateModal={openReactivateModal} 
                setOpenReactivateModal={setOpenReactivateModal}
                selectedRows={selectedRows} 
                displayData={displayData}
            />
        )
    };
    return (
        <div>
            <MUIDataTable
                    title={"Under Maintenance Truck List"}
                    data={data}
                    columns={columns}
                    options={options}
            />
            <ReactivateTruckModal data={inactives[rowData]} openReactivateModal={openReactivateModal} setOpenReactivateModal={setOpenReactivateModal}/>
        </div>
    )
}

export default UnderMaintenancePanel
