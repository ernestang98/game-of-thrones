import React, { useEffect } from 'react';
import {
    Typography,
    Box,
    Stack,
    Fab,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
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

import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import OneKPlusIcon from '@mui/icons-material/OneKPlus';

import NavigationIcon from '@mui/icons-material/Navigation';

/**
 * render Cohort Report Screen
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

    const [cohortResults, setCohortResults] = React.useState([]);
    const [bestStudent, setBestStudent] = React.useState({
        /**
         * Student email
         */
        student_email: "",
        /**
         * Student's total points earned so far
         */
        points_earned: 0,
        /**
         * In-game's total earnable points
         */
        max_points_earnable: 0,
        status: 0,
        /**
         * Student name
         */
        name: "",
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

    /**
     * Retrieve entire cohort results and details
     */
    const getCohortResults = () => {
        const endpoint = process.env.REACT_APP_API_ENDPOINT === null ? "https://fastapi-ernestang98.cloud.okteto.net/" : process.env.REACT_APP_API_ENDPOINT
        axios.get(endpoint + "attempt/cohortresults/")
        .then( function(res) {
            let cohortArray = res.data;
            cohortArray.forEach( function(arrayItem) {
                arrayItem["percentage_correct"] = (( arrayItem["points_earned"] / arrayItem["max_points_earnable"] ) * 100).toFixed(2);
            })
            setCohortResults(cohortArray);
            getBestStudent();
        })
        .catch( function(err) {
            console.log(err);
        })
    }

    /**
     * Calculate and find best performing student in the cohort and set the state of best student
     */
    const getBestStudent = () => {
        var highest_points_earned = Math.max.apply(Math,cohortResults.map(function(o){return o.points_earned;}))
        console.log(highest_points_earned);
        var bestStudentObj = cohortResults.find(function(o){ return o.points_earned == highest_points_earned; });
        console.log(bestStudentObj);
        setBestStudent(bestStudentObj);
    }

    /**
     * Hook to retrieve cohort results before rendering of DOM
     */
    useEffect( ()=> {
        getCohortResults();
    })

    return (
            <Box sx={{ my: 5, justifyContent: "center", flexDirection: "row", alignItems: "center" }}>
                <Stack
                spacing={5}
                justifyContent="center"
                alignItems="center">
                     <Fab id="indiv-link" variant="extended" color="primary" component={Link} to={"/indiv-report"}>
                        <NavigationIcon sx={{ mr: 1 }} />
                        Individual Student Report
                    </Fab>
                    <Typography align="center" variant="h3">
                        Cohort Report
                    </Typography>
                    <Box
                     sx={{
                        width: 300,
                        // height: 300,
                    }}
                    >
                        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            <List>
                                <ListItem>
                                    <ListItemIcon>
                                        <LocalFireDepartmentIcon />
                                    </ListItemIcon>
                                    { bestStudent &&
                                        <ListItemText>
                                            Best Performing Student: {bestStudent.name}
                                        </ListItemText>
                                    }

                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <OneKPlusIcon />
                                    </ListItemIcon>
                                    { bestStudent &&
                                        <ListItemText>
                                            Total Points Earned: {bestStudent.points_earned}
                                        </ListItemText>
                                    }
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
                                { title: 'Name', field: 'name' },
                                { title: 'Rank', field: 'rank', type: 'numeric' },
                                { title: 'Position', field: 'position', type: 'numeric' },
                                { title: 'Points Earned', field: 'points_earned', type: 'numeric' },
                                { title: 'Percentage Correct', field: 'percentage_correct', type: 'numeric' },

                            ]}
                            data={cohortResults}
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