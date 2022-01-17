import React from 'react'
import MUIDataTable from "mui-datatables";
import DumpsterCustomToolbar from './DumpsterCustomToolbar';
import AddNewDumpsterModal from './modals/AddNewDumpsterModal';
const DumpstersComponent = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [gender, setGender] = React.useState("Male");
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleGender = (event) => {
    setGender(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value
    );
  };
    const columns = ["Address", "Postal Code", "Longitude", "Latitude"];

    const data = [
    ["Poblacion", "6003", "10.4494", "124.0070"],
    ];

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
                <button className='btn btn-success' onClick={handleOpenModal}><i class="fa fa-plus" aria-hidden="true"></i> Add New Dumpster/Pickup Point</button>            </div>
                <AddNewDumpsterModal
            openModal={openModal}
            handleCloseModal={handleCloseModal}
            handleOpenModal={handleOpenModal}
          />
            <MUIDataTable
                title={"Drivers List"}
                data={data}
                columns={columns}
                options={options}
            />
        </div>
    )
}

export default DumpstersComponent
