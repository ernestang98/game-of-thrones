import * as React from 'react';
import Typography from '@mui/material/Typography';
import '@fontsource/roboto/500.css';
import {
    Box,
    Grid,
    Card,
    CardMedia,
    CardContent,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import {Link} from "react-router-dom";
import GroupsIcon from '@mui/icons-material/Groups';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import indiv_student from './static/images/indiv_student.jpg';
import group_of_students from './static/images/group_of_students.jpg';

/**
 * render Report screen to allow admin to select between cohort and individual reports
 * @returns {JSX.Element}
 * @constructor
 */
function ReportScreen() {
    return (
        <Box sx={{ my: 5, }}>
            <Typography flex-grow={1} align="center" variant="h3">
                Select Report Category
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
                <Grid 
                container
                spacing={2}
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
                >
                    <Card
                    sx={{ my: 7 }}
                    >
                        <CardMedia
                        component="img"
                        height="300"
                        src={indiv_student}
                        alt="Individual Student"
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Individual Students
                        </Typography>
                        <List>
                            <ListItem id="indiv-link" button component={Link}  to="/indiv-report" disablePadding>
                                <ListItemButton>
                                <ListItemIcon>
                                    <EmojiPeopleIcon />
                                </ListItemIcon>
                                <ListItemText primary="Individual Performance Score" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                        
                        </CardContent>
                    </Card>
                    <Card
                    sx={{ my: 7 }}
                    >
                        <CardMedia
                        component="img"
                        height="300"
                        src={group_of_students}
                        alt="Group of Students"
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Student Cohort
                        </Typography>
                        <List>
                            <ListItem id="cohort-link" button component={Link}  to="/cohort-report" disablePadding>
                                <ListItemButton>
                                <ListItemIcon>
                                    <GroupsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Cohort Performance Score" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                        </CardContent>
                    </Card>
                </Grid>
            </Box>
        </Box>
    );
}

export default ReportScreen;
