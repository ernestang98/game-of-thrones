import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import '@fontsource/roboto/500.css';
import {Divider, Grid} from "@mui/material";
import {
    CircularProgress,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    FormControl,
    FormControlLabel,
     InputAdornment,
    InputLabel, LinearProgress,
    MenuItem, Radio, RadioGroup,
    Select, TextField
} from "@mui/material";
import SubjectIcon from '@mui/icons-material/Subject';
import MessageIcon from '@mui/icons-material/Message';
import Button from "@mui/material/Button";
import axios from 'axios';
import {useEffect} from "react";
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

/**
 * Style for user input
 * @param {String} name name
 * @param {String} personName person name
 * @param {String} theme theme
 */
function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

/**
 * Default dashboard
 * @returns {JSX.Element}
 * @constructor
 */
function DashboardHome() {

    const [choice1, setChoice1] = React.useState('')

    /**
     * Select the user choice
     * @param {String} event event 
     */
    const handleChoice1 = (event) => {
        setChoice1(event.target.value);
    };


    const [teacher, setTeacher] = React.useState([])
    /**
     * creates API request upon rendering of HomeScreen component
     */
    useEffect( ()=> {
        const endpoint = process.env.REACT_APP_API_ENDPOINT === null ? "https://fastapi-ernestang98.cloud.okteto.net/" : process.env.REACT_APP_API_ENDPOINT
        axios.get(endpoint + "teacher/")
            .then(function (response) {
                console.log(response.data)
                setTeacher(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])

    const [student, setStudent] = React.useState([])
    /**
     * creates API request upon rendering of HomeScreen component
     */
    useEffect( ()=> {
        const endpoint = process.env.REACT_APP_API_ENDPOINT === null ? "https://fastapi-ernestang98.cloud.okteto.net/" : process.env.REACT_APP_API_ENDPOINT
        axios.get(endpoint + "student/")
            .then(function (response) {
                console.log(response.data)
                setStudent(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])

    const [subject, setSubject] = React.useState('');
    /**
     * Set the subject based on user input
     * @param {String} event event
     */
    const handleSubject = (event) => {
        setSubject(event.target.value);
    }

    const [body_heading, setBodyHeading] = React.useState('');
    /**
     * Set the body heading based on user input
     * @param {String} event event
     */
    const handleBodyHeading = (event) => {
        setBodyHeading(event.target.value);
    }

    const [body_text, setBodyText] = React.useState('');
    /**
     * Set the body text based on user input
     * @param {String} event event
     */
    const handleBodyText = (event) => {
        setBodyText(event.target.value);
    }

    const [alertOpen, setAlertOpen] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [sending, setSending] = React.useState(false);
    /**
     * Alert pop-up after user send announcement
     */
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    /**
     * Set attribute of alert open to be true
     */
    const handleAlertOpen = () => {
        setAlertOpen(true);
    };

    /**
     * Set attribute of alert open to be false
     */
    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlertOpen(false);
        setSuccess(false)
        setError(false)
    };

    /**
     * function to broadcast announcement
     */
    const createAssignment = () => {
        const endpoint = process.env.REACT_APP_API_ENDPOINT === null ? "https://fastapi-ernestang98.cloud.okteto.net/" : process.env.REACT_APP_API_ENDPOINT
        axios.post(endpoint + 'mail/', {
            "subject":  subject,
            "body_heading": body_heading,
            "body_text": body_text,
            "sender": choice1 ,
            "recipients": personName,
        })
            .then(function (response) {
                console.log(response);
                setSuccess(true)
                setSending(false)
            })
            .catch(function (error) {
                console.log(error);
                setError(true)
                setSending(false)
            });
    }

      const theme = useTheme();
      const [personName, setPersonName] = React.useState([]);
      /**
       * Select multiple recipients 
       * @param {String} event event
       */
      const handleChange = (event) => {
          const {
            target: { value },
          } = event;
          setPersonName(
            // On autofill we get a the stringified value.
            typeof value === 'string' ? value.split(',') : value,
          );
          console.log(personName)
        };
    return (
        <Box sx={{ marginTop: 3, padding:5,  display: 'flex', flexDirection: 'column', width:1000, margin: "auto"}}>
            <Box autoComplete="off" component="form">
                <Grid container boxShadow={5} sx={{ marginLeft:0, backgroundColor: '#353535', borderRadius: 5}}>
                    <Grid item xs={12} sx={{paddingX:4, py:1, mt:2}} >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">From: </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={choice1}
                                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                onChange={handleChoice1}>
                                {teacher.map((item, index) => (
                                    <MenuItem value={item.email}>{item.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sx={{paddingX:4, py:1, mb:1}} >
                        <FormControl fullWidth>
                            <InputLabel id="demo-multiple-chip-label">To:</InputLabel>
                            <Select
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                multiple
                                value={personName}
                                onChange={handleChange}
                                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} />))}
                                    </Box>)}
                                MenuProps={MenuProps}>
                                {student.map((name) => (
                                    <MenuItem key={name.email} value={name.email} style={getStyles(name, personName, theme)}>
                                        {name.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sx={{mb:1, pl:0, ml:0}} >
                        <Divider />
                    </Grid>
                    <Grid  item xs={12} sx={{paddingX:4, py:1}} >
                        <TextField required fullWidth id="input-with-icon-textfield" label="Subject" value= {subject} onChange= {handleSubject}
                                   InputProps={{
                                       startAdornment: (
                                           <InputAdornment position="start">
                                               <SubjectIcon />
                                           </InputAdornment>
                                       ),
                                   }}
                                   variant="outlined"
                        />
                    </Grid>
                    <Grid  item xs={12} sx={{paddingX:4, py:1}}>
                        <TextField required fullWidth id="input-with-icon-textfield" label="Header" value={body_heading} onChange= {handleBodyHeading}
                                   InputProps={{
                                       startAdornment: (
                                           <InputAdornment position="start">
                                               <MessageIcon />
                                           </InputAdornment>
                                       ),
                                   }}
                                   variant="outlined"
                        />
                    </Grid>

                    <Grid  item xs={12} sx={{paddingX:4, py:1, mb:2}} >
                        <TextField multiline rows={6} fullWidth id="input-with-icon-textfield" label="Enter your announcement" value={body_text} onChange= {handleBodyText}
                                   variant="outlined"
                        /> </Grid></Grid>

                        </Box>
                        <Grid item xs={12} align="right" sx={{paddingX:4}}>
                            <Button variant="contained" sx={{mt:2}} onClick={() => {createAssignment(); handleAlertOpen(); setSending(true)}} >Post </Button>
                        {success && <Snackbar open={alertOpen} autoHideDuration={4000} onClose={handleAlertClose}>
                            <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
                                Announcement sent!
                            </Alert>
                        </Snackbar>}
                        {error && <Snackbar open={alertOpen} autoHideDuration={4000} onClose={handleAlertClose}>
                            <Alert onClose={handleAlertClose} severity="error" sx={{ width: '100%' }}>
                                Unable to assign to student!
                            </Alert>
                        </Snackbar>}
                    </Grid>

        </Box>
    );
}
export default function HomeScreen() {
    return (
        <Box sx={{ my: 2 }}>
            <Typography sx={{ml: 10, mt:4}} variant="h4" component="h1" gutterBottom>
                Broadcast announcement
            </Typography>
            <DashboardHome/>
        </Box>
    );
}
