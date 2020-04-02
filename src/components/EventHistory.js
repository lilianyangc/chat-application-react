import React, {useState,useEffect} from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';

export default function EventHistory() {
    const [logs, setLogs] = useState([]);
    const [load, setLoad] = useState(false);
    const [error, setError] = useState('');

    // const [state, setState] = React.useState({

    //     columns: [
    //     { title: 'Name', field: 'name' },
    //     { title: 'Surname', field: 'surname' },
    //     { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
    //     {
    //         title: 'Birth Place',
    //         field: 'birthCity',
    //         lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
    //     },
    //     ],
    //     data: [
    //     { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
    //     {
    //         name: 'Zerya Betül',
    //         surname: 'Baran',
    //         birthYear: 2017,
    //         birthCity: 34,
    //     },
    //     ],
        
    // });

    useEffect(() => {
        axios.get('http://chat-masters.herokuapp.com/api/eventlog')
            .then(res => {
                setLogs({
                    cols: [{ title: 'Type', field: 'type'}],
                    data: res.data});
                // setCols([
                //     { title: 'Type', field: 'type'}
                // ])
                setLoad(true);
            })
            .catch(err => {
                setError(err.message);
                setLoad(true)
            })
    }, []);
   
return (
    <>
    <MaterialTable
    title="Log History"
    columns={logs.cols}
    data={logs.data}
    // editable={{
    //     // onRowAdd: (newData) =>
    //     // new Promise((resolve) => {
    //     //     setTimeout(() => {
    //     //     resolve();
    //     //     setLogs((prevState) => {
    //     //         const data = [...prevState.data];
    //     //         data.push(newData);
    //     //         return { ...prevState, data };
    //     //     });
    //     //     }, 600);
    //     // }),
    //     onRowUpdate: (newData, oldData) =>
    //     new Promise((resolve) => {
    //         setTimeout(() => {
    //         resolve();
    //         if (oldData) {
    //             setLogs((prevState) => {
    //             const data = [...prevState.data];
    //             data[data.indexOf(oldData)] = newData;
    //             return { ...prevState, data };
    //             });
    //         }
    //         }, 600);
    //     }),
    //     // onRowDelete: (oldData) =>
    //     // new Promise((resolve) => {
    //     //     setTimeout(() => {
    //     //     resolve();
    //     //     setLogs((prevState) => {
    //     //         const data = [...prevState.data];
    //     //         data.splice(data.indexOf(oldData), 1);
    //     //         return { ...prevState, data };
    //     //     });
    //     //     }, 600);
    //     // }),
    // }}
    />
    </>
);
}