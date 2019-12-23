import React from 'react'
import { Terminal } from 'xterm'
import io from 'socket.io-client'
import 'xterm/css/xterm.css'


class LogTerm extends React.Component{
	constructor(){
		super();
		this.state = {
			delaySpeed: 1,
			speed: 1
		}
	}


	componentDidMount(){
		const term = new Terminal({
			fontSize: 16
		})
		const socket = io.connect("127.0.0.1:9000");
		// const socket = io.connect("192.168.1.171:9000");

		let url = new URL(window.location.href);
        let log_name = url.searchParams.get("log_name");
		let project_id = url.searchParams.get("project_id");
		socket.emit("replayLog", project_id, log_name);
		term.open(this.termElm)

		socket.on('connect', function () {
            // Backend -> Browser
            socket.on('replayLog', function (data) {

				let commands = JSON.parse("[" + data + "]")
				let firtTimeStamp = commands[0].time;
				let lastTimeStamp = commands[commands.length - 1].time

				let tmp = firtTimeStamp;

				commands.forEach(async element => {
					function sleep(ms) {
						return new Promise(resolve => setTimeout(resolve, ms));
					}
					while(tmp < element.time){
						let time = element.time - tmp
						console.log(time)
						await sleep(time)
						tmp = element.time
						term.write(element.value.replace(/\r/g, '\n\r'));
					}
					
				});

            });
        
            socket.on('disconnect', function () {
                term.write('\r\n*** END ***\r\n');
            });
        });

	}
	delaySpeed(thisTime, needTime, speed){
		setTimeout(() => {
			thisTime ++;
			if(thisTime >= needTime){
				return;
			}
		}, speed)
	}
	setSpeed(value) {
		this.setState({speed: value});
	}
	render(){
		return(
		<div>
			<div id="terminal" style={{margin:"0px",height:"100%",width:"100%",overflowY:"hidden"}}></div>
			{/* <div>
				<input 
					id="typeinp" 
					type="range" 
					min="0.5" max="3" 
					value={this.state.speed} 
					onChange={(e) => {this.setSpeed(e.target.value)}}
					step="0.25"/>
				<p class="value">{ this.state.speed }</p>
			</div> */}
		</div>
		)
	}
}

export default LogTerm
