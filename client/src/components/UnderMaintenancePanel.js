import React, { useState } from 'react'
import MUIDataTable from "mui-datatables";
import GarbageTrucksToolbar from './GarbageTrucksToolbar';
import { useEffect } from 'react';
import moment from 'moment';
const UnderMaintenancePanel = ({inactives,setTrucks,statusToast,setStatusToast}) => {
    const columns = ["Plate Number", "Model","Added by","Date Added", "Status"];
    const [data, setData] = useState([]);
    const [openReactivateModal, setOpenReactivateModal] = useState(false);
    // const data = [
    // ["AB123", "Suzuki", "01/01/22", "Active",],
    // ];
    useEffect(() => {
        var temp=[];
        // eslint-disable-next-line array-callback-return
        inactives && inactives.map((item)=>{
          temp.push([item.plate_no && item.plate_no,item.model && item.model,item.truckUser.fname+ " " +item.truckUser.lname,item.createdAt && moment(item.createdAt).format("MMMM DD, YYYY"),item.active && item.active===true?'Active':'Inactive']);
        })
        setData(temp);
    }, [inactives])

    const options = {
        selectableRowsHeader: false,
        selectableRows:'single',
        filter: true,
        filterType: 'dropdown',
        customToolbarSelect:(selectedRows,displayData)=>(
            <GarbageTrucksToolbar 
                statusToast={statusToast}
                setStatusToast={setStatusToast} 
                data={inactives[selectedRows.data[0].dataIndex]} 
                setTrucks={setTrucks} 
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
        </div>
    )
}

export default UnderMaintenancePanel
