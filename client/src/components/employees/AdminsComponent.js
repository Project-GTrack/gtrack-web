import React from 'react'
import MUIDataTable from "mui-datatables";
import CustomSelectToolbar from '../CustomSelectToolbar';
const AdminsComponent = () => {
    const columns = ["Last Name", "First Name", "Email", "Contact Number","Address","Age","Gender","Date Added","Status"];

    const data = [
    ["Snow", "Jon", "snowjn@gmail.com", "09123456789","America","52","Male","01/02/22","Active"],
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
            <MUIDataTable
                title={"Admins List"}
                data={data}
                columns={columns}
                options={options}
            />
        </div>
    )
}

export default AdminsComponent
