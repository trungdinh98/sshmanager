import React from "react";
import api from "../api";
import { Redirect } from "react-router";
import jwt_decode from 'jwt-decode';
import './Projects.css';
import NewProject from './CreateNewProject';

export const createProject = project => {
    return api
    .post('/projects', {
        project_name: project.project_name,
        user_id: project.user_id
    })
    .then((response) => {
        this.getProjects(this.state.user_id);
        Projects.close();
    })
    .catch((err) => {
        console.log(err);
    })
}

class Projects extends React.Component{
    constructor() {
        super();
        this.state = {
            projects: [],
            user_id: '',
            modalShow: false
        }
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this._isMounted = false;
    }

    componentDidMount () {
        const token = localStorage.usertoken;
        if (token === undefined) {
            this.props.history.push(`/login`)
        } else {
            const decode = jwt_decode(token);
            this.setState({
                user_id: decode.user_id
            });
            this.getProjects(decode.user_id);
        }
    }

    async getProjects(user_id){
        await api.get('/projects', {
            params: {
                user_id: user_id
            }
        })
        .then((response) => {
            this.setState({projects:response.data});
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
            this.getProjects(this.state.user_id);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    removeProject(project_id){
        api.delete('/projects', {
            params: {
                project_id: project_id
            }
        })
        .then((response) => {
            this.getProjects(this.state.user_id)
        })
        .catch((err) => {
            console.log(err);
        })
    }

    redirectToUser = (project_id) => {
        console.log(project_id);
        this.setState({redirect : true, project_id: project_id})
    }

    close() {
        this.setState({ modalShow: false });
    }

    open() {
        this.setState({ modalShow: true });
    }

    componentWillUnmount () {
        this._isMounted = false;
    }

    renderTableData(){
        return this.state.projects.map((project, index) => {
            return (
                <tr key={project.project_id}>
                    <td>{project.project_id}</td>
                    <td>{project.project_name}</td>
                    <td>{new Date(project.project_created_at).toLocaleString()}</td>
                    <td><button className="delete-project" onClick={() => {this.removeProject(project.project_id)}}>Delete</button></td>
                    <td><button className="show-project" onClick={() => this.redirectToUser(project.project_id)}>Show</button></td>
                </tr>
            )
        })
    }

    render(){
        const {redirect, project_id} = this.state;
        let {projects, modalShow} = this.state
        return (
            <div style={{width: '-webkit-fill-available'}}>
                <div className="top-content">
                    <input className="project-search" type="text" placeholder="Find by project ID or project name" />
                    <button className="new-project" onClick = {this.open}>New Project</button>
                </div>
                <div className="bot-content">
                    <table className="project-table">
                        <thead>
                            <tr>
                                <th className="project-id">Project ID</th>
                                <th className="project-name">Project Name</th>
                                <th className="project-time">Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTableData()}
                        </tbody>
                    </table>
                </div>
                <NewProject userid={this.state.user_id} show={modalShow} onHide={this.close}/>
                    {redirect && (<Redirect to={{ pathname: '/projectusers/', state: {project_id}}}/>)}
            </div>
        )
    }
}

export default Projects
