import React, { useState } from 'react'
import MUIDataTable from "mui-datatables";
import GarbageTrucksToolbar from './GarbageTrucksToolbar';
const GarbageTrucksPanel = () => {
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
            <div className='mb-3'>
                <button className='btn btn-success'><i className="fa fa-plus" aria-hidden="true"></i> Add New Truck</button>
            </div>
            <MUIDataTable
                    title={"Garbage Trucks List"}
                    data={data}
                    columns={columns}
                    options={options}
            />
        </div>
    )
}

export default GarbageTrucksPanel
