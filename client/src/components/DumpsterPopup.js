import React from 'react'
import {Popup } from 'react-mapbox-gl';
import Stack from '@mui/material/Stack';

const DumpsterPopup = ({data,setData}) => {
    return (
        <Popup
            style={{cursor:'pointer'}}
            coordinates={[data.data.longitude, data.data.latitude]}
            onClick={()=>setData((prevState) => ({ ...prevState, isOpen: false }))}
            offset={{
                'bottom-left': [12, -38],  'bottom': [0, -38], 'bottom-right': [-12, -38]
            }}
        >
            <span>PICK-UP POINTS:</span>
            <Stack direction="row" spacing={2}>
                <span className='text-success'><i className="fa fa-map-signs" aria-hidden="true"></i></span>
                <span>{data.data.landmark}</span>
            </Stack>
            <Stack direction="row" spacing={2}>
                <span className='text-success'><i className="fa fa-info-circle" aria-hidden="true"></i></span>
                <span>{data.data.purok+" "+data.data.street + " " + data.data.barangay}</span>
            </Stack>
        </Popup>
    );
}

export default DumpsterPopup;