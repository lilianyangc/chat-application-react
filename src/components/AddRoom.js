import React, { useState } from "react";
import {Modal,Form} from "react-bootstrap";
import axios from "axios";
import {Button, Fab} from '@material-ui/core';
import LibraryAddTwoToneIcon from '@material-ui/icons/LibraryAddTwoTone';

function AddRoom() {
  const [show, setShow] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [roomStatus, setRoomStatus] = useState('Active');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChangeRoom = (event) => {
    setRoomName(event.target.value);
  }
  const handleChangeStatus = (event) => {
    setRoomStatus(event.target.value);
  }
  const addRoom = () => {
    //Get Current Date and Time
    var date = Date(Date.now());
    var dateStringify = date.toString();

    //send post request to create room
  axios
      .post(
        "http://chat-masters.herokuapp.com/api/new-room",
        {   
            name: roomName,
            lastEdit: dateStringify,
            status: roomStatus 
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then(res => {
        console.log(res);
        alert('A Room was created!');
        handleClose();
        window.location.reload()
      });
  }
 
  return (
    <>
      <div style={{ width: "10em", margin: "1em", marginTop: "2em" }}>
        <Fab variant="contained" id="addBtn" onClick={handleShow}>
          <LibraryAddTwoToneIcon />&nbsp;Add Room
        </Fab>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="roomName">
              <Form.Label>Room Name</Form.Label>
              <Form.Control onChange={handleChangeRoom} type="text" required />
            </Form.Group>
            <Form.Group controlId="roomStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control  as="select" value={roomStatus} onChange={handleChangeStatus}>
                <option>Active</option>
                <option>Inactive</option>
              </Form.Control>
            </Form.Group>
          <Modal.Footer>
                <Button variant="contained" onClick={handleClose}>Cancel</Button>
                <Button variant="contained" color="primary" onClick={addRoom}>Save</Button>
          </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddRoom;
