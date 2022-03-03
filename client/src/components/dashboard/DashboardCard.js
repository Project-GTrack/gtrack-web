import React, { useState, useEffect } from 'react'
import { Card,CardHeader,CardContent,Typography} from "@mui/material"; 
import DriversModal from "./modals/DriversModal";
import TrucksModal from "./modals/TrucksModal";
import CollectionsModal from "./modals/CollectionsModal";
import DumpsterModal from "./modals/DumpstersModal";
import Axios from "axios";

function DashboardCard(props){
    const [openModal, setOpenModal] = React.useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const [driver, setDriver] = useState([]);
    const [truck, setTruck] = useState([]);
    const [collection, setCollection] = useState([]);
    const [dumpster, setDumpster] = useState([]);

    const {drivers, trucks, collections,dumpsters} = props.data;
  
    useEffect(()=>{
      setDriver(drivers);
      setTruck(trucks);
      setDumpster(dumpsters);
      setCollection(collections);
    },[props.data]);

 

    return(
    
        <div>
            <Card onClick={handleOpenModal} elevation={1}>
              <div style={{height: "8vh"}}>
                <CardHeader title={props.title}/>
              </div>
                
                <CardContent>
                    <Typography  id={props.id}  variant="h5" color="textSecondary">
                        {props.count}
                        {props.icon}
                    </Typography>
                </CardContent>
            </Card>
            { driver && props.id === 1 ?  
            <DriversModal
              data = {driver}
              openModal={openModal}
              handleCloseModal={handleCloseModal}
              handleOpenModal={handleOpenModal}
            /> : null}
            {truck && props.id === 2 ?  
            <TrucksModal
              data = {truck}
              openModal={openModal}
              handleCloseModal={handleCloseModal}
              handleOpenModal={handleOpenModal}
            /> : null}
            {dumpster && props.id === 3 ?  
            <DumpsterModal
              data = {dumpster}
              openModal={openModal}
              handleCloseModal={handleCloseModal}
              handleOpenModal={handleOpenModal}
            /> : null}
            {collection && props.id === 4 ?  
            <CollectionsModal
              data = {collection}
              openModal={openModal}
              handleCloseModal={handleCloseModal}
              handleOpenModal={handleOpenModal}
            /> : null}

           
           
        </div>
    );
}
export default DashboardCard