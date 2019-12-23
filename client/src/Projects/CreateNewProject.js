import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { createProject } from './Projects'

class CreateNewProject extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            project_name: ""
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault()

        const project = {
            project_name: this.state.project_name,
            user_id: this.props.userid
        }

        createProject(project).then(response => {
            return this.props.onHide;
        })
    }

    render(){
        return(
            <Modal {...this.props} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Genaral Config</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Label>Project Name</Form.Label>
                        <InputGroup>
                          <Form.Control
                            name="project_name"
                            placeholder="Name"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={this.state.project_name}
                            onChange={this.onChange}
                          />
                        </InputGroup>
                        <Form.Text className="text-muted mb-3">
                            Name of your new project can edit late
                        </Form.Text>
                    </Form>
                </Modal.Body>
                <Modal.Footer> 
                    <Button onClick={this.props.onHide} variant="secondary">Cancel</Button>
                    <Button variant="primary" onClick={this.onSubmit}>Create</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default CreateNewProject
