import React, {useState, useEffect} from 'react';
import axios from "axios";
import MaterialTable from 'material-table';
import Moment from 'react-moment';

export default function ChatHistory() {
    const [logs, setLogs] = useState([]);
    const [load, setLoad] = useState(false);
    // const [error, setError] = useState('');

    useEffect(() => {
        axios.get('https://chat-masters.herokuapp.com/api/history')
            .then(res => {
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
                pageSize: 7,
                pageSizeOptions: [7, 10, 15, 20, 30 ,50, 75, 100 ],
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