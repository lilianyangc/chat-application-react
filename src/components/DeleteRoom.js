import React, { useState } from "react";
import {Modal,Form} from "react-bootstrap";
import axios from "axios";
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

function DeleteRoom(props) {
  const [show, setShow] = useState(false);
  const [roomName] = useState(props.room.name);
  const [roomStatus] = useState(props.room.status);
  const [roomId, setRoomId] = useState(props.room._id);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteRoom = () => {

    //send post request to create room
    axios
      .delete(`http://chat-masters.herokuapp.com/api/delete-room/${roomId}`)
      .then(res => {
        console.log(res);
        alert('Room was deleted!');
        handleClose();
        window.location.reload()
      });
  }
  
 
  return (
    <>
      <Fab variant="contained" id="deleteBtn"onClick={handleShow}><DeleteForeverIcon /></Fab>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="roomName">
              <Form.Label>Room Name</Form.Label>
              <Form.Control type="text" value={roomName} readOnly/>
            </Form.Group>
            <Form.Group controlId="roomStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control type="text" value={roomStatus} readOnly/>
            </Form.Group>
          <Modal.Footer>
                <Button variant="contained" onClick={handleClose}>Cancel</Button>
                <Button variant="contained" color="secondary" onClick={deleteRoom}>Delete</Button>
          </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DeleteRoom;
