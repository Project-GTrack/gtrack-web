import React from 'react'
import PageLayout from './PageLayout'
import GoogleMapReact from 'google-map-react';
const TrackCollectorPage = () => {
    const AnyReactComponent = ({ text }) => <div>{text}</div>;
    const defaultProps = {
        center: {
          lat: 10.99835602,
          lng: 77.01502627
        },
        zoom: 11
    };
    const controlButtonDiv = document.createElement('button');
    controlButtonDiv.style.cursor = 'pointer';
    controlButtonDiv.setAttribute('class','btn btn-light rounded mx-2 mt-2')
    controlButtonDiv.innerHTML='<i class="fa fa-location-arrow" aria-hidden="true"></i>'
    const handleOnLoad = map => {
        map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(controlButtonDiv);
    };

    return (
        <PageLayout headerTitle={"Track Collector"}>
            <div style={{ height: '80vh', width: '100%' }}>
                <GoogleMapReact
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => handleOnLoad(map, maps)}
                >
                    <AnyReactComponent
                        lat={10.99835602}
                        lng={77.01502627}
                        text="My Marker"
                    />
                </GoogleMapReact>
            </div>
        </PageLayout>
    )
}

export default TrackCollectorPage
