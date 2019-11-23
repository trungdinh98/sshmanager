import React, { Component } from 'react';

class App extends Component {

  constructor () {
    super();
    this.state = {
      projects: [],
      project: {
        idProject: '',
        name: ''
      },
      renderProjects: ({idProject, name}) => <div key={idProject}>{idProject} {name}</div>
    };
    this._isMounted = false;

  }

  componentDidMount () {
    this._isMounted = true;
    this.getProjects();
  }

  getProjects () {
    this._isMounted = true;
    fetch('http://localhost:4000/project')
      .then(response => response.json())
      .then(response => {
        if (this._isMounted) {
          this.setState({ projects: response.data })
        }})
      .catch(err => console.error(err))
  }

  addProjects () {
    const { project } = this.state;
    fetch(`http://localhost:4000/project/add?idProject=${project.idProject}&name=${project.name}`)
      .then(this.getProjects)
      .catch(err => console.error(err))
  }

  componentWillUnmount () {
    this._isMounted = false;
  }

  render() {
    const { projects, project } = this.state;
    return (
      <div>
      <h1>List Projects</h1>
        { projects.map(this.state.renderProjects) }
        <div>
          <input placeholder="Project ID" value={this.state.project.idProject} onChange={e => this.setState({ project: { idProject: e.target.value} })}/>
          <input placeholder="Project Name" value={this.state.project.name} onChange={e => this.setState({ project: { name: e.target.value} })}/>
        </div>
        <button onClick={this.addProjects}>Add project</button>
      </div>
    );
  }
}
export default App;
