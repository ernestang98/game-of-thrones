import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import ButtonAppBar from './AppBar'
import Button from '@mui/material/Button';
import '@fontsource/roboto/500.css';

import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup, FormHelperText,
    FormLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select
} from "@mui/material";


import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
const editQuestion = () => {
  //function to edit question 
  };

function QuestionEdit() {
    
    const [question, setQuest] = React.useState('');

    const handleChange = (event) => {
        setQuest(event.target.value);
    };


    return (

            <Container maxWidth="xl" sx={{boxShadow:4, justifyContent: "center", py:5}}>
                <Grid container spacing={2} sx={{ px:5}} justifyContent="center">
                    <Grid item xs={12}>
                        <Typography variant="h5">
                            Modify Question
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="filled" sx={{ my:3, minWidth: 200}}>
                            <InputLabel id="demo-simple-select-filled-label">Question</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={question}
                                onChange={handleChange}>
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>What is ... </MenuItem>
                                <MenuItem value={20}>How many ... </MenuItem>
                                <MenuItem value={30}>Why is ... </MenuItem>
                            </Select>
                            <Button
                    variant="contained"
                    onClick={editQuestion}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Edit Question
                  </Button>
                  <Button
                    variant="contained"
                    onClick={editQuestion}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Delete Question
                  </Button>
                        </FormControl>
                    </Grid>
                </Grid>
            </Container>
        );

};

function QuestionAdd() {
    return (
        <Container maxWidth="xl" sx={{boxShadow:4, justifyContent: "center", py:5}}>
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >

              <Typography component="h1" variant="h5">
                Add Question 
              </Typography>
              <Box component="form" /*onSubmit={handleSubmit} noValidate */sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="question"
                  label="Question"
                  name="question"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="answer"
                  label="Answer"
                  type="answer"
                  id="answer"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="option2"
                  label="Option2"
                  type="option2"
                  id="option2"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="option3"
                  label="Option3"
                  type="option3"
                  id="option3"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="option4"
                  label="Option4"
                  type="option4"
                  id="option4"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </Button>

              </Box>
            </Box>
          </Container>);
}

function QuestionTable(){

};

export default function AssignScreen() {
    return (
        <Box sx={{ my: 2, }}>
            <Typography sx={{mx: 1}} variant="h4" component="h1" gutterBottom>
                Manage Questions
            </Typography>
            <QuestionEdit />
            {/* <QuestionEdit2 /> */}
            <QuestionAdd />
        </Box>
        
    );
    
    }