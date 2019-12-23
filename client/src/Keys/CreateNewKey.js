import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import './CreateNewKey.css';
import { createKey } from './Keys';


class CreateNewKey extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            key_value: '',
            key_name: ''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault()

        const key = {
            project_id: this.props.projectid,
            key_name: this.state.key_name,
            key_value: this.state.key_value
        }

        createKey(key).then(response => {
            return this.props.onHide;
        })
    }

    render () {
        return (
            <Modal {...this.props} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Genaral Config</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Label>Key Name</Form.Label>
                        <InputGroup>
                          <Form.Control
                            name="key_name"
                            placeholder="Name"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={this.state.key_name}
                            onChange={this.onChange}
                          />
                        </InputGroup>
                        <Form.Text className="text-muted mb-3">
                            Name of your new key can edit late
                        </Form.Text>
                    </Form>

                    <Form>
                        <Form.Label>Key Value</Form.Label>
                        <InputGroup>
                            <Form.Control
                                name="key_value"
                                value={this.state.key_value}
                                onChange={this.onChange}
                                placeholder="Paste key value here or choose a key.pem file"
                                as="textarea"
                                aria-label="With textarea" />
                        </InputGroup>
                        <Form.Text className="text-muted mb-3">
                            Your key value can not edit late
                        </Form.Text>
                    </Form>
                    <input className="choose-file" type="file" name="upload" multiple="" />
                </Modal.Body>
                <Modal.Footer> 
                    <Button onClick={this.props.onHide} variant="secondary">Cancel</Button>
                    <Button variant="primary" onClick={this.onSubmit}>Create</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default CreateNewKey;
