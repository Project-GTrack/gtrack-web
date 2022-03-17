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
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = 'pk.eyJ1IjoicmpvbGl2ZXJpbyIsImEiOiJja2ZhanZrZnkwajFjMnJwN25mem1tenQ0In0.fpQUiUyn3J0vihGxhYA2PA';
const Map = ReactMapboxGl({
    accessToken:
      'pk.eyJ1IjoicmpvbGl2ZXJpbyIsImEiOiJja2ZhanZrZnkwajFjMnJwN25mem1tenQ0In0.fpQUiUyn3J0vihGxhYA2PA'
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
