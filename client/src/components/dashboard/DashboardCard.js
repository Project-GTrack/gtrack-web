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
              openModal={openDriver}
              handleCloseModal={handleCloseDriver}
              handleOpenModal={handleOpenDriver}
            /> : null}
            {dashcard.id === 3 ?  
            <DumpsterModal
              openModal={openDriver}
              handleCloseModal={handleCloseDriver}
              handleOpenModal={handleOpenDriver}
            /> : null}
            {dashcard.id === 4 ?  
            <CollectionsModal
              openModal={openDriver}
              handleCloseModal={handleCloseDriver}
              handleOpenModal={handleOpenDriver}
            /> : null}

           
           
        </div>
    );
}
export default DashboardCard