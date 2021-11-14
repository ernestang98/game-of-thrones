import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import '@fontsource/roboto/500.css';
import AssignScreen from './AssignmentStudent';
import QuestionScreen from './QuestionScreen';
import ReportScreen from './ReportScreen';
// import IndivReportScreen from './IndiviReportScreen';
import IndividualReportScreen from './IndividualReportScreen';
import CohortReportScreen from './CohortReportScreen';
import HomeScreen from './HomeScreen';
import TableScreen from './TableScreen';
import {BrowserRouter, Route, Switch, Link} from "react-router-dom";
import ButtonAppBar from './AppBar';
import AssignmentMain from "./AssignmentMain";
import CreateMain from "./CreateMain";


/**
 * function to handle routing in the web app
 * @returns {JSX.Element}
 * @constructor
 */
export default function App() {
    return (
        <Container disableGutters maxWidth={false} sx={{ mx:0, px:0}}>
            <Switch>
                    <Route path="/create">
                        <ButtonAppBar />
                        <CreateMain/>
                    </Route>
                    <Route path="/questions">
                        <ButtonAppBar />
                        <TableScreen/>
                    </Route>
                    <Route path="/second">
                        <ButtonAppBar />
                        <AssignmentMain/>
                    </Route>
                    <Route path="/report">
                        <ButtonAppBar />
                        <ReportScreen/>
                    </Route>
                    <Route path="/indiv-report">
                        <ButtonAppBar />
                        <IndividualReportScreen/>
                    </Route>
                    <Route path="/cohort-report">
                        <ButtonAppBar />
                        <CohortReportScreen/>
                    </Route>
                    <Route path="/table">
                        <ButtonAppBar />
                        <QuestionScreen/>
                    </Route>
                    <Route path="/">
                        <ButtonAppBar />
                        <HomeScreen/>
                    </Route>
                </Switch>
        </Container>
    );
}
