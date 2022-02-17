import React, { useEffect, useState } from 'react'
import MUIDataTable from "mui-datatables";
import EmployeeCustomToolbar from './EmployeeCustomToolbar';
import moment from 'moment';

const InactiveAccountsComponent = ({inactives,setAccounts}) => {
    const [inactiveList, setInactiveList] = useState([]);
    const [data, setData] = useState([]);
    useEffect(() => {
        setInactiveList(inactives);
        var temp=[];
        inactives && inactives.map((item)=>{
            temp.push([item.fname && item.fname,item.lname && item.lname,item.email && item.email,item.contact_no && item.contact_no,`${item.purok?item.purok:""} ${item.street?item.street:""} ${item.barangay?item.barangay:""}`,item.birthday && moment().diff(item.birthday, 'years'),item.gender && item.gender,item.createdAt && moment(item.createdAt).format("MMMM DD, YYYY"),item.status && item.status===true?'Active':'Inactive']);
        })
        setData(temp);
    }, [inactives])
    const columns = ["Last Name", "First Name", "Email", "Contact Number","Address","Age","Gender","Date Added","Status"];

    const options = {
        selectableRowsHeader: false,
        selectableRows:'single',
        filter: true,
        filterType: 'dropdown',
        customToolbarSelect:(selectedRows,displayData)=>(
            <EmployeeCustomToolbar setAccounts={setAccounts} data={data[selectedRows.data[0].dataIndex]} selectedRows={selectedRows} displayData={displayData}/>   
        )
    };
    return (
        <div>
            <MUIDataTable
                title={"Inactive Accounts List"}
                data={data}
                columns={columns}
                options={options}
            />
        </div>
    )
}

export default InactiveAccountsComponent
