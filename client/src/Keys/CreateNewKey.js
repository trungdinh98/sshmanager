import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import './CreateNewKey.css';

function CreateNewKey(props) {
  return (
    <Modal style={{float: 'none'}} {...props} size="small" centered>
        <Modal.Header closeButton>
            <Modal.Title>Genaral Config</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h4>Centered Modal</h4>
            <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
            </p>
        </Modal.Body>
        <Modal.Footer> 
            <Button>Cancel</Button>
            <Button>Create</Button>
        </Modal.Footer>
    </Modal>
  );
}

export default CreateNewKey;
