import React, { useEffect } from 'react';
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
    InputAdornment,
    LinearProgress
} from "@mui/material";
import Button from "@mui/material/Button";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import CheckIcon from '@mui/icons-material/Check';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

/**
 * Create Alert object and DOM
 */
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

/**
 * render Create Main screen, which includes adding categories, quests etc
 * @returns {JSX.Element}
 * @constructor
 */
function CreateMain() {

    const [alertOpen, setAlertOpen] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [savedItem, setSavedItem] = React.useState("");


    const [loading, setLoading] = React.useState(false)

    /**
     * Handler for alerts to set it to open
     */
    const handleAlertOpen = () => {
        setAlertOpen(true);
    };

    /**
     * Handler for alerts to set it to close
     * @param {String} event 
     * @param {String} reason 
     * @returns Null
     */
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

    /**
     * Return an integer from a Number type
     * @param {Number} int
     */
    const getInt = (int) => {
        let num = int.replace(/[^0-9]/g,'');
        return parseInt(num, 10)
    }

    /**
     * Clear all inout fields for question form
     */
    const clearAll = () => {
        setQn('')
        setChoice1('')
        setChoice2('')
        setChoice3('')
        setChoice4('')
        setAnswer('')
        setPoints('')

    }

    const [difficulty, setDifficulty] = React.useState('');
    const [question, setQn] = React.useState('');
    const [choice1, setChoice1] = React.useState('');
    const [choice2, setChoice2] = React.useState('');
    const [choice3, setChoice3] = React.useState('');
    const [choice4, setChoice4] = React.useState('');
    const [answer, setAnswer] = React.useState('');
    const [points, setPoints] = React.useState('');

    /**
     * Handle change in difficulty
     * @param {String} event 
     */
    const handleChange = (event) => {
        setDifficulty(event.target.value);
    };

    /**
     * Handle change in question
     * @param {String} event 
     */
    const handleQn = (event) => {
        setQn(event.target.value);
    };

    /**
     * Handle change in choice 1 of question
     * @param {String} event 
     */
    const handleChoice1 = (event) => {
        setChoice1(event.target.value);
    };

    /**
     * Handle change in choice 2 of question
     * @param {String} event 
     */
    const handleChoice2 = (event) => {
        setChoice2(event.target.value);
    };

    /**
     * Handle change in choice 3 of question
     * @param {String} event 
     */
    const handleChoice3 = (event) => {
        setChoice3(event.target.value);
    };

    /**
     * Handle change in choice 4 of question
     * @param {String} event 
     */
    const handleChoice4 = (event) => {
        setChoice4(event.target.value);
    };

    /**
     * Handle change in answer of question
     * @param {String} event 
     */
    const handleAnswer = (event) => {
        setAnswer(event.target.value);
    };

    /**
     * Handle change in points of question
     * @param {String} event 
     */
    const handlePoints = (event) => {
        setPoints(event.target.value);
    };

    /**
     * Post question details to endpoint API to create a question 
     */
    const createQuestion = () => {
        const endpoint = process.env.REACT_APP_API_ENDPOINT === null ? "https://fastapi-ernestang98.cloud.okteto.net/" : process.env.REACT_APP_API_ENDPOINT
        axios.post(endpoint + 'question/', {
            "subquest_name": subquest.subquest_name,
            "difficulty": getInt(difficulty),
            "points": points,
            "prompt": question,
            "answer": answer,
            "choice1": choice1,
            "choice2": choice2,
            "choice3": choice3,
            "choice4": choice4
        })
            .then(function (response) {
                console.log(response);
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
    const [choice, setChoice] = React.useState('');

    const handleChoice = (event) => {
        setChoice(event.target.value);
        setLoading(true)
    };

    const filter = createFilterOptions();

    const [category, setCategory] = React.useState(null);
    const [categories, setCategories] = React.useState([]);

    /**
     * Get categories from endpoint API all possible categories
     */
    const getAllCategories = () => {
        const endpoint = process.env.REACT_APP_API_ENDPOINT === null ? "https://fastapi-ernestang98.cloud.okteto.net/" : process.env.REACT_APP_API_ENDPOINT
        axios.get(endpoint + 'category/')
        .then(function (response) {
            setCategories(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const [quest, setQuest] = React.useState(null);
    const [quests, setQuests] = React.useState([]);

    /**
     * Get quests from endpoint API all possible quests
     */
    const getAllQuests = () => {
        const endpoint = process.env.REACT_APP_API_ENDPOINT === null ? "https://fastapi-ernestang98.cloud.okteto.net/" : process.env.REACT_APP_API_ENDPOINT
        axios.get(endpoint + 'quest/')
        .then(function (response) {
            setQuests(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const [subquest, setSubquest] = React.useState(null);
    const [subquests, setSubquests] = React.useState([]);

    /**
     * Get subquests from endpoint API all possible subquests
     */
    const getAllSubquests = () => {
        const endpoint = process.env.REACT_APP_API_ENDPOINT === null ? "https://fastapi-ernestang98.cloud.okteto.net/" : process.env.REACT_APP_API_ENDPOINT
        axios.get(endpoint + 'subquest/')
        .then(function (response) {
            setSubquests(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const [questOptions, setQuestOptions] = React.useState([]);
    const [subquestOptions, setSubquestOptions] = React.useState([]);

    /**
     * Set dropdown select options for quests and subquests
     * @param {String} category_name 
     */
    const setPossibleQuests = (category_name) => {
        let course_code = category_name.slice(0, 6);
        let questOptionsArray = [];
        quests.forEach(function(arrayItem) {
            if (arrayItem.quest_name.includes(course_code)) {
                questOptionsArray.push({ "quest_name": arrayItem.quest_name })
            }
            setQuestOptions(questOptionsArray);

        })

        let subquestOptionsArray = [];
        subquests.forEach(function(arrayItem) {
            if (arrayItem.subquest_name.includes(course_code)) {
                subquestOptionsArray.push({ "subquest_name": arrayItem.subquest_name })
            }
            setSubquestOptions(subquestOptionsArray);

        })
    }

    /**
     * Hook to retrieve categories, quests, and subquests before rendering of DOM
     */
    useEffect( ()=> {
        getAllCategories();
        getAllQuests();
        getAllSubquests();
    })

    return (
        <Box sx={{ marginTop: 3, padding:5,  display: 'flex', flexDirection: 'column', width:1000, margin: "auto"}}>
            <Box sx={{marginTop:3}}>
                <Typography variant="h4" sx={{mb:5}}>
                    Create
                </Typography>
            </Box >
            <Box autoComplete="off" component="form">
                <Grid container direction="column" boxShadow={5} sx={{ paddingX:2, paddingBottom:3, paddingTop:1, marginLeft:0, backgroundColor: '#353535', borderRadius: 5, mb:5}} spacing={2} >
                    <Grid item xs={12} sm={4} >
                        <Autocomplete
                            value={category}
                            onChange={(event, newValue) => {
                                if (typeof newValue === 'string') {

                                    setCategory({
                                        category_name: newValue
                                    } );
                                    setPossibleQuests(newValue)

                                } else if (newValue && newValue.inputValue) {
                                    const payload = {
                                        category_name: newValue.inputValue,
                                    };
                                    const endpoint = process.env.REACT_APP_API_ENDPOINT === null ? "https://fastapi-ernestang98.cloud.okteto.net/" : process.env.REACT_APP_API_ENDPOINT
                                    axios.post(endpoint + 'category/', payload)
                                    .then(function (response) {
                                        console.log("added successfull");
                                        setSavedItem("category");
                                        setSuccess(true);
                                        setAlertOpen(true);
                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                    });
                                    setCategory({
                                        category_name: newValue.inputValue
                                    });
                                    setPossibleQuests(newValue.inputValue)

                                } else {
                                    if (newValue !== null) {
                                        setCategory(newValue);
                                        setPossibleQuests(newValue.category_name)

                                    }
                                }

                            }}
                            filterOptions={(options, params) => {
                                const filtered = filter(options, params);

                                const { inputValue } = params;
                                const isExisting = options.some((option) => inputValue === option.category_name);
                                if (inputValue !== '' && !isExisting) {
                                filtered.push({
                                    inputValue,
                                    category_name: `Add "${inputValue}"`,
                                });
                                }

                                return filtered;
                            }}
                            selectOnFocus
                            clearOnBlur
                            handleHomeEndKeys
                            id="select-category"
                            options={categories}
                            getOptionLabel={(option) => {
                                if (typeof option === 'string') {
                                    return option;
                                  }
                                  // Add "xxx" option created dynamically
                                  if (option.inputValue) {
                                    return option.inputValue;
                                  }
                                  // Regular option
                                  return option.category_name;
                            }}
                            renderOption={(props, option) => <li {...props}>{option.category_name}</li>}
                            sx={{ width: "97%" }}
                            freeSolo
                            renderInput={(params) => (
                                <Box>
                                    <Typography variant="h6" sx={{mb:1}}>
                                        Category
                                    </Typography>
                                    <TextField
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    {...params} label="Add or Select" />
                                </Box>
                            )}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4} >
                        <Autocomplete
                            disabled={!category}
                            value={quest}
                            onChange={(event, newValue) => {
                                setLoading(true);
                                if (typeof newValue === 'string') {
                                    setQuest({
                                        quest_name: newValue
                                    });
                                } else if (newValue && newValue.inputValue) {

                                    const payload = {
                                        quest_name: newValue.inputValue,
                                        category_name: category.category_name
                                    };
                                    const endpoint = process.env.REACT_APP_API_ENDPOINT === null ? "https://fastapi-ernestang98.cloud.okteto.net/" : process.env.REACT_APP_API_ENDPOINT
                                    axios.post(endpoint + 'quest/', payload)
                                    .then(function (response) {
                                        console.log("added successfull");
                                        setSavedItem("quest");
                                        setSuccess(true);
                                        setAlertOpen(true);
                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                    });
                                    setQuest({
                                        quest_name: newValue.inputValue
                                    });
                                } else {
                                    if (newValue !== null) {
                                        setQuest({
                                            quest_name: newValue.quest_name
                                        })
                                    }
                                }
                                setLoading(false);
                            }}
                            filterOptions={(options, params) => {
                                const filtered = filter(options, params);

                                const { inputValue } = params;
                                const isExisting = options.some((option) => inputValue === option.quest_name);
                                if (inputValue !== '' && !isExisting) {
                                filtered.push({
                                    inputValue,
                                    quest_name: `Add "${inputValue}"`,
                                });
                                }

                                return filtered;
                            }}
                            selectOnFocus
                            clearOnBlur
                            handleHomeEndKeys
                            id="select-quest"
                            options={questOptions}
                            getOptionLabel={(option) => {
                                if (typeof option === 'string') {
                                    return option;
                                  }
                                  // Add "xxx" option created dynamically
                                  if (option.inputValue) {
                                    return option.inputValue;
                                  }
                                  // Regular option
                                  return option.quest_name;
                            }}
                            renderOption={(props, option) => <li {...props}>{
                                option.quest_name
                                // quest.category_name.includes(option.quest_name.slice(0, 5)) ?  option.quest_name : null
                            }</li>}
                            sx={{ width: "97%" }}
                            freeSolo
                            renderInput={(params) => (
                                <Box>
                                    <Typography variant="h6" sx={{mb:1}}>
                                        Quest
                                    </Typography>
                                    <TextField
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    {...params} label="Add or Select" />
                                </Box>
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} >
                        <Autocomplete
                        disabled={!quest}
                            value={subquest}
                            onChange={(event, newValue) => {
                                setLoading(true);
                                if (typeof newValue === 'string') {
                                    setSubquest({
                                        subquest_name: newValue
                                    });
                                } else if (newValue && newValue.inputValue) {
                                    const payload = {
                                        quest_name: quest.quest_name,
                                        subquest_name: newValue.inputValue
                                    };
                                    const endpoint = process.env.REACT_APP_API_ENDPOINT === null ? "https://fastapi-ernestang98.cloud.okteto.net/" : process.env.REACT_APP_API_ENDPOINT
                                    axios.post(endpoint + 'subquest/', payload)
                                    .then(function (response) {
                                        console.log("added successfull");
                                        setSavedItem("subquest");
                                        setSuccess(true);
                                        setAlertOpen(true);
                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                    });



                                    setSubquest({
                                        subquest_name: newValue.inputValue
                                    });

                                } else {
                                    if (newValue !== null) {
                                        setSubquest({
                                            subquest_name: newValue.subquest_name
                                        })
                                    }
                                }
                                setLoading(false);

                            }}
                            filterOptions={(options, params) => {
                                const filtered = filter(options, params);

                                const { inputValue } = params;
                                const isExisting = options.some((option) => inputValue === option.subquest_name);
                                if (inputValue !== '' && !isExisting) {
                                filtered.push({
                                    inputValue,
                                    subquest_name: `Add "${inputValue}"`,
                                });
                                }

                                return filtered;
                            }}
                            selectOnFocus
                            clearOnBlur
                            handleHomeEndKeys
                            id="select-subquest"
                            options={subquestOptions}
                            getOptionLabel={(option) => {
                                if (typeof option === 'string') {
                                    return option;
                                  }
                                  // Add "xxx" option created dynamically
                                  if (option.inputValue) {
                                    return option.inputValue;
                                  }
                                  // Regular option
                                  return option.subquest_name;
                            }}
                            renderOption={(props, option) => <li {...props}>{option.subquest_name}</li>}
                            sx={{ width: "97%" }}
                            freeSolo
                            renderInput={(params) => (
                                <Box>
                                    <Typography variant="h6" sx={{mb:1}}>
                                        Subquest
                                    </Typography>
                                    <TextField
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    {...params} label="Add or Select" />
                                </Box>
                            )}
                        />
                    </Grid>
                </Grid>
                <Grid container boxShadow={5} sx={{ paddingX:6, paddingY: 2, marginLeft:0, backgroundColor: '#353535', borderRadius: 5}} spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <FormControl variant="standard" sx={{minWidth: 200, mb:1 }}>
                            <InputLabel id="demo-simple-select-filled-label">Difficulty</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={difficulty}
                                onChange={handleChange}>
                                {QUEST.map((item) => (
                                    <MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
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
                        <Button variant="contained" onClick={()=> {handleAlertOpen(); createQuestion(); setLoading(true)}}>Save and Add Another Question</Button>
                        {success && <Snackbar open={alertOpen} autoHideDuration={4000} onClose={handleAlertClose}>
                            <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
                                Successfully added new {savedItem}!
                            </Alert>
                        </Snackbar>}
                        {error && <Snackbar open={alertOpen} autoHideDuration={4000} onClose={handleAlertClose}>
                            <Alert onClose={handleAlertClose} severity="error" sx={{ width: '100%' }}>
                                Unable to save question!
                            </Alert>
                        </Snackbar>}
                    </Grid>
                </Grid>
            </Box>
            {loading && <Box xs={12} sx={{mt:3}} justifyContent="center" alignItems="center">
                <LinearProgress />
            </Box>}

        </Box>
    )

}

export default CreateMain;
