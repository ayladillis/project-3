import React, { Component, useRef, useState } from "react";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import './style.css';
import API from '../../utils/API';
import { useChoreContext } from "../../utils/GlobalState";
import refreshUserData from "../../utils/refreshUserData";

function JoinBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useChoreContext()[1];

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  // this will be what we need to do when they click the join button on modal
  const inviteRef = useRef();
  const handleClick = () => {
    API.joinHousehold(inviteRef.current.value)
      .then(() => {
        refreshUserData(dispatch);
        closeModal();
      })
      .catch(err => {
        console.log(err)
      })
  };

  return (
    <>
      <div
        className="modalContainer text-center"
      >
        <Button onClick={openModal} className="arrow-button" >
          <h1><i className="fas fa-arrow-right fa-3x"></i></h1>
        </Button>
      </div>
      <Modal show={isOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Join a New Household</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Household Code"
              aria-label="modal"
              ref={inviteRef}
            />
            {/* <label htmlFor= "namedInput"></label>
              <input id= "namedInput" type = "text" name ="name"/> */}
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          {/* This is the event handler that needs to be changed */}
          <Button variant="primary" onClick={handleClick}>
            Join
            </Button>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
            </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default JoinBtn;