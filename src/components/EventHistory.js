import React, {useState,useEffect} from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import Moment from 'react-moment';

export default function EventHistory() {
    const [logs, setLogs] = useState([]);
    const [load, setLoad] = useState(false);
    // const [error, setError] = useState('');

    useEffect(() => {
        axios.get('http://chat-masters.herokuapp.com/api/eventlog')
            .then(res => {
                console.log(res.data[0])
                setLogs({
                    cols: [{ title: 'Type', field: 'type'},
                    { title: 'Date', field: 'date',
                    render: rowData => <Moment format="YYYY/MM/DD" date={rowData.date}/>
                },
                    { title: 'Time', field: 'date',
                    render: rowData => <Moment format="h:mm:ss a" date={rowData.date}/>
                },
                    { title: 'User', field: 'username'},
                    { title: 'EventID', field: 'socket'}, //Socket Id
                    { title: 'PPID', field: '_id'}
                    ],
                    data: res.data});
            
                setLoad(true);
            })
            .catch(err => {
                console.log(err.message);
                setLoad(true);
            })
    }, []);


    if (load) {
        return (
            <>
            <MaterialTable
            title="Log History"
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