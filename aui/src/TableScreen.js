import React, { useState, useEffect } from 'react';
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import { forwardRef } from 'react';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import {Box} from "@mui/material";
import MaterialTable from "@material-table/core";
import axios from 'axios';

/**
 * Icons used in  table
 */
const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };


function App() {
  /**
   * Columns used in table
   */
    const columns = [
      { title: "Question", field: "prompt"},
      { title: "Answer", field: "answer", lookup: { 1: "1", 2: "2", 3: "3", 4: "4" } },
      { title: "Choice 1", field: "choice1", },
      { title: "Choice 2", field: "choice2", },
      { title: "Choice 3", field: "choice3"},
      { title: "Choice 4", field: "choice4"},
      { title: "Difficulty", field: "difficulty", lookup: { 1: "1", 2: "2", 3: "3" } },
      { title: "Sub-Quest", field: "subquest_name", lookup: { 'CZ3001 Subquest 1': "CZ3001 Subquest 1", 'CZ3002 Subquest 1' : "CZ3002 Subquest 1"}},
      { title: "points", field: "points", lookup: { 5: "5", 10: "10", 15: "15"} },
    ]

        /**
         * Get data from API
         *  */ 
        const [iserror, setIserror] = useState(false)
        const [errorMessages, setErrorMessages] = useState([])
        const [data, setData] = useState([]); 

        /**
         * creates API request upon rendering of TableScreen component
         */
        useEffect(() => {
            const endpoint = process.env.REACT_APP_API_ENDPOINT === null ? "https://fastapi-ernestang98.cloud.okteto.net/" : process.env.REACT_APP_API_ENDPOINT
           axios.get(endpoint + "question/")
              .then(res => {
                  console.log(res);
                  console.log(res.data);
                  setData(res.data);
               })
               .catch(error=>{
                   console.log("Error")
               })
        }, [])


        /**
         * function that handles adding new row of data
         * @param {String} newData data that user adds
         * @param {String} resolve resolve
         */
        function handleRowAdd(newData, resolve) {
            const endpoint = process.env.REACT_APP_API_ENDPOINT === null ? "https://fastapi-ernestang98.cloud.okteto.net/" : process.env.REACT_APP_API_ENDPOINT
          axios.post(endpoint + "question/", newData)
            .then(res => {
              let dataToAdd = [...data];
              dataToAdd.push(newData);
              setData([...data, newData]);
              setErrorMessages([])
              setIserror(false)
              console.log(res)
            })
            .catch(error => {
              setErrorMessages(["Cannot add data. Server error!"])
              setIserror(true)
            })

          }
        /**
         * function that handles the updating of existing data
         * @param {String} newData data that user updates
         * @param {String} resolve resolve
         */
        function handleRowUpdate(newData, resolve) {
            const endpoint = process.env.REACT_APP_API_ENDPOINT === null ? "https://fastapi-ernestang98.cloud.okteto.net/" : process.env.REACT_APP_API_ENDPOINT
              axios.patch(endpoint + "question/", newData)
              .then(res => {
                setData([newData]);
                setIserror(false)
                setErrorMessages([])
                console.log(res)
                  const endpoint = process.env.REACT_APP_API_ENDPOINT === null ? "https://fastapi-ernestang98.cloud.okteto.net/" : process.env.REACT_APP_API_ENDPOINT
                axios.get(endpoint + "question/")
                .then (res => {setData(res.data)})
                resolve()
              })
              .catch(error => {
                setErrorMessages(["Update failed! Server error"])
                setIserror(true)

              })
            }




    return (
      <Box className="App">
        <h1 align="center">Question List</h1>
        <h4 align='center'>Add, edit, remove </h4>
        <MaterialTable columns={columns}
        data={data}
        icons={tableIcons}
        title=""
        options={{filtering:true}}
        editable={{
          onRowAdd: (newData) =>
                new Promise((resolve) => {
                  handleRowAdd(newData, resolve)
                  resolve()
                }),
          onRowUpdate: (newData, oldData) =>
                new Promise((resolve) => {
                  handleRowUpdate(newData, oldData, resolve);
                  resolve()
                }),

        }}

        />


      </Box>
    );

      }
  export default App;
