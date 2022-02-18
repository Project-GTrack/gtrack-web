import React from 'react'
import MUIDataTable from "mui-datatables";
import AnnouncementCustomToolbar from './AnnouncementCustomToolbar';
import AddNewAnnouncementModal from './modals/AddNewAnnouncementModal';
const AnnouncementsComponent = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
    const columns = ["Title", "Content", "Date Added"];

    const data = [
    ["Compostela Municipal Coastal Cleanup 2020", "The coastal cleanup is scheduled quarterly every year in the hopes to increase awareness in the preservation of the major waterways in the city as well as remove as much garbage as possible from these waterways.", "10/12/2020"],
    ];

    const options = {
    selectableRowsHeader: false,
    selectableRows:'single',
    filter: true,
    filterType: 'dropdown',
    customToolbarSelect:(selectedRows,displayData)=>(
        <AnnouncementCustomToolbar selectedRows={selectedRows} displayData={displayData}/>
    )
    };
    return (
        <div>
            <div className='mb-3'>
                <button className='btn btn-success' onClick={handleOpenModal}><i className="fa fa-plus" aria-hidden="true"></i> Add New Announcement</button>            </div>
                <AddNewAnnouncementModal
            openModal={openModal}
            handleCloseModal={handleCloseModal}
            handleOpenModal={handleOpenModal}
          />
            <MUIDataTable
                title={"Announcement List"}
                data={data}
                columns={columns}
                options={options}
            />
        </div>
    )
}

export default AnnouncementsComponent
