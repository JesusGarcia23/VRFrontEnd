import React, { Component } from 'react';
import io from 'socket.io-client'

var socket
class Header extends Component {

    constructor() {
        super()
        this.state = {
            endpoint: `https://trishare.herokuapp.com`
        }
        socket = io(this.state.endpoint)
    }

    render() {
        return (
            null
        );
    }
}

export { Header, socket };