import React, { useEffect } from 'react';
import {
    Typography,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stack,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Fab
} from "@mui/material";
import {Link} from "react-router-dom";
import MaterialTable from '@material-table/core'
import axios from 'axios';

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

import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import MovingIcon from '@mui/icons-material/Moving';
import ShieldIcon from '@mui/icons-material/Shield';
import NavigationIcon from '@mui/icons-material/Navigation';

/**
 * render Individual Report Screen
 * @returns {JSX.Element}
 * @constructor
 */
function IndivReportScreen() {

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

    const std = [

    ]
    const [students, setStudents] = React.useState(std);

    /**
     * Retrieve all students to display in dropdown select
     */
    const getAllStudents = () => {
        const endpoint = process.env.REACT_APP_API_ENDPOINT === null ? "https://fastapi-ernestang98.cloud.okteto.net/" : process.env.REACT_APP_API_ENDPOINT
        axios.get(endpoint + "student/")
        .then(function (res) {
            // console.log(res);
            setStudents(res.data);
            // console.log(students);
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    const [isSelected, setSelected] = React.useState(false);
    const [selectedStudent, setSelectedStudent] = React.useState({
        /**
         * Student email
         */
        email: "",
        /**
         * Student's total points earned so far
         */
        points: 0,
        /**
         * Student's in-game rank
         */
        rank: 0,
        /**
         * Student's in-game position
         */
        position: 0
    });

    const [studentReport, setStudentReport] = React.useState([]);

    /**
     * Everytime admin selects a new student, set state of student details
     * @param {String} event 
     */
    const handleSelect = (event) => {
        let studentEmail= event.target.value;
        setSelected(true);
        console.log(studentEmail);
        getStudentDetails(studentEmail);
    };
    
    /**
     * Retrieve selected student's specific scores, rank, position etc
     * @param {String} studentEmail 
     */
    const getStudentDetails = (studentEmail) => {
        const endpoint = process.env.REACT_APP_API_ENDPOINT === null ? "https://fastapi-ernestang98.cloud.okteto.net/" : process.env.REACT_APP_API_ENDPOINT
        axios.all([
            axios.get(endpoint + "student/" + studentEmail),
            axios.get(endpoint + "attempt/", { params: { student_email: studentEmail } }),
            axios.get(endpoint + "attempt/cohortresults/", { params: { student_email: studentEmail } })
        ])
        .then(axios.spread((obj1, obj2, obj3) => {
            console.log(obj3.data[0]);
            if (typeof obj3.data[0] != 'undefined') {
                var totalCorrectPerc = ((obj3.data[0].points_earned / obj3.data[0].max_points_earnable)*100).toFixed(2);
                setSelectedStudent(prevState => ({
                    ...prevState,
                    email: obj1.data.email,
                    totalCorrectPerc: totalCorrectPerc,
                    rank: obj1.data.rank,
                    position: obj1.data.position
                }));

                let reportArray = obj2.data;
                reportArray.forEach( function(arrayItem) {
                    arrayItem["percentage_correct"] = (( arrayItem["points_scored"] / arrayItem["total_points"] ) * 100).toFixed(2);
                })
                setStudentReport(reportArray);
            } else {
                setSelectedStudent({});
                setStudentReport([]);
            }
        }))
    }

    /**
     * Hook to retrieve student results before rendering of DOM
     */
    useEffect( ()=> {
        getAllStudents();
    })

    return (
            <Box sx={{ my: 5, justifyContent: "center", flexDirection: "row", alignItems: "center" }}>
                <Stack
                spacing={5}
                justifyContent="center"
                alignItems="center">
                    <Fab id="cohort-link" variant="extended" color="primary" component={Link} to={"/cohort-report"}>
                        <NavigationIcon sx={{ mr: 1 }} />
                        Cohort Report
                    </Fab>
                    <Typography align="center" variant="h3">
                        Select Student
                    </Typography>
                    <Box
                    sx={{
                        width: 300,
                        // height: 300,
                    }}
                    >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Name</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                onChange={handleSelect}
                                label="Name"
                                defaultValue=''
                            >
                                {students.map((student) => {
                                    return (
                                        <MenuItem key={student.name} value={student.email}>{student.name}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            <List>
                                <ListItem>
                                    <ListItemIcon>
                                        <MovingIcon />
                                    </ListItemIcon>
                                    <ListItemText>
                                        Overall Correct: {selectedStudent.totalCorrectPerc}%
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <ShieldIcon />
                                    </ListItemIcon>
                                    <ListItemText>
                                        Rank: {selectedStudent.rank}
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <FormatListNumberedIcon />
                                    </ListItemIcon>
                                    <ListItemText>
                                        Position: {selectedStudent.position}
                                    </ListItemText>
                                </ListItem>
                            </List>
                        </Box>
                    </Box>
                    <Box
                    sx={{
                        width: "100%",
                        height: 300,
                    }}
                    >
                        <MaterialTable

                            columns={[
                                { title: 'Quest Name', field: 'quest_name' },
                                { title: 'Points Scored', field: 'points_scored', type: 'numeric' },
                                { title: 'Total Possible Points', field: 'total_points', type: 'numeric' },
                                { title: '% Correct', field: 'percentage_correct', type: 'numeric' },
                                { title: 'Time to Complete', field: 'time_to_complete_in_seconds', type: 'numeric' },
                                { title: 'Total Possible Points', field: 'total_points', type: 'numeric' },
                            ]}
                            data={studentReport}
                            title="Report"
                            options={{filtering:true}}
                            icons={tableIcons}


                        />
                    </Box>
                </Stack>
            </Box>

    );
}
export default IndivReportScreen
