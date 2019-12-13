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

    renderTable(){
		let projects = this.state.projects;
		let render = ``;
		if(projects == undefined){
			render = "";
		}
		else{
			projects.forEach(project => {
				render += `
					<tr>
						<td></td>
						<td align="center">${project.project_id}</td>
						<td align="left">${project.project_name}</td>
						<td align="center">${project.project_created_at}</td>
					</tr>
				`
			})
		}
		

		return(
			<div>
				<table>
					<thead>
						<tr>
							<th></th>
							<th><div>ID</div></th>
							<th><div>Name</div></th>
							<th><div>Created At</div></th>
							<th></th>
						</tr>
					</thead>
					<tbody dangerouslySetInnerHTML={{__html: render}}>
						
					</tbody>
				</table>
			</div>
		)
		
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
                    {this.renderTable()}
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