import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import api from '../api';
import './CreateNewKey.css';

function CreateNewKey(props) {
  return (
    <Modal {...props} size="lg">
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Genaral Config</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Label>Key Name</Form.Label>
                <InputGroup>
                  <Form.Control
                    placeholder="Name"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
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
            <Button onClick={props.onHide} variant="secondary">Cancel</Button>
            <Button variant="primary" onClick={() => createKey(1001, 'KeyTy')}>Create</Button>
        </Modal.Footer>
    </Modal>
  );
}

function createKey (project_id, key_name) {
    api.post('/keys', {
        project_id: project_id,
        key_name: key_name
    })
    .then((response) => {
        console.log(response);
    })
    .catch((err) => {
        console.log(err);
    })
}

export default CreateNewKey;
