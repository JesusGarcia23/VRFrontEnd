import React from 'react'
import Geocode from "react-geocode"




const Location = (props) => {

    const { coordinates } = props.images
    console.log(coordinates)


    Geocode.setApiKey('AIzaSyDnSL1sGb9p0n57aHA5vawaGEkEk2IYKZU')
    Geocode.setLanguage('en')


    let item;

    return (
        <div>
            {/* WAITING FOR API TO WORK
            {coordinates &&
                console.log(Geocode.fromLatLng(coordinates.lat, coordinates.long))
                && */}
            <p> Hello World</p>



        </div>
    );

}

export default Location;