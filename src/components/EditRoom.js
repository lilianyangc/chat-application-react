import React, { useState } from "react";
import {Modal,Form} from "react-bootstrap";
import axios from "axios";
import Fab from '@material-ui/core/Fab';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';


function EditRoom(props) {
  const [show, setShow] = useState(false);
  const [roomName, setRoomName] = useState(props.room.name);
  const [roomStatus, setRoomStatus] = useState(props.room.status);
  const [roomId, setRoomId] = useState(props.room._id);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [open, setOpen] = React.useState(false);


  const handleOpenSnackbar = () => {
    setOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') { return; }
    setOpen(false);
  };

  const handleChangeRoom = (event) => {
    setRoomName(event.target.value);
  }
  const handleChangeStatus = (event) => {
    setRoomStatus(event.target.value);
  }
 

  const editRoom = () => {
    //Get Current Date and Time
    var date = Date(Date.now());
    var dateStringify = date.toString();

    //send put request to update room
    axios
      .put(`https://chat-masters.herokuapp.com/api/update-room/${roomId}`,
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
        props.handleSetState(); //call parent function to update state
        handleClose(); //close modal
        handleOpenSnackbar(); //show snackbar
      })
      .catch(err => {alert(err)});
  }
 
  return (
    <>
      <Fab variant="contained" id="editBtn" onClick={handleShow}><EditRoundedIcon /></Fab>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="roomName">
              <Form.Label>Room Name</Form.Label>
              <Form.Control onChange={handleChangeRoom} type="text" value={roomName} required />
            </Form.Group>
            <Form.Group controlId="roomStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control  as="select" value={roomStatus} onChange={handleChangeStatus}>
                <option>Active</option>
                <option>Inactive</option>
              </Form.Control>
            </Form.Group>
          <Modal.Footer>
                <Fab variant="contained" onClick={handleClose}>Cancel</Fab>
                <Fab variant="contained" id="addBtn" onClick={editRoom}>Save</Fab>
          </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      <Snackbar autoHideDuration={3000} open={open} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
          Room was updated!
        </Alert>
      </Snackbar>
    </>
  );
}

export default EditRoom;
