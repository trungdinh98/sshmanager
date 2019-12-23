import React from 'react';
import { Terminal } from 'xterm';
import io from 'socket.io-client';
import 'xterm/css/xterm.css';

class Xterm extends React.Component{
	componentDidMount(){
        const token = localStorage.usertoken;
        if (token === undefined) {
            this.props.history.push(`/login`)
        } else {
    		const term = new Terminal({
    			fontSize: 16
    		})
    		const socket = io.connect("127.0.0.1:9000");
    		// const socket = io.connect("192.168.1.171:9000");

    		let url = new URL(window.location.href);
    		let resource_id = url.searchParams.get("resource_id");
    		console.log(resource_id);
    		socket.emit("setupConnection", resource_id);
    		term.open(this.termElm)

    		socket.on('connect', function () {
                // Browser -> Backend
                term.onKey(e => {
                    socket.emit("data", e.key);
                });
            
                // Backend -> Browser
                socket.on('return', function (data) {
                    term.write(data.replace(/\r/g, '\n\r'));
                });
            
                socket.on('disconnect', function () {
                    term.write('\r\n*** Disconnected from backend***\r\n');
                });
            });
        }
	}
  
	render(){
		return(
		<div id="terminal" style={{margin:"0px",height:"100%",width:"100%",overflowY:"hidden"}}></div>
		)
	}
}

export default Xterm
