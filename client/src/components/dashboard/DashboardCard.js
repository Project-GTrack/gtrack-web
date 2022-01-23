import React from "react";
import { Card,CardHeader,CardContent,Typography, Box,Modal } from "@mui/material"; 
import DriversModal from "./modals/DriversModal";
import TrucksModal from "./modals/TrucksModal";
import CollectionsModal from "./modals/CollectionsModal";
import DumpsterModal from "./modals/DumpstersModal";
function DashboardCard(dashcard){
    const [openDriver, setOpenDriver] = React.useState(false);
    const handleOpenDriver = () => setOpenDriver(true);
    const handleCloseDriver = () => setOpenDriver(false);
    
    const [openTruck, setOpenTruck] = React.useState(false);
    const handleOpenTruck = () => setOpenTruck(true);
    const handleCloseTruck = () => setOpenTruck(false);

    const [openDumpster, setOpenDumpster] = React.useState(false);
    const handleOpenDumpster = () => setOpenDumpster(true);
    const handleCloseDumpster = () => setOpenDumpster(false);

    const [openCollection, setOpenCollection] = React.useState(false);
    const handleOpenCollection = () => setOpenCollection(true);
    const handleCloseCollection = () => setOpenCollection(false);


    console.log(dashcard)

    return(
    
        <div>
            <Card onClick={handleOpenDriver} elevation={1}>
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
              openModal={openDriver}
              handleCloseModal={handleCloseDriver}
              handleOpenModal={handleOpenDriver}
            /> : null}
            {dashcard.id === 2 ?  
            <TrucksModal
              openModal={openTruck}
              handleCloseModal={handleCloseTruck}
              handleOpenModal={handleOpenTruck}
            /> : null}
            {dashcard.id === 3 ?  
            <DumpsterModal
              openModal={openDumpster}
              handleCloseModal={handleCloseDumpster}
              handleOpenModal={handleOpenDumpster}
            /> : null}
            {dashcard.id === 4 ?  
            <CollectionsModal
              openModal={openCollection}
              handleCloseModal={handleCloseCollection}
              handleOpenModal={handleOpenCollection}
            /> : null}

           
           
        </div>
    );
}
export default DashboardCard