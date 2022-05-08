/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import PageLayout from './PageLayout'
import Firebase from '../components/helpers/Firebase';
import ReactMapboxGl, { Marker} from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import DumpsterPopup from '../components/DumpsterPopup';
import CollectorPopup from '../components/CollectorPopup';
import CollectionAlertDialog from '../components/CollectionAlertDialog';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Helmet } from 'react-helmet';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN;
const Map = ReactMapboxGl({
    accessToken:process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN
});
const coordinatesGeocoder = function (query) {
    // Match anything which looks like
    // decimal degrees coordinate pair.
    const matches = query.match(
    /^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i
    );
    if (!matches) {
    return null;
    }
     
    function coordinateFeature(lng, lat) {
    return {
    center: [lng, lat],
    geometry: {
    type: 'Point',
    coordinates: [lng, lat]
    },
    place_name: 'Lat: ' + lat + ' Lng: ' + lng,
    place_type: ['coordinate'],
    properties: {},
    type: 'Feature'
    };
    }
     
    const coord1 = Number(matches[1]);
    const coord2 = Number(matches[2]);
    const geocodes = [];
     
    if (coord1 < -90 || coord1 > 90) {
    // must be lng, lat
    geocodes.push(coordinateFeature(coord1, coord2));
    }
     
    if (coord2 < -90 || coord2 > 90) {
    // must be lat, lng
    geocodes.push(coordinateFeature(coord2, coord1));
    }
     
    if (geocodes.length === 0) {
    // else could be either lng, lat or lat, lng
    geocodes.push(coordinateFeature(coord1, coord2));
    geocodes.push(coordinateFeature(coord2, coord1));
    }
     
    return geocodes;
};
const geocoder = new MapboxGeocoder({
    accessToken: process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN,
    mapboxgl: mapboxgl,
    localGeocoder:coordinatesGeocoder,
    placeholder:"Places or (Lat,Lng)"
});
const database=Firebase.database();
const TrackCollectorPage = () => {
    const [openMenu, setOpenMenu] = React.useState(false);
    const [filter, setFilter] = React.useState("All");
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpenMenu((prevOpen) => !prevOpen);
    };

    const handleClose = (event,data) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpenMenu(false);
        setFilter(data);
    };

    function handleListKeyDown(event) {
        console.log("SAmple")
        if (event.key === 'Tab') {
        event.preventDefault();
        setOpenMenu(false);
        } else if (event.key === 'Escape') {
        setOpenMenu(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(openMenu);
    React.useEffect(() => {
        if (prevOpen.current === true && openMenu === false) {
        anchorRef.current.focus();
        }

        prevOpen.current = openMenu;
    }, [openMenu]);
    const [open,setOpen]=useState(false);
    const [position,setPosition]=useState([0,0]);
    const [collectorPopup,setCollectorPopup]=useState({
        isOpen:false,
        data:null
    });
    const [dumpsterPopup,setDumpsterPopup]=useState({
        isOpen:false,
        data:null
    });
    const [drivers,setDrivers]=useState([]);
    const [dumpsters,setDumpsters]=useState([]);
    const getFirebaseDrivers = () => {
        database.ref(`Drivers/`).on('value', function (snapshot) {
            if(snapshot.val()){
                var snap=snapshot.val();
                var temp=Object.keys(snap).map((key) => snap[key]);
                setDrivers([...temp]);
            }else{
                setOpen(true);
                setDrivers([]);
            }
        });
     }
     const getFirebaseDumpsters = () => {
        database.ref(`Dumpsters/`).on('value', function (snapshot) {
            if(snapshot.val()){
                var snap=snapshot.val();
                var temp=Object.keys(snap).map((key) => snap[key]);
                setDumpsters([...temp]);
            }else{
                setDumpsters([]);
            }
        });
     }
    // const [user,setUser]=useState(null);
    const navigate = useNavigate();
    useEffect(() => {
      if(!Cookies.get('user_id')){
        navigate("/login");
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    useEffect(() => {
        getFirebaseDrivers();
        getFirebaseDumpsters();
        navigator.geolocation.getCurrentPosition(function(position) {
            setPosition([position.coords.longitude,position.coords.latitude])
        });
    }, []);
    const handleCollectorPopup=(data)=>{
        setCollectorPopup({isOpen: true,data:data });
    }
    const handleDumpsterPopup=(data)=>{
        setDumpsterPopup({isOpen: true,data:data });
    }
    return (
        <PageLayout headerTitle={"Track Collection"}>
            <Helmet>
                <title>GTrack | Track Collection</title>
            </Helmet>
            <div style={{ height: '100vh'}}>
                    <Map
                    className='mapboxgl-map'
                        // eslint-disable-next-line react/style-prop-object
                        style="mapbox://styles/mapbox/streets-v9"
                        containerStyle={{
                            height: '100%'
                        }}
                        onData={(map)=>{
                            map.resize();
                        }}
                        onStyleLoad={(map,e)=>{
                            map.addControl(geocoder)
                            map.addControl(new mapboxgl.GeolocateControl({
                                trackUserLocation: true,
                                showUserHeading: true,
                            }))
                            map.addControl(new mapboxgl.NavigationControl())
                        }}
                        center={position}
                    >
                        {(filter=="All"||filter=="Collectors Only")?
                        (drivers && drivers.map((value,i)=>{
                            return <Marker
                                    style={{cursor:'pointer'}}
                                    key={i}
                                    coordinates={[value.longitude, value.latitude]}
                                    anchor="bottom">
                                        <div onClick={()=>handleCollectorPopup(value)}>
                                            <img src={'/images/collector_marker_icon.png'} width={50} height={50} alt="Collector Icon" />
                                        </div>
                                    </Marker>
                        })):(<></>)}
                        {(filter=="All"||filter=="Dumpsters Only")?
                        (dumpsters && dumpsters.map((value,i)=>{
                            return <Marker
                                    style={{cursor:'pointer'}}
                                    key={i}
                                    coordinates={[value.longitude, value.latitude]}
                                    anchor="bottom">
                                        <div onClick={()=>handleDumpsterPopup(value)}>
                                            <img width={50} height={50} src={value.complete!==1?'/images/dumpster_marker_icon.png':'/images/dumpster_complete_icon.png'} alt="Marker Icon" />
                                        </div>
                                    </Marker>
                        })):(<></>)}
                        {collectorPopup.isOpen && <CollectorPopup data={collectorPopup} setData={setCollectorPopup}/>}
                        {dumpsterPopup.isOpen && <DumpsterPopup data={dumpsterPopup} setData={setDumpsterPopup}/>}
                    </Map>
                    <Button
                        sx={{position:"absolute",top:110,left:280}}
                        variant="contained"
                        color="success"
                        ref={anchorRef}
                        id="composition-button"
                        aria-controls={openMenu ? 'composition-menu' : undefined}
                        aria-expanded={openMenu ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        endIcon={<ArrowDropDownIcon/>}
                    >
                        Filter: {filter}
                    </Button>
                    <Popper
                    open={openMenu}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    transition
                    disablePortal
                    >
                    {({ TransitionProps, placement }) => (
                        <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                            placement === 'bottom-start' ? 'left top' : 'left bottom',
                        }}
                        >
                        <Paper>
                            <ClickAwayListener onClickAway={(e)=>handleClose(e,"All")}>
                            <MenuList
                                autoFocusItem={openMenu}
                                id="composition-menu"
                                aria-labelledby="composition-button"
                                onKeyDown={handleListKeyDown}
                            >
                                <MenuItem onClick={(e)=>handleClose(e,"All")}>All</MenuItem>
                                <MenuItem onClick={(e)=>handleClose(e,"Dumpsters Only")}>Dumpsters Only</MenuItem>
                                <MenuItem onClick={(e)=>handleClose(e,"Collectors Only")}>Collectors Only</MenuItem>
                            </MenuList>
                            </ClickAwayListener>
                        </Paper>
                        </Grow>
                    )}
                    </Popper>
                <CollectionAlertDialog open={open} setOpen={setOpen}/>
            </div>
        </PageLayout>
    )
}

export default TrackCollectorPage
