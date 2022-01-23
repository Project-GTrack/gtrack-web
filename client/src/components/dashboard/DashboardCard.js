import React from "react";
import { Card,CardHeader,CardContent,Typography} from "@mui/material"; 
import DriversModal from "./modals/DriversModal";
import TrucksModal from "./modals/TrucksModal";
import CollectionsModal from "./modals/CollectionsModal";
import DumpsterModal from "./modals/DumpstersModal";
function DashboardCard(dashcard){
    const [openModal, setOpenModal] = React.useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
  

    return(
    
        <div>
            <Card onClick={handleOpenModal} elevation={1}>
                <CardHeader title={dashcard.title}/>
                <CardContent>
                    <Typography  id={dashcard.id}  variant="h5" color="textSecondary">
                        {dashcard.count}
                        {dashcard.icon}
                    </Typography>
                </CardContent>
            </Card>
            {dashcard.id === 1 ?  
            <DriversModal
              openModal={openModal}
              handleCloseModal={handleCloseModal}
              handleOpenModal={handleOpenModal}
            /> : null}
            {dashcard.id === 2 ?  
            <TrucksModal
              openModal={openModal}
              handleCloseModal={handleCloseModal}
              handleOpenModal={handleOpenModal}
            /> : null}
            {dashcard.id === 3 ?  
            <DumpsterModal
              openModal={openModal}
              handleCloseModal={handleCloseModal}
              handleOpenModal={handleOpenModal}
            /> : null}
            {dashcard.id === 4 ?  
            <CollectionsModal
              openModal={openModal}
              handleCloseModal={handleCloseModal}
              handleOpenModal={handleOpenModal}
            /> : null}

           
           
        </div>
    );
}
export default DashboardCard