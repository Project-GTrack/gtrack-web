import React from 'react'
import MUIDataTable from "mui-datatables";
import CustomSelectToolbar from './CustomSelectToolbar';
const TruckAssignmentPanel = () => {
    const columns = ["Schedule", "Plate Number", "Driver", "Route","Date Created","Status"];

    const data = [
    ["01/02/22", "Test Corp", "Yonkers", "NY","01/02/22","Active"],
    ];

    const options = {
    selectableRowsHeader: false,
    selectableRows:'single',
    filter: true,
    filterType: 'dropdown',
    customToolbarSelect:(selectedRows,displayData)=>(
        <CustomSelectToolbar selectedRows={selectedRows} displayData={displayData}/>
    )
    };
    return (
        <div>
            <div className='mb-3'>
                <button className='btn btn-success'><i className="fa fa-plus" aria-hidden="true"></i> Add New Truck Assignment</button>            </div>
            <MUIDataTable
                title={"Truck Assignments List"}
                data={data}
                columns={columns}
                options={options}
            />
        </div>
    )
}

export default TruckAssignmentPanel
