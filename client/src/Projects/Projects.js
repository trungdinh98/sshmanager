import React from "react";
import api from "../api";


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
			this.setState({projects:response.data.data});
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
            this.getProjects(user_id);
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
            // this.getResources()
        })
        .catch((err) => {
            console.log(err);
        })
    }

    apiDelete = (project_id) => {
        this.removeProject(project_id);
    }

    renderTableData(){
        return this.state.projects.map((project, index) => {
            return (
                <tr key={project.project_id}>
                    <td></td>
                    <td align="center">{project.project_id}</td>
                    <td align="left">{project.project_name}</td>
                    <td align="center">{project.project_created_at}</td>
                    <td align="center"><button onClick={() => {console.log("Delete")}}>Delete</button></td>
                </tr>
            )
        })
    }
    
    apiPostTest = () => {
		console.log("Post test");
		this.addProject("project x", 1001);

	}


    render(){
        return (
            <div>
                <h3>Projects</h3>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
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
                <div>ct 
                    <button onClick = {this.apiDeleteTest}>Delete test</button>
                </div>
            </div>
        )  
    }
}

export default Projects