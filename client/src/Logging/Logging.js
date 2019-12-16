import React from 'react'
import api from '../api'


class Logging extends React.Component{
    constructor(){
        super();
        this.state={
            logs: []
        }
    }

    async getLogs(project_id){
        await api.get('/logs', {
            params: {
                project_id: project_id
            }
        }).then((response) => {
            this.setState({logs:response.data.data})
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
            this.getLogs(project_id)
        })
        .catch((err) => {
            console.log(err);
        })
    }

    render(){
        return
    }
}