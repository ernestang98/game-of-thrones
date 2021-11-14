import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import '@fontsource/roboto/500.css';
import {
    FormControl,
    Grid,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TableCell,
    Input,
    TableHead,
    TableRow, Table, Paper, TableBody, LinearProgress,
} from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";
import DeleteIcon from '@mui/icons-material/Delete';
import {useEffect} from "react";
import axios from "axios";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

/**
 * handle table view when edit button is used
 * @param row selected row
 * @param name selected column
 * @param onChange function that updates state of the table
 * @returns {JSX.Element}
 * @constructor
 */
const CustomTableCell = ({ row, name, onChange }) => {

    const { isEditMode } = row;
    if (name == "prompt"){
        return (
            <TableCell align="left">
                {isEditMode ? (
                    <Input
                        value={row[name]}
                        name={name}
                        onChange={e => onChange(e, row)}
                    />
                ) : (
                    row[name]
                )}
            </TableCell>
        );

    }

    else {
        return (
            <TableCell align="right">
                {isEditMode ? (
                    <Input
                        value={row[name]}
                        name={name}
                        onChange={e => onChange(e, row)}
                    />
                ) : (
                    row[name]
                )}
            </TableCell>
        );
    }

};

let std = [];
let unique = [];

/**
 * renders Assignment Screen for updating & deleting of questions
 * @returns {JSX.Element}
 * @constructor
 */

