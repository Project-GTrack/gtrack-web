import React from 'react'
import {Popup } from 'react-mapbox-gl';
import Stack from '@mui/material/Stack';

const CollectorPopup = ({data,setData}) => {
    return (
        <Popup
            coordinates={[data.data.longitude, data.data.latitude]}
            style={{cursor:'pointer'}}
            onClick={()=>setData((prevState) => ({ ...prevState, isOpen: false }))}
            offset={{
                'bottom-left': [12, -38],  'bottom': [0, -38], 'bottom-right': [-12, -38]
            }}
        >
            <span>WASTE COLLECTION:</span>
            <Stack direction="row" spacing={2}>
                <span className='text-success'><i className="fa fa-map-signs" aria-hidden="true"></i></span>
                <span>{data.data.landmark}</span>
            </Stack>
            <Stack direction="row" spacing={2}>
                <span className='text-success'><i className="fa fa-info-circle" aria-hidden="true"></i></span>
                <span>{data.data.barangay}</span>
            </Stack>
            <Stack direction="row" spacing={2}>
                <span className='text-success'><i className="fa fa-user" aria-hidden="true"></i></span>
                <span>{data.data.driver_name}</span>
            </Stack>
            <Stack direction="row" spacing={2}>
                <span className='text-success'><i className="fa fa-trash" aria-hidden="true"></i></span>
                <span>{data.data.garbage_type}</span>
            </Stack>
        </Popup>
    );
}

export default CollectorPopup