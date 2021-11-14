import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {
    CircularProgress, Container,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    FormControl,
    FormControlLabel,
    Grid, InputAdornment,
    InputLabel, LinearProgress,
    MenuItem, Radio, RadioGroup,
    Select, TextField
} from "@mui/material";
import Button from "@mui/material/Button";
import {useEffect} from "react";
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios'
import TextFieldsIcon from '@mui/icons-material/TextFields';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

let QUEST = [];
let unique = [];

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

/**
 * renders Assignment Screen for creating an assignment and assigning to a student
 * @returns {JSX.Element}
 * @param name assignment name
 * @param value assignee(student)
 * @param choice assigner(teacher)
 * @param desc assignment description
 * @constructor
 */
function AssignmentStudent() {

    const [alertOpen, setAlertOpen] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [sending, setSending] = React.useState(false);

    /**
     * function to display alert for success/failure of API request
     */
    const handleAlertOpen = () => {
        setAlertOpen(true);
    };

    /**
     * function to close alert
     */
    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlertOpen(false);
        setSuccess(false)
        setError(false)
    };

    const [loading, setLoading] = React.useState(true)


    /**
     * creates API request upon rendering of AssignmentStudent component
     */
    useEffect( ()=> {
        const endpoint = process.env.REACT_APP_API_ENDPOINT === null ? "https://fastapi-ernestang98.cloud.okteto.net/" : process.env.REACT_APP_API_ENDPOINT
        axios.get(endpoint + "student/")
            .then(function (response) {
                setStdList(response.data)
                setLoading(false)
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false)

            });
    }, [])

    const std = [

    ]

    /**
     * function used to create POST request for a new assignment
     */
    const createAssignment = () => {
        const endpoint = process.env.REACT_APP_API_ENDPOINT === null ? "https://fastapi-ernestang98.cloud.okteto.net/" : process.env.REACT_APP_API_ENDPOINT
        axios.post(endpoint + 'assignment/', {
            "assignment_name": name,
            "assigner": choice,
            "assignee": value,
            "description": desc,
            "points_scored": 0,
            "time_to_complete_in_seconds": 0
        })
            .then(function (response) {
                setSuccess(true)
                setSending(false)
            })
            .catch(function (error) {
                console.log(error);
                setError(true)
                setSending(false)
            });
    }


    const [value, setValue] = React.useState('');
    const [stdList, setStdList] = React.useState(std);
    const [open, setOpen] = React.useState(false);
    const [desc, setDesc] = React.useState('');
    const [name, setAName] = React.useState('');
    const [assignee, setAssignee] = React.useState('');


    const handleDescription = (event) => {
        setDesc(event.target.value);
    };

    const handleAssignmentName = (event) => {
        setAName(event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const handleRadio = (event) => {
        setValue(event.target.value);
    };

    useEffect( ()=> {
        console.log(value)
    }, [value])

    const [teacher, setTeacher] = React.useState([])

    useEffect( ()=> {
        const endpoint = process.env.REACT_APP_API_ENDPOINT === null ? "https://fastapi-ernestang98.cloud.okteto.net/" : process.env.REACT_APP_API_ENDPOINT
        axios.get(endpoint + "teacher/")
            .then(function (response) {
                setTeacher(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
        }, [])



    const [choice, setChoice] = React.useState('');

    const handleChoice = (event) => {
        setChoice(event.target.value);
    };


    return(
        <Box sx={{ marginTop: 3, padding:5,  display: 'flex', flexDirection: 'column', width:1000, margin: "auto"}}>
            <Box>
                <Typography variant="h5" sx={{mb:5}}>
                    Assign to Students
                </Typography>
            </Box>
            <Box autoComplete="off" component="form">
                <Grid container boxShadow={5} sx={{ padding:4, backgroundColor: '#353535', borderRadius: 5}} spacing={2}>
                    <Grid  item xs={12} >
                        <TextField required fullWidth id="assignmentInput" label="Assignment Name"  value={name} onChange={handleAssignmentName}
                                   InputProps={{
                                       startAdornment: (
                                           <InputAdornment position="start">
                                               <AssignmentIcon />
                                           </InputAdornment>
                                       ),
                                   }}
                                   variant="outlined"
                        />
                    </Grid>
                    <Grid  item xs={12}>
                        <TextField required fullWidth id="descInput" label="Assignment Description"  value={desc} onChange={handleDescription}
                                   InputProps={{
                                       startAdornment: (
                                           <InputAdornment position="start">
                                               <TextFieldsIcon />
                                           </InputAdornment>
                                       ),
                                   }}
                                   variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} marginBottom={2} >
                        <Box sx={{mt:2 }}>
                            <RadioGroup
                                aria-label="gender"
                                name="controlled-radio-buttons-group"
                                value={value}
                                id="radio-select"
                                onChange={handleRadio}>
                                {stdList.map((item, index) => (
                                    <Box key={item.name} boxShadow={3} sx={{px:3, py:3, display:'flex', my:1, width:1}} alignItems="center" justifyContent="space-between" flexDirection="row"  >
                                        <Box sx={{display:'flex'}} flexDirection='row'>
                                            <PersonIcon/>
                                            <Typography sx={{ml:2}}>
                                                {item.name}
                                            </Typography>
                                        </Box>
                                        <FormControlLabel  key={item.email} value={item.email} control={<Radio />} labelPlacement="start" label="Select" />
                                    </Box>
                                ))}
                                {loading && <Grid container justifyContent="center" alignItems="center">
                                    <CircularProgress color='primary'
                                                      size={40}
                                                      thickness={3}/>
                                </Grid>}
                            </RadioGroup>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={10} align="right"  >
                        <FormControl required variant="standard" sx={{ minWidth: 200}}>
                            <InputLabel variant="button" id="demo-simple-select-label">Assigned By</InputLabel>
                            <Select
                                sx={{width:200}}
                                align="left"
                                labelId="demo-simple-select-label"
                                id="teacher-select"
                                value={choice}
                                onChange={handleChoice}>
                                {teacher.map((item, index) => (
                                    <MenuItem value={item.email}>{item.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={2} align="left">
                        <Button id="ButtonComponent" variant="contained"  sx={{mt:1.5}} onClick={() => {createAssignment(); handleAlertOpen(); setSending(true)}}>Assign</Button>
                        {success && <Snackbar id="snack-bar" open={alertOpen} autoHideDuration={4000} onClose={handleAlertClose}>
                            <Alert id="pass-alert" onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
                                Successfully assigned to student!
                            </Alert>
                        </Snackbar>}
                        {error && <Snackbar open={alertOpen} autoHideDuration={4000} onClose={handleAlertClose}>
                            <Alert onClose={handleAlertClose} severity="error" sx={{ width: '100%' }}>
                                Unable to assign to student!
                            </Alert>
                        </Snackbar>}
                    </Grid>

                    <Dialog
                        open={open}
                        onClose={handleClose}>
                        <DialogTitle>Assign to Student</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Confirm Assignment?
                            </DialogContentText>
                            <Box
                                noValidate
                                component="form"
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '20%',
                                }}
                            >
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Close</Button>
                        </DialogActions>
                    </Dialog>

                </Grid>

            </Box>
            {sending && <Box xs={12} sx={{ mt:3}} justifyContent="center" alignItems="center">
                <LinearProgress />
            </Box>}

        </Box>

    )
}


export default AssignmentStudent;