import React from 'react'
import { Terminal } from 'xterm'
import io from 'socket.io-client'
import 'xterm/css/xterm.css'


class LogTerm extends React.Component{
	componentDidMount(){
		const term = new Terminal({
			fontSize: 18
		})
		const socket = io.connect("127.0.0.1:9000");
		let url = new URL(window.location.href);
        let log_id = url.searchParams.get("log_id");
		let project_id = url.searchParams.get("project_id");
		console.log(log_id);
		socket.emit("getSshLog", log_id);
		term.open(this.termElm)

		socket.on('connect', function () {
            // Backend -> Browser
            socket.on('returnLog', function (data) {
                term.write(data.replace(/\r/g, '\n\r'));
            });
        
            socket.on('disconnect', function () {
                term.write('\r\n*** END ***\r\n');
            });
        });

	}
  
	render(){
		return(
		<div id="terminal" style={{margin:"0px",height:"100%",width:"100%",overflowY:"hidden"}}></div>
		)
	}
}

export default LogTerm
