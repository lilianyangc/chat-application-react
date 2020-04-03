import React, { useState, useEffect } from "react";
import {Modal,Form} from "react-bootstrap";
import axios from "axios";
import Button from '@material-ui/core/Button';
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

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose2 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

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
    // setRoomId(props.room._id);

    //send put request to create room
    axios
      .put(`http://chat-masters.herokuapp.com/api/update-room/${roomId}`,
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
        // alert('Room was updated!');
        // handleClose();
        handleClick();
        window.location.reload()
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
                <Button variant="contained" onClick={handleClose}>Cancel</Button>
                <Button variant="contained" color="primary" onClick={editRoom}>Save</Button>
          </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose2}>
        <Alert onClose={handleClose2} severity="success">
          This is a success message!
        </Alert>
      </Snackbar>
    </>
  );
}

export default EditRoom;
