import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalC = (props) => {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          ID : {props.contact ? props.contact.id : ""}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Modal C</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalC;
