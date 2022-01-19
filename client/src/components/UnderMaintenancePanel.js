import React, { useState } from 'react'
import MUIDataTable from "mui-datatables";
import GarbageTrucksToolbar from './GarbageTrucksToolbar';
const UnderMaintenancePanel = () => {
    const columns = ["Plate Number", "Model", "Date Added", "Status"];

    const data = [
    ["AB123", "Suzuki", "01/01/22", "Active",],
    ];

    const options = {
        selectableRowsHeader: false,
        selectableRows:'single',
        filter: true,
        filterType: 'dropdown',
        customToolbarSelect:(selectedRows,displayData)=>(
            <GarbageTrucksToolbar selectedRows={selectedRows} displayData={displayData}/>
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
