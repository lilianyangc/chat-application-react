import React from 'react';
import axios from "axios";
import {Table} from 'react-bootstrap';
import Moment from 'react-moment';
class ChatHistory extends React.Component {
    state = { 
        chats: []
    };

    componentDidMount(){
        
        axios.get('http://chat-masters.herokuapp.com/api/history',
        {headers:{'content-type': 'application/json'}
        }).then(res => {
            console.log(res.data)
            console.log(res.data)
            this.setState({
                chats: res.data
            });
        });

    };

    render() { 
        return (
            <>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Username</th>
                    <th>Message</th>
                    <th>Room</th>
                    <th>Date</th>
                    <th>Time</th>
                </tr>
                </thead>
                <tbody>
                {this.state.chats.map((chat,i) => 
            // <li key={i}> ID: {i}- {chat.username}:  {chat.message} &nbsp;&nbsp;</li>)}
                <tr key={i}>
                    <td>{i}</td>
                    <td>{chat.username}</td>
                    <td>{chat.message}</td>
                    <td>{chat.roomname}</td>
                    <td><Moment format="YYYY/MM/DD" date={chat.date}/></td>
                    <td><Moment format="h:mm:ss a" date={chat.date}/></td>
                </tr>)}
                </tbody>
            </Table>
        </>);
    }
}


export default ChatHistory;