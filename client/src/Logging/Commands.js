import React from 'react'
import io from 'socket.io-client'


class Commands extends React.Component{
    constructor(){
        super();
        this.state={
            commands: []
        }
    }

    componentDidMount(){
        let url = new URL(window.location.href);
        let log_name = url.searchParams.get("log_name");
        let project_id = url.searchParams.get("project_id");

        console.log("project id: " + log_name)
        let commands

        const socket = io.connect("127.0.0.1:9000");
        // const socket = io.connect("192.168.1.171:9000");

        socket.emit("getCommands", project_id, log_name)
        
        socket.on('connect', function (){
            socket.on('getCommands', function (data){

                function getTime(unixTime){
                    var today = new Date(unixTime);
                    var date = today.getFullYear() + ':' + (today.getMonth() + 1) + ':' + today.getDate();
                    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                    return date + '-' + time;
                }

                commands = JSON.parse("[" + data + "]")

                commands.forEach(command => {
                    console.log( getTime(command.time) +" " + command.value)
                })

                socket.close()
            })
        })
        // console.log("command: " + commands)

        // this.setState({commands: commands})
        // console.log("state: " + this.state.commands)
        
    }

    renderTableData(){
        return this.state.logs.map((commands, index) => {
            return (
                <tr>
                    <td align="left">{this.state.commands.time}</td>
                    <td align="left">{this.state.commands.value}</td>
                </tr>
            )
        })
    }

    render(){
        return(
            <div>
                <h3>Commands</h3>
                <table>
                        <thead>
                            <tr>
                                <th><div>Time</div></th>
                                <th><div>Value</div></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {this.renderTableData()} */}
                        </tbody>
                    </table>
            </div>
        )
    }
}

export default Commands