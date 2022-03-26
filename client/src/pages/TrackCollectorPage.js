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
        <PageLayout headerTitle={"Track Collector"}>
            <Helmet>
                <title>GTrack | Track Collection</title>
            </Helmet>
            <div style={{ height: '100vh', width: '100%' }}>
                <Map
                    // eslint-disable-next-line react/style-prop-object
                    style="mapbox://styles/mapbox/streets-v9"
                    containerStyle={{
                        height: '100%',
                        width: '100%'
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
                    {drivers && drivers.map((value,i)=>{
                        return <Marker
                                style={{cursor:'pointer'}}
                                key={i}
                                coordinates={[value.longitude, value.latitude]}
                                anchor="bottom">
                                    <div onClick={()=>handleCollectorPopup(value)}>
                                        <img src={'/images/collector_marker_icon.png'} width={50} height={50} alt="Collector Icon" />
                                    </div>
                                </Marker>
                    })}
                    {dumpsters && dumpsters.map((value,i)=>{
                        return <Marker
                                style={{cursor:'pointer'}}
                                key={i}
                                coordinates={[value.longitude, value.latitude]}
                                anchor="bottom">
                                    <div onClick={()=>handleDumpsterPopup(value)}>
                                        <img width={50} height={50} src={value.complete!==1?'/images/dumpster_marker_icon.png':'/images/dumpster_complete_icon.png'} alt="Marker Icon" />
                                    </div>
                                </Marker>
                    })}
                    {collectorPopup.isOpen && <CollectorPopup data={collectorPopup} setData={setCollectorPopup}/>}
                    {dumpsterPopup.isOpen && <DumpsterPopup data={dumpsterPopup} setData={setDumpsterPopup}/>}
                </Map>
                <CollectionAlertDialog open={open} setOpen={setOpen}/>
            </div>
        </PageLayout>
    )
}

export default TrackCollectorPage
