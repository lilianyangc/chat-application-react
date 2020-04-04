import React from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AddRoom from './AddRoom';
import EditRoom from './EditRoom';
import DeleteRoom from './DeleteRoom';


class Rooms extends React.Component {
    state = {
        rooms: [],
    }

    componentDidMount(){
    this.handleSetState();
    }
	
	editRoom(room){
		console.log(room._id)
	}

	addNewRoom(){
		console.log('add new room')
  }

  handleSetState = () => {
    axios.get('http://chat-masters.herokuapp.com/api/rooms',
    {headers:{'content-type': 'application/json'}
    }).then(res => {
        console.log(res.data)
        this.setState({
            rooms: res.data
        });
    });
  }

    render() { 
        return ( 
			<>
			<AddRoom refreshList={this.refreshList} handleSetState={this.handleSetState} />
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Room</TableCell>
                <TableCell align="right">Created Date</TableCell>
                <TableCell align="right">Last Edited</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.rooms.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">{index+1}</TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right"><Moment format="(h:mm:ss a) YYYY/MM/DD" date={row.date}/></TableCell>
                  <TableCell align="right"><Moment format="(h:mm:ss a) YYYY/MM/DD" date={row.lastEdit}/></TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                  <TableCell align="right"><EditRoom room={row} handleSetState={this.handleSetState}/><DeleteRoom handleSetState={this.handleSetState} room={row}/></TableCell>
                  {/* <TableCell align="right"><Button variant="contained" color="primary" onClick={this.editRoom.bind(this,row)}>Edit</Button></TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
			</>


        );
    }
}
 
export default Rooms;


{/* <Table striped bordered hover>
<thead>
<tr>
    <th>Id</th>
    <th>Room</th>
    <th>Created Date</th>
    <th>Status</th>
    <th>Action</th>
</tr>
</thead>
<tbody>
{this.state.rooms.map((room,i) => 
// <li key={i}> ID: {i}- {chat.username}:  {chat.message} &nbsp;&nbsp;</li>)}
<tr key={i}>
    <td>{i+1}</td>
    <td>{room.name}</td>
    <td><Moment format="YYYY/MM/DD" date={room.date}/></td>
    <td>{room.status}</td>
    <td><Button variant="contained" color="primary">Edit</Button></td>
</tr>)}
</tbody>
</Table> */}