import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { createResource } from './Resources'
import jwt_decode from 'jwt-decode';


class CreateNewResource extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            resource_name: "",
            resource_key_id: "",
            resource_dns: "",
            resource_user: ""
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount () {
        const token = localStorage.usertoken;
        const decode = jwt_decode(token);
        this.setState({
            user_id: decode.user_id
        });
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault()

        let resource = {
            resource_name: this.state.resource_name,
            resource_key_id: this.state.resource_key_id,
            resource_dns: this.state.resource_dns,
            resource_user: this.state.resource_user
        }

        createResource(resource).then(response => {
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
                        <Form.Label>Resource Name</Form.Label>
                        <InputGroup>
                          <Form.Control
                            name="resource_name"
                            placeholder="Name"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={this.state.resource_name}
                            onChange={this.onChange}
                          />
                        </InputGroup>
                        <Form.Text className="text-muted mb-3">
                            Name of your new resource can edit late
                        </Form.Text>
                    </Form>

                    <Form>
                        <Form.Label>Resource User</Form.Label>
                        <InputGroup>
                          <Form.Control
                            name="resource_user"
                            placeholder="Ubuntu, Centos,..."
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={this.state.resource_user}
                            onChange={this.onChange}
                          />
                        </InputGroup>
                        <Form.Text className="text-muted mb-3">
                            User of your new resource (cannot change late)
                        </Form.Text>
                    </Form>

                    <Form>
                        <Form.Label>Resource DNS</Form.Label>
                        <InputGroup>
                          <Form.Control
                            name="resource_dns"
                            placeholder="1.1.1.1"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={this.state.resource_dns}
                            onChange={this.onChange}
                          />
                        </InputGroup>
                        <Form.Text className="text-muted mb-3">
                            DNS of your new resource (cannot change late)
                        </Form.Text>
                    </Form>

                    <Form>
                        <Form.Label>Resource Key</Form.Label>
                        <InputGroup>
                          <Form.Control
                            name="resource_key_id"
                            placeholder="key id"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={this.state.resource_key_id}
                            onChange={this.onChange}
                          />
                        </InputGroup>
                        <Form.Text className="text-muted mb-3">
                            Key ID of your new resource (cannot change late)
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

export default CreateNewResource