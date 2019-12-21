import React from "react";
import api from "../api";
import { Redirect } from "react-router";


class Projects extends React.Component{
    constructor(){
		
		super();
		this.state = {
			projects: []
		}
	}

	componentDidMount(){
		this.getProjects(1001)
    }

    async getProjects(user_id){
        await api.get('/projects', {
            params: {
                user_id: user_id
            }
        })
        .then((response) => {
			this.setState({projects:response.data});
			console.log(response);
			console.log(this.state.projects);
		})
		.catch((err) => {
			console.log(err);
		})
    }

    addProject(project_name, user_id){
        api.post('/projects', {
            project_name: project_name,
            user_id: user_id
        })
        .then((response) => {
            console.log(response);
            this.getProjects(1001);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    removeProject(project_id){
        api.delete('projects', {
            params: {
                project_id: project_id
            }
        })
        .then((response) => {
            console.log(response)
            this.getProjects(1001)
        })
        .catch((err) => {
            console.log(err);
        })
    }

    apiDelete = (project_id) => {
        this.removeProject(project_id);
    }

    padWithZeros(number){
		var my_string = '' + number;
		while(my_string.length < 11){
			my_string = '0' + my_string;
		}
		return my_string;
	}

    redirectToUser = (project_id) => {
        console.log(project_id);
        this.setState({redirect : true, project_id: project_id})
    }

    renderTableData(){
        return this.state.projects.map((project, index) => {
            return (
                <tr key={project.project_id}>
                    <td align="center">{this.padWithZeros(project.project_id)}</td>
                    <td align="left">{project.project_name}</td>
                    <td align="center">{new Date(project.project_created_at).toLocaleString()}</td>
                    <td align="center"><button onClick={() => {this.removeProject(project.project_id)}}>Delete</button></td>
                    <td align="center"><button onClick={() => this.redirectToUser(project.project_id)}>Show</button></td>
                </tr>
            )
        })
    }
    
    apiPostTest = () => {
		console.log("Post test");
		this.addProject("project x", 1001);

	}


    render(){
        const {redirect, project_id} = this.state;
        console.log(project_id)
        return (
            <div>
                <h3>Projects</h3>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th><div>ID</div></th>
                                <th><div>Project</div></th>
                                <th><div>Created At</div></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTableData()}
                        </tbody>
                    </table>
                </div>
                <div>
                    <button onClick = {this.apiPostTest}>Post test</button>
                </div>
                <div>
                    <button onClick = {this.apiDeleteTest}>Delete test</button>
                </div>
                {redirect && (<Redirect to={{
                    pathname: '/projectusers/',
                    state: {project_id}}}/>)}
            </div>
        )  
    }
}

export default Projects
