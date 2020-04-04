import React, { useState } from "react";
import {Modal,Form} from "react-bootstrap";
import axios from "axios";
import Fab from '@material-ui/core/Fab';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';


function DeleteRoom(props) {
  const [show, setShow] = useState(false);
  const [roomName] = useState(props.room.name);
  const [roomStatus] = useState(props.room.status);
  const [roomId,setRoomId] = useState(props.room._id);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [open, setOpen] = React.useState(false);


  const handleOpenSnackbar = () => {
    setOpen(true);
  };

  const handleCloseSnackbar = async (event, reason) => {
    if (reason === 'autoHideDuration') { 
      return; }
      props.handleSetState();
      setOpen(false);

  };

  const deleteRoom = () => {

    //send post request to create room
    axios
      .delete(`http://chat-masters.herokuapp.com/api/delete-room/${roomId}`)
      .then(res => {
        console.log(res);
        handleOpenSnackbar()
        handleClose();
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
              <Form.Control type="text" value={roomName} readOnly required/>
            </Form.Group>
            <Form.Group controlId="roomStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control type="text" value={roomStatus} readOnly/>
            </Form.Group>
          <Modal.Footer>
                <Fab variant="contained" onClick={handleClose}>Cancel</Fab>
                <Fab variant="contained" id="deleteBtn" onClick={deleteRoom}>Delete</Fab>
          </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      <Snackbar autoHideDuration={3000} open={open} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
          Room was deleted!
        </Alert>
      </Snackbar>
    </>
  );
}

export default DeleteRoom;
