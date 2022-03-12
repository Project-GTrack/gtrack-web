import React, { useEffect, useState } from 'react'
import MUIDataTable from "mui-datatables";
import DumpsterCustomToolbar from './DumpsterCustomToolbar';
import AddNewDumpsterModal from './modals/AddNewDumpsterModal';
import { useDumpstersPageContext } from '../../pages/DumpstersPage';

const DumpstersComponent = ({statusToast, setStatusToast}) => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [data,setData]=useState([]);
  const {queryResult}=useDumpstersPageContext();
  const dumpsters = queryResult.data.data;
  useEffect(() => {
    let tempD=[];
    for(var x = 0;x < dumpsters.length;x++){
          var address = dumpsters[x].street.toString().charAt(0).toUpperCase() + dumpsters[x].street.slice(1) +", "+dumpsters[x].purok.toString().charAt(0).toUpperCase()+ dumpsters[x].purok.slice(1)+", "+dumpsters[x].barangay.toString().charAt(0).toUpperCase()+ dumpsters[x].barangay.slice(1)+", "+dumpsters[x].town.toString().charAt(0).toUpperCase()+ dumpsters[x].town.slice(1);
          var temp = [
              dumpsters[x].dumpster_id,
              address,
              dumpsters[x].postal_code,
              dumpsters[x].latitude,
              dumpsters[x].longitude
          ]
          tempD.push(temp);
      }
      setData(tempD);  
      return () => {
          setData([]);
      }     
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
    const columns = [
        {
        name:"ID",
        label:"ID",
        options: {
            filter:false,
            sort:false,
            display:false,
            viewColumns:false,
        }
        },
        {
            name:"Address",
            label:"Address",
            options: {
                filter:true,
                sort:true,
            }
        },
        {
            name:"Postal Code",
            label:"Postal Code",
            options: {
                filter:true,
                sort:true,
            }
        },
        {
            name:"Latitude",
            label:"Latitude",
            options: {
                filter:true,
                sort:true,
            }
            },
            {
                name:"Longitude",
                label:"Longitude",
                options: {
                    filter:true,
                    sort:true,
                }
                }
]
    const options = {
    selectableRowsHeader: false,
    selectableRows:'single',
    filter: true,
    filterType: 'dropdown',
    customToolbarSelect:(selectedRows,displayData)=>(
        <DumpsterCustomToolbar selectedRows={selectedRows} displayData={displayData}/>
    )
    };
    return (
        <div>
            <div className='mb-3'>
                <button className='btn btn-success' onClick={handleOpenModal}><i className="fa fa-plus" aria-hidden="true"></i> Add New Dumpster/Pickup Point</button>            </div>
            <AddNewDumpsterModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                handleCloseModal={handleCloseModal}
                handleOpenModal={handleOpenModal}
            />
            <MUIDataTable
                title={"Dumpsters List"}
                data={data}
                columns={columns}
                options={options}
            />
        </div>
        
        
    )
}

export default DumpstersComponent
