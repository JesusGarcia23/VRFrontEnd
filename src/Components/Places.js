
import React from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';

const Maps = (props) => {

    const { images } = props
    const lat = images.lat
    const lng = images.long
    const style = {
        width: '30vw',
        height: '40vh',
        'marginLeft': 'auto',
        'marginRight': 'auto'
    }



    return (
        <div>
            {props.images &&
                <Map
                    style={style}
                    defaultZoom={10}
                    google={props.google}
                    initialCenter={{ lat: lat, lng: lng }}

                />
            }
        </div>
    );
}




// class Maps extends Component {
//     state = {
//         showInfoWindow: false,
//         activeMarker: {},
//         selectedPlace: {},
//         currentLatLng: {
//             lat: 0,
//             lng: 0
//         }
//     }


//     componentDidMount() {
//         this.getGeoLocation()
//     }

//     onMarkerClick = async (props, marker, e) => {
//         this.setState({
//             selectedPlace: props,
//             activeMarker: marker,
//             showingInfoWindow: true
//         });
//     }

//     onMapClick = (props) => {
//         if (this.state.showingInfoWindow) {
//             this.setState({
//                 showingInfoWindow: false,
//                 activeMarker: null
//             });
//         }
//     }




//     getGeoLocation = () => {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(
//                 position => {
//                     console.log(position.coords);
//                     this.setState(prevState => ({
//                         currentLatLng: {
//                             ...prevState.currentLatLng,
//                             lat: position.coords.latitude,
//                             lng: position.coords.longitude
//                         }
//                     }))
//                 }
//             )
//         }
//     }






//     render() {
//         const style = {
//             width: '30vw',
//             height: '25vh',
//             'marginLeft': 'auto',
//             'marginRight': 'auto'
//         }


//         return (

//             <Map
//                 item
//                 style={style}
//                 xs={12}
//                 google={this.props.google}
//                 zoom={14}
//                 onClick={this.onMapClick}
//                 // defaultCenter={{ lat: this.currentLocation.lat, lng: this.currentLocation.lng }}
//                 initialCenter={{ lat: 39.648209, lng: -75.711185 }}
//             // initialCenter={{ lat: this.state.location.latitude, lng: this.state.location.longitude }}
//             >
//                 <Marker
//                     onClick={this.onMarkerClick}
//                     title={'Changing Colors Garage'}
//                     position={{ lat: 39.648209, lng: -75.711185 }}
//                     name={'Changing Colors Garage'}
//                 />

//                 <InfoWindow
//                     marker={this.state.activeMarker}
//                     visible={this.state.showingInfoWindow}
//                 ></InfoWindow>
//             </Map>
//         )
//     }
// }

export default GoogleApiWrapper({
    apiKey: ("AIzaSyDnSL1sGb9p0n57aHA5vawaGEkEk2IYKZU")
})(Maps)
