import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './CreateNewKey.css';

function CreateNewKey(props) {
  return (
    <Modal {...props} size="lg">
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Genaral Config</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Key Name</Form.Label>
                    <Form.Control type="text" placeholder="Name" />
                    <Form.Text className="text-muted">
                        Name of your new key can edit late
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Key Value</Form.Label>
                    <Form.Control type="text" placeholder="Paste key value here or choose a key.pem file" />
                    <Form.Text className="text-muted">
                        Your key value can not edit late
                    </Form.Text>
                    <input className="choose-file" type="file" name="upload" multiple="" />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer> 
            <Button onClick={props.onHide} variant="secondary">Cancel</Button>
            <Button variant="primary">Create</Button>
        </Modal.Footer>
    </Modal>
  );
}

export default CreateNewKey;
