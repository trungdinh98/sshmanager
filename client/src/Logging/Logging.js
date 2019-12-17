import React from 'react'
import api from '../api'


class Logging extends React.Component{
    constructor(){
        super();
        this.state={
            logs: [],
            project_id: 1001
        }
    }

    componentDidMount(){
        this.getLogs(this.state.project_id)
        console.log(this.state.logs)
    }

    async getLogs(project_id){
        await api.get('/logs', {
            params: {
                project_id: project_id
            }
        }).then((response) => {
            this.setState({logs:response.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    removeLogs(log){
        api.delete('/logs', {
            params: {
                log_name: log
            }
        })
        .then((response) => {
            console.log(response)
            this.getLogs(this.state.project_id)
        })
        .catch((err) => {
            console.log(err);
        })
    }

    replayPopup(url,winName,w,h,scroll) {
		let popupWindow;
 		let LeftPosition = (window.screen.width) ? (window.screen.width-w)/2 : 0;
		let TopPosition = (window.screen.height) ? (window.screen.height-h)/2 : 0;
		let settings =
		'height='+h+',width='+w+',top='+TopPosition+',left='+LeftPosition+',scrollbars='+scroll+',resizable'
		popupWindow = window.open(url,winName,settings)
	}

	replayLog(log_name){
		let url = `http://localhost:3000/logTerm?log_name=${log_name}`;
		this.replayPopup(url,'ssh log replay','730','430','yes')
	}

    padWithZeros(number){
		var my_string = '' + number;
		while(my_string.length < 11){
			my_string = '0' + my_string;
		}
		return my_string;
	}

    renderTableData(){
        return this.state.logs.map((log, index) => {
            return (
                <tr key={log.log_id}>
                    <td></td>
                    <td align="center">{this.padWithZeros(log.log_id)}</td>
                    <td align="left">{log.log_name}</td>
                    <td align="center"><button onClick={() => {this.replayLog(log.log_name)}}>Replay</button></td>
                </tr>
            )
        })
    }

    render(){
        return(
            <div>
                <h3>Logs</h3>
                <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th><div>ID</div></th>
                                <th><div>Name</div></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTableData()}
                        </tbody>
                    </table>
            </div>
        )
    }
}

export default Logging;