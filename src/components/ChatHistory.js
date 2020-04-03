import React, {useState, useEffect} from 'react';
import axios from "axios";
import MaterialTable from 'material-table';
import Moment from 'react-moment';


// class ChatHistory extends React.Component {
//     state = { 
//         chats: []
//     };

//     componentDidMount(){
        
//         axios.get('http://chat-masters.herokuapp.com/api/history',
//         {headers:{'content-type': 'application/json'}
//         }).then(res => {
//             console.log(res.data)
//             this.setState({
//                 chats: res.data
//             });
//         });

//     };

//     render() { 
//         return (
//             <>
//             <Table striped bordered hover>
//                 <thead>
//                 <tr>
//                     <th>Id</th>
//                     <th>Username</th>
//                     <th>Message</th>
//                     <th>Room</th>
//                     <th>Date</th>
//                     <th>Time</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {this.state.chats.map((chat,i) => 
//             // <li key={i}> ID: {i}- {chat.username}:  {chat.message} &nbsp;&nbsp;</li>)}
//                 <tr key={i}>
//                     <td>{i}</td>
//                     <td>{chat.username}</td>
//                     <td>{chat.message}</td>
//                     <td>{chat.roomname}</td>
//                     <td><Moment format="YYYY/MM/DD" date={chat.date}/></td>
//                     <td><Moment format="h:mm:ss a" date={chat.date}/></td>
//                 </tr>)}
//                 </tbody>
//             </Table>
//         </>);
//     }
// }

// export default ChatHistory;

//<th>Id</th>
//                     <th>Username</th>
//                     <th>Message</th>
//                     <th>Room</th>
//                     <th>Date</th>
//                     <th>Time</th>

export default function ChatHistory() {
    const [logs, setLogs] = useState([]);
    const [load, setLoad] = useState(false);
    // const [error, setError] = useState('');

    useEffect(() => {
        axios.get('http://chat-masters.herokuapp.com/api/history')
            .then(res => {
                console.log(res.data[0])
                setLogs({
                    cols: [{ title: 'ID', field: '_id'},
                    { title: 'Message', field: 'message'},
                    { title: 'Username', field: 'username'},
                    { title: 'Time', field: 'date',
                    render: rowData => <Moment format="h:mm:ss a" date={rowData.date}/>
                },
                { title: 'Date', field: 'date',
                render: rowData => <Moment format="YYYY/MM/DD" date={rowData.date}/>
                },
                    
                    ],
                    data: res.data});
            
                setLoad(true);
            })
            .catch(err => {
                console.log(err.message);
                setLoad(true)
            })
    }, []);


    if (load) {
        return (
            <>
            <MaterialTable
            title="Chat History"
            columns={logs.cols}
            data={logs.data}
            options={{
                sorting: true,
                pageSize: 10,
                pageSizeOptions: [5, 10, 15, 20, 30 ,50, 75, 100 ],
                toolbar: true,
                paging: true
            }}
            />
            </>
        );
    } else {
        return (
            <div>
                Loading...
            </div>
        );
    }


}