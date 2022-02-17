import React from 'react'
import MUIDataTable from "mui-datatables";
import EventCustomToolbar from './EventCustomToolbar';
import AddNewEventModal from './modals/AddNewEventModal';
const EventsComponent = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [contactPerson, setContactPerson] = React.useState("Rj Oliverio");
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleContactPerson = (event) => {
      setContactPerson(event.target.value);
  }
    const columns = ["Event Name", "Participants","Event Date","Address","Status", "Date Added"];
    const street = "Sta. Lucia";
    const barangay ="Barangay Cogon";
    const town = "Compostela";
    const postal = "6000";
    const data = [
    ["Compostela Municipal Tree Planning 2020", "SWM Staff","12/7/2020 8AM",street+' '+barangay,"Ongoing", "10/12/2020",
    street,barangay,town,postal,"12/7/2020 5PM","The municipal tree planing is scheduled quarterly every year"+ 
    "in the hopes to increase awareness in the preservation of the the trees in the city.","Rj Oliverio","09123456789"]
    ];
   

    const options = {
    selectableRowsHeader: false,
    selectableRows:'single',
    filter: true,
    filterType: 'dropdown',
    customToolbarSelect:(selectedRows,displayData)=>(
        <EventCustomToolbar selectedRows={selectedRows} displayData={displayData}/>
    )
    };
    return (
        <div>
            <div className='mb-3'>
                <button className='btn btn-success' onClick={handleOpenModal}><i className="fa fa-plus" aria-hidden="true"></i> Add New Event</button>            </div>
                <AddNewEventModal
            openModal={openModal}
            contactPerson = {contactPerson}
            handleCloseModal={handleCloseModal}
            handleOpenModal={handleOpenModal}
          />
            <MUIDataTable
                title={"Event List"}
                data={data}
                columns={columns}
                options={options}
            />
        </div>
    )
}

export default EventsComponent
