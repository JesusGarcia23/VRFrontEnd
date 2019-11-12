
import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';


class Maps extends Component {
    state = {
        showInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        currentLatLng: {
            lat: 0,
            lng: 0
        }
    }


    componentDidMount() {
        this.getGeoLocation()
    }

    onMarkerClick = async (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

    onMapClick = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    }




    getGeoLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    console.log(position.coords);
                    this.setState(prevState => ({
                        currentLatLng: {
                            ...prevState.currentLatLng,
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    }))
                }
            )
        }
    }






    render() {
        const style = {
            width: '50vw',
            height: '75vh',
            'marginLeft': 'auto',
            'marginRight': 'auto'
        }


        return (

            <Map
                item
                style={style}
                xs={12}
                google={this.props.google}
                zoom={14}
                onClick={this.onMapClick}
                // defaultCenter={{ lat: this.currentLocation.lat, lng: this.currentLocation.lng }}
                initialCenter={{ lat: 39.648209, lng: -75.711185 }}
            // initialCenter={{ lat: this.state.location.latitude, lng: this.state.location.longitude }}
            >
                <Marker
                    onClick={this.onMarkerClick}
                    title={'Changing Colors Garage'}
                    position={{ lat: 39.648209, lng: -75.711185 }}
                    name={'Changing Colors Garage'}
                />

                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                ></InfoWindow>
            </Map>
        )
    }
}

export default GoogleApiWrapper({
    // api: ('AIzaSyDnSL1sGb9p0n57aHA5vawaGEkEk2IYKZU')
    apiKey: ("AIzaSyDnSL1sGb9p0n57aHA5vawaGEkEk2IYKZU")
})(Maps)