function AssignmentManage() {
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

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlertOpen(false);
        setSuccess(false)
        setError(false)
    };

    const [table, setTable] = React.useState(false)
    const [btn, setBtn] = React.useState(true)


    const [fetchAgain, setFetchAgain] = React.useState(0)
    //API fetch on mount
    /**
     * create API GET request upon rendering of AssignmentManage component
     */
    useEffect( ()=> {
        const endpoint = process.env.REACT_APP_API_ENDPOINT === null ? "https://fastapi-ernestang98.cloud.okteto.net/" : process.env.REACT_APP_API_ENDPOINT
        axios.get(endpoint + "assignmentQuestion/")
            .then(function (response) {
                std = response.data
                setChg(chg+1)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [fetchAgain])


    // get unique assignments, executes when setChg is called -> setChg called on API GET response
    const [chg, setChg] = React.useState(0)
    const [prepData, setPrepData] = React.useState(0)
    useEffect( ()=> {
        unique = [...new Set(std.map(item => item.assignment_name))];
        setQuest(unique)
        setPrepData(prepData+1)
    }, [chg])


    // add attributes to retrieved data
    const [preRows, setPreRows] = React.useState([])
    useEffect( ()=> {
        std.forEach((element, index) => Object.assign(element, {isEditMode: false}));
        setPreRows(std) // shouldnt use this right
    }, [prepData])

    const [quest, setQuest] = React.useState([])
    const [open, setOpen] = React.useState(false);

    // choice of selected assignment
    const [choice, setChoice] = React.useState('');

    /**
     * used to update state and enable button when assignment is selected
     * @param event event
     */
    const handleChange = (event) => {
        setChoice(event.target.value);
        setBtn(false)
    };

    //filter for selected assignment -> takes effect after choice is selected
    const [rows, setRows] = React.useState([])
    useEffect( ()=> {
    }, [choice])


    const selectedAssignment = () => {
        let selectedBox = preRows.filter( element => element['assignment_name'] == choice)
        setRows(selectedBox)
    }

    const [headerA,setHeader] = React.useState('')

    /**
     * display name of selected assignment
     */
    const getHeader = () => {
        let header = choice;
        setHeader(header)
    }

    const [previous, setPrevious] = React.useState({});

    /**
     * function to change state of table and enable modification
     * @param id row id
     */
    const onToggleEditMode = id => {
        setRows(state => {
            return rows.map(row => {
                if (row.id === id) {
                    return { ...row, isEditMode: !row.isEditMode };
                }
                return row;
            });
        });
    };

    const onChange = (e, row) => {
        if (!previous[row.id]) {
            setPrevious(state => ({ ...state, [row.id]: row }));
        }
        const value = e.target.value;
        const name = e.target.name;
        const { id } = row;
        const newRows = rows.map(row => {
            if (row.id === id) {
                return { ...row, [name]: value };
            }
            return row;
        });
        setRows(newRows);
    };

    /**
     * function to remove a row from table
     * @param row selected row object
     */
    const onDelete = (row) => {
        const array = [...rows]
        let removeIndex = array.map(item => item.id).indexOf(row.id);
        array.splice(removeIndex, 1);
        setRows(array)
    };

    /**
     * fucntion called to revert table to previous state and cancel modification
     * @param id selected row id
     */
    const onRevert = id => {
        const newRows = rows.map(row => {
            if (row.id === id) {
                return previous[id] ? previous[id] : row;
            }
            return row;
        });
        setRows(newRows);
        setPrevious(state => {
            delete state[id];
            return state;
        });
        onToggleEditMode(id);
    };


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [updateQn, setUpdateQn] = React.useState({})

    /**
     * filter out selected question object
     * @param updateID id of the selected row
     */
    const getUpdatedQn = (updateID) => {
        let selectedQn = rows.filter( element => element['id'] == updateID )
        setUpdateQn(selectedQn[0])
    }

    const [patch, setPatch] = React.useState(false)

    /**
     * updates table view upon successful PATCH operation
     */
    useEffect( ()=> {
        if (patch) {
            const endpoint = process.env.REACT_APP_API_ENDPOINT === null ? "https://fastapi-ernestang98.cloud.okteto.net/" : process.env.REACT_APP_API_ENDPOINT
            axios.patch(endpoint + 'assignmentQuestion/', updateQn)
                .then(function (response) {
                    setSuccess(true)
                    setSending(false)
                    onToggleEditMode(validPatch);
                    setFetchAgain(fetchAgain+1)

                })
                .catch(function (error) {
                    console.log(error);
                    setError(true)
                    setSending(false)
                });
        }
    }, [updateQn])

    const [validPatch, setValidPatch] = React.useState('')
    const [validDelete, setValidDelete] = React.useState({})


    /**
     * API Delete operation to delete selected question from assignment
     */
    const delAssignmentQn = (id) => {
        const endpoint = process.env.REACT_APP_API_ENDPOINT === null ? "https://fastapi-ernestang98.cloud.okteto.net/" : process.env.REACT_APP_API_ENDPOINT
        axios.delete(endpoint + 'assignmentQuestion/?id=' + id)
            .then(function (response) {
                onDelete(validDelete);
                setSending(false)
                setSuccess(true)
                setFetchAgain(fetchAgain+1)

            })
            .catch(function (error) {
                // handle error
                console.log(error);
                setSending(false)
                setError(true)
            })

    }

    /**
     * create API Delete operation to delete selected assignment
     */
    const delAssignment = () => {
        const endpoint = process.env.REACT_APP_API_ENDPOINT === null ? "https://fastapi-ernestang98.cloud.okteto.net/" : process.env.REACT_APP_API_ENDPOINT
        axios.delete(endpoint + 'assignment/?assignment_name=' + choice)
            .then(function (response) {
                // handle success
                onDelete(validDelete);
                setSending(false)
                setSuccess(true)
                setRows([])
                setFetchAgain(fetchAgain+1)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                setSending(false)
                setError(true)
            })

    }



    return (
        <Box sx={{marginTop: 3, marginX: 30, padding:5,  display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItem: 'flex-start'}}>
            <Box>
                <Typography variant="h5" sx={{mb:5}}>
                    Manage Assignments
                </Typography>
            </Box>
            <Box component="form"   sx={{mb:5, mr: 20}}>
                <Grid container  sx={{ padding:0}} spacing={2}>
                    <Grid item xs={12}>
                        <FormControl required variant="standard" sx={{ minWidth: 200}}>
                            <InputLabel id="demo-simple-select-label">Select Assignment</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={choice}
                                onChange={handleChange}>
                                {quest.map((item, index) => (
                                    <MenuItem value={item}>{item}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button id="modifyBtn" disabled={btn} sx={{marginRight:2}} variant="contained" onClick={()=> {selectedAssignment(); setTable(true); setPatch(true); getHeader();}}>Edit Questions</Button>
                        <Button id="delBtn" disabled={btn} color="error" variant="contained" onClick={()=>{handleClickOpen();}}>Delete Assignment</Button>
                        {success && <Snackbar open={alertOpen} autoHideDuration={4000} onClose={handleAlertClose}>
                            <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
                                Action is successful
                            </Alert>
                        </Snackbar>}
                        {error && <Snackbar open={alertOpen} autoHideDuration={4000} onClose={handleAlertClose}>
                            <Alert onClose={handleAlertClose} severity="error" sx={{ width: '100%' }}>
                                Action failed
                            </Alert>
                        </Snackbar>}
                    </Grid>

                    <Dialog
                        fullWidth
                        maxWidth="sm"
                        open={open}
                        onClose={handleClose}>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <Grid container spacing={1} justifyContent="center">
                                    <Grid item xs={12}>
                                        <Typography variant="body">
                                            You are about to delete {choice}
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
                            <Button color="error" onClick={() => {handleClose(); delAssignment(); handleAlertOpen(); setSending(true);}}>DELETE</Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
            </Box>
            {table && <Box>
                <Box>
                    <Typography variant="h5" sx={{mb:5}}>
                        {headerA}
                    </Typography>
                </Box>
                <Box boxShadow={5} sx={{ paddingX:10, paddingY: 5,backgroundColor: '#353535', borderRadius: 5}}>
                    <Table aria-label="caption table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left" />
                                <TableCell align="left">Question</TableCell>
                                <TableCell align="right">Choice 1</TableCell>
                                <TableCell align="right">Choice 2</TableCell>
                                <TableCell align="right">Choice 3</TableCell>
                                <TableCell align="right">Choice 4</TableCell>
                                <TableCell align="right">Answer</TableCell>
                                <TableCell align="right">Points</TableCell>


                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell>
                                        {row.isEditMode ? (
                                            <>
                                                <IconButton aria-label="done" onClick={() => {setValidPatch(row.id); getUpdatedQn(row.id); handleAlertOpen(); setSending(true);}}>
                                                    <DoneIcon />
                                                </IconButton>
                                                <IconButton aria-label="revert" onClick={() => onRevert(row.id)}>
                                                    <RevertIcon />
                                                </IconButton>
                                            </> ) : (
                                            <>
                                                <IconButton aria-label="delete" onClick={() => onToggleEditMode(row.id)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton aria-label="revert" onClick={() => { delAssignmentQn(row.id); setValidDelete(row); setSending(true); handleAlertOpen();
                                                }}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </>

                                        )}
                                    </TableCell>
                                    <CustomTableCell {...{ row, name: "prompt", onChange }} />
                                    <CustomTableCell {...{ row, name: "choice1", onChange }} />
                                    <CustomTableCell {...{ row, name: "choice2", onChange }} />
                                    <CustomTableCell {...{ row, name: "choice3", onChange }} />
                                    <CustomTableCell {...{ row, name: "choice4", onChange }} />
                                    <CustomTableCell {...{ row, name: "answer", onChange }} />
                                    <CustomTableCell {...{ row, name: "points", onChange }} />


                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
                {sending && <Box xs={12} sx={{mt:3}} justifyContent="center" alignItems="center">
                    <LinearProgress />
                </Box>}
            </Box>
            }


        </Box>
    )

}

export default AssignmentManage;