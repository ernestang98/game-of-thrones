import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import '@fontsource/roboto/500.css';
import {
    FormControl,
    Grid,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    InputAdornment,
    TableContainer, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress, LinearProgress
} from "@mui/material";
import Button from "@mui/material/Button";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import CheckIcon from '@mui/icons-material/Check';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {useEffect} from "react";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

/**
 * render Assignment Screen to add new question to existing Assignment
 * @returns {JSX.Element}
 * @constructor
 */
function AssignmentAdd() {

    const [alertOpen, setAlertOpen] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);


    const [loading, setLoading] = React.useState(false)

    /**
     * function to display alert for success/failure of API request
     */
    const handleAlertOpen = () => {
        setAlertOpen(true);
    };


    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlertOpen(false);
        setSuccess(false)
        setError(false)
    };


    const QUEST = [
        {name: "Level 1"},
        {name: "Level 2"},
        {name: "Level 3"},
    ];

    const std = [
        {
            "prompt": "this is qn 1",
            "choice1": "asdf",
            "choice2": "rfe",
            "choice3": "rfe",
            "choice4": "freg",
            "answer": 0,
        }
    ]

    const onDelete = (row) => {
        const array = [...rows]
        let removeIndex = array.map(item => item.prompt).indexOf(row.prompt);
        array.splice(removeIndex, 1);
        setRows(array)
    };

    /**
     * convert difficulty input(string) to int
     * @param int difficulty level
     * @returns {number}
     */
    const getInt = (int) => {
        let num = int.replace(/[^0-9]/g,'');
        return parseInt(num, 10)
    }


    /**
     * clear all textfield upon successful adding of question
     */
    const clearAll = () => {
        setQn('')
        setCode('')
        setChoice1('')
        setChoice2('')
        setChoice3('')
        setChoice4('')
        setAnswer('')
        setPoints('')

    }

    const [rows, setRows] = React.useState(std)
    const [quest, setQuest] = React.useState(QUEST)
    const [age, setAge] = React.useState('');
    const [question, setQn] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [code, setCode] = React.useState('');
    const [choice1, setChoice1] = React.useState('');
    const [choice2, setChoice2] = React.useState('');
    const [choice3, setChoice3] = React.useState('');
    const [choice4, setChoice4] = React.useState('');
    const [answer, setAnswer] = React.useState('');
    const [points, setPoints] = React.useState('');


    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const handleQn = (event) => {
        setQn(event.target.value);
    };

    const handleCode = (event) => {
        setCode(event.target.value);
    };

    const handleChoice1 = (event) => {
        setChoice1(event.target.value);
    };
    const handleChoice2 = (event) => {
        setChoice2(event.target.value);
    };
    const handleChoice3 = (event) => {
        setChoice3(event.target.value);
    };
    const handleChoice4 = (event) => {
        setChoice4(event.target.value);
    };

    const handleAnswer = (event) => {
        setAnswer(event.target.value);
    };

    const handlePoints = (event) => {
        setPoints(event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [choice, setChoice] = React.useState('');


    /**
     * function to create POST request for adding a new question
     * @param choice existing assignment to add to
     * @param question question
     * @param answer the correct option number to the question
     * @param choice1 option 1
     * @param choice2 option 2
     * @param choice3 option 3
     * @param choice4 option 4
     */
    const createQuestion = () => {
        const endpoint = process.env.REACT_APP_API_ENDPOINT === null ? "https://fastapi-ernestang98.cloud.okteto.net/" : process.env.REACT_APP_API_ENDPOINT
        axios.post(endpoint + 'assignmentQuestion/', {
            "assignment_name": choice,
            "difficulty": getInt(age),
            "points": points,
            "prompt": question,
            "answer": answer,
            "choice1": choice1,
            "choice2": choice2,
            "choice3": choice3,
            "choice4": choice4
        })
            .then(function (response) {
                setSuccess(true);
                clearAll();
                setLoading(false)
            })
            .catch(function (error) {
                console.log(error);
                setError(true)
                setLoading(false)

            });
    }

    const [dropdown, setDropdown] = React.useState([])
    const [loader, setLoader] = React.useState(false)

    const [buffer, setBuffer] = React.useState(false)
    const handleChoice = (event) => {
        setAssignName(false)
        setChoice(event.target.value);
        setLoader(true)
        setBuffer(true)
    };

    const [assignName, setAssignName] = React.useState(false)
    const [email, setEmail] = React.useState('')

    useEffect( ()=> {
        console.log(choice)
        if (buffer){
            selectedAssignment();
        }
    }, [choice])

    const selectedAssignment = () => {
            let selected = dropdown.filter( element => element['assignment_name'] == choice)
            getStudent(selected[0]['assignee'])
    }

    const [student, setStudent] = React.useState('')

    const getStudent = (email) => {
        const endpoint = process.env.REACT_APP_API_ENDPOINT === null ? "https://fastapi-ernestang98.cloud.okteto.net/" : process.env.REACT_APP_API_ENDPOINT
        axios.get(endpoint + "student/" + email)
            .then(function (response) {
                setAssignName(true)
                setStudent(response.data['name'])
                setLoader(false)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect( ()=> {
        const endpoint = process.env.REACT_APP_API_ENDPOINT === null ? "https://fastapi-ernestang98.cloud.okteto.net/" : process.env.REACT_APP_API_ENDPOINT
        axios.get(endpoint + "assignment/")
            .then(function (response) {
                setDropdown(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])

    return (
        <Box sx={{ marginTop: 3, padding:5,  display: 'flex', flexDirection: 'column', width:1000, margin: "auto"}}>
            <Box>
                <Typography variant="h5" sx={{mb:5}}>
                    Add New Question
                </Typography>
            </Box >
            <Box autoComplete="off" component="form">
                <Grid container boxShadow={5} sx={{ paddingX:6, paddingBottom:2, paddingTop:0, marginLeft:0, backgroundColor: '#353535', borderRadius: 5, mb:5}} spacing={2} >
                    <Grid item xs={12} sm={4} >
                        <FormControl required variant="standard" sx={{ minWidth: 200}}>
                            <InputLabel variant="button" id="demo-simple-select-label">Select Assignment</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={choice}
                                onChange={handleChoice}>
                                {dropdown.map((assignment, index) => (
                                    <MenuItem value={assignment.assignment_name}>{assignment.assignment_name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container boxShadow={5} sx={{ paddingX:6, paddingY: 2, marginLeft:0, backgroundColor: '#353535', borderRadius: 5}} spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <FormControl variant="standard" sx={{minWidth: 200, mb:1 }}>
                            <InputLabel id="demo-simple-select-filled-label">Difficulty</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={age}
                                onChange={handleChange}>
                                {quest.map((item, index) => (
                                    <MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    {loader && <Grid item xs={12} sm={8} sx={{mt:2, pr:10}} align="right">
                        <CircularProgress color='primary'
                                          size={30}
                                          thickness={5}/>
                    </Grid>}
                    {assignName && <Grid item xs={12} sm={8} >
                        <Box sx={{display: 'flex'}} flexDirection="row" justifyContent="flex-end">
                            <Typography fontSize="md" variant="button" pt={3}>
                                Assigned to
                            </Typography>
                            <Typography  color="#598A47" variant="button" pl={1} pt={3}>
                                {student}
                            </Typography>

                        </Box>
                    </Grid>
                    }
                    <Grid item xs={12}>
                        <TextField fullWidth id="input-with-icon-textfield" label="Question" value={question} required onChange={handleQn}
                                   InputProps={{
                                       startAdornment: (
                                           <InputAdornment position="start">
                                               <QuestionAnswerIcon />
                                           </InputAdornment>
                                       ),

                                   }}
                                   variant="outlined"
                        />
                    </Grid>
{/*                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth id="input-with-icon-textfield" label="Assignment Name" value={code} required onChange={handleCode}
                                   InputProps={{
                                       startAdornment: (
                                           <InputAdornment position="start">
                                               <AssignmentIcon />
                                           </InputAdornment>
                                       ),
                                   }}
                                   variant="outlined"
                        />
                    </Grid>*/}
                    <Grid  item xs={12}>
                        <TextField fullWidth id="input-with-icon-textfield" label="Option 1"  value={choice1} onChange={handleChoice1}
                                   InputProps={{
                                       startAdornment: (
                                           <InputAdornment position="start">
                                               <FormatListNumberedIcon />
                                           </InputAdornment>
                                       ),
                                   }}
                                   variant="outlined"
                        />
                    </Grid>
                    <Grid  item xs={12}>
                        <TextField fullWidth id="input-with-icon-textfield" label="Option 2" value={choice2} onChange={handleChoice2}
                                   InputProps={{
                                       startAdornment: (
                                           <InputAdornment position="start">
                                               <FormatListNumberedIcon />
                                           </InputAdornment>
                                       ),
                                   }}
                                   variant="outlined"
                        />
                    </Grid>
                    <Grid  item xs={12}>
                        <TextField fullWidth id="input-with-icon-textfield" label="Option 3" value={choice3} onChange={handleChoice3}
                                   InputProps={{
                                       startAdornment: (
                                           <InputAdornment position="start">
                                               <FormatListNumberedIcon />
                                           </InputAdornment>
                                       ),
                                   }}
                                   variant="outlined"
                        />
                    </Grid>
                    <Grid  item xs={12}>
                        <TextField fullWidth id="input-with-icon-textfield" label="Option 4" value={choice4} onChange={handleChoice4}
                                   InputProps={{
                                       startAdornment: (
                                           <InputAdornment position="start">
                                               <FormatListNumberedIcon />
                                           </InputAdornment>
                                       ),
                                   }}
                                   variant="outlined"
                        />
                    </Grid>
                    <Grid  item xs={12} sm={6}>
                        <TextField fullWidth id="input-with-icon-textfield" label="Answer" value={answer} required onChange={handleAnswer}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CheckIcon />
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid  item xs={12} sm={6}>
                        <TextField fullWidth id="input-with-icon-textfield" label="Points" value={points} required onChange={handlePoints}
                                   InputProps={{
                                       startAdornment: (
                                           <InputAdornment position="start">
                                               <CardGiftcardIcon />
                                           </InputAdornment>
                                       ),
                                   }}
                                   variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sx={{mt:2}} align="right">
                        <Button id="addBtn" variant="contained" onClick={()=> { handleAlertOpen(); createQuestion(); setLoading(true)}}>Save and Add Another Question</Button>
                        {success && <Snackbar open={alertOpen} autoHideDuration={4000} onClose={handleAlertClose}>
                            <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
                                Successfully saved question!
                            </Alert>
                        </Snackbar>}
                        {error && <Snackbar open={alertOpen} autoHideDuration={4000} onClose={handleAlertClose}>
                            <Alert onClose={handleAlertClose} severity="error" sx={{ width: '100%' }}>
                                Unable to save question!
                            </Alert>
                        </Snackbar>}
                    </Grid>
                </Grid>
                <Dialog
                    open={open}
                    onClose={handleClose}>
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <Grid container spacing={1} justifyContent="center">
                                <Grid item xs={12}>
                                    <Typography variant="body">
                                        Saved {question}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </DialogContentText>
                        <Box
                            noValidate
                            component="form"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                m: 'auto',
                                width: 'fit-content',
                            }}
                        >
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Confirm</Button>
                    </DialogActions>
                </Dialog>

            </Box>
            {loading && <Box xs={12} sx={{mt:3}} justifyContent="center" alignItems="center">
                <LinearProgress />
            </Box>}
{/*            <Box>
                <Typography variant="h5" sx={{mb:5, mt:5}}>
                    Recently Saved Questions
                </Typography>
                <Box boxShadow={5} sx={{ paddingX:10, paddingY: 5}}>
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Action</TableCell>
                                    <TableCell align="left">Question</TableCell>
                                    <TableCell align="left">Assignment Name</TableCell>
                                    <TableCell align="right">Option 1</TableCell>
                                    <TableCell align="right">Option 2</TableCell>
                                    <TableCell align="right">Option 3</TableCell>
                                    <TableCell align="right">Option 4</TableCell>
                                    <TableCell sx={{fontWeight:"bold"}} align="right">Answer</TableCell>


                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.prompt}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th">
                                            <IconButton aria-label="revert" onClick={() => { onDelete(row);
                                            }}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.prompt}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.prompt}
                                        </TableCell>
                                        <TableCell align="right">{row.choice1}</TableCell>
                                        <TableCell align="right">{row.choice2}</TableCell>
                                        <TableCell align="right">{row.choice3}</TableCell>
                                        <TableCell align="right">{row.choice4}</TableCell>
                                        <TableCell sx={{fontWeight:"bold"}} align="right">{row.answer}</TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Box>

            </Box>*/}

        </Box>
    )

}

export default AssignmentAdd;