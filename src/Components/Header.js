import React, { Component } from 'react';
import io from 'socket.io-client'

var socket
class Header extends Component {

    constructor() {
        super()
        this.state = {
            endpoint: 'http://localhost:5000'
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