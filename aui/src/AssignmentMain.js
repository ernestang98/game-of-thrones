import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import '@fontsource/roboto/500.css';
import {
    Divider, Tab
} from "@mui/material";
import CreateMiniQ1 from "./AssignmentAdd";
import AssignmentStudent from "./AssignmentStudent";
import AssignmentManage from "./AssignmentManage";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import {
    FacebookIcon,
    FacebookShareButton,
    TwitterIcon,
    TwitterShareButton
} from "react-share";

/**
 * renders Assignment Main Screen - handles conditional rendering to move between different Assignment functions
 * display social media sharing button
 * @returns {JSX.Element}
 * @constructor
 */
function AssignmentMain() {
    const [value, setValue] = React.useState("1");

    /**
     * updates state to render a new component
     * @param event event
     * @param newValue value of selected component
     */
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    if (value == "1"){
        return (
            <Box sx={{ my: 2 }}>
                <Typography sx={{mx: 5, mb:3}} variant="h4" component="h1" gutterBottom>
                    Manage Assignments
                </Typography>
                <Box sx={{ width: '100%', typography: 'body1', display: 'flex', flexDirection: 'row', m: 'auto'}}>
                    <TabContext value={value}>
                        <Box sx={{ ml:4, borderBottom: 1, borderColor: 'divider', flex:6 }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab icon={<AssignmentIndIcon/>} label="Assign" value="1" />
                                <Tab icon={<AddCircleIcon/>} label="Add" value="2" />
                                <Tab icon={<EditIcon/>} label="Modify" value="3" />
                            </TabList>
                        </Box>
                    </TabContext>
                    <Box sx={{flex:1, borderBottom:1, borderColor: 'divider', display:'flex', alignItems:'end'}} >
                        <Box sx={{ mb:1, padding:1}}>
                            <Typography variant="h6">
                                Share to
                            </Typography>
                        </Box>
                        <Box sx={{mb: 1, mx: 2}}>
                            <FacebookShareButton url="www.facebook.com" quote="Facebook" >
                                <FacebookIcon size={45} round />
                            </FacebookShareButton>
                        </Box>
                        <Box sx={{mb:1}}>
                            <TwitterShareButton url="www.twitter.com" >
                                <TwitterIcon size={45} round />
                            </TwitterShareButton>
                        </Box>
                    </Box>
                </Box>
                <Divider />
                <AssignmentStudent/>

            </Box>
        );

    }

    else if (value == "2") {
        return (
            <Box sx={{ my: 2 }}>
                <Typography sx={{mx: 5, mb:3}} variant="h4" component="h1" gutterBottom>
                    Manage Assignments
                </Typography>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ mx: 4, borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab icon={<AssignmentIndIcon/>} label="Assign" value="1" />
                                <Tab icon={<AddCircleIcon/>} label="Add" value="2" />
                                <Tab icon={<EditIcon/>} label="Modify" value="3" />
                            </TabList>
                        </Box>
                    </TabContext>
                </Box>
                <Divider />
                <CreateMiniQ1/>
            </Box>
        );



    }

    else if (value == "3"){
        return (
            <Box sx={{ my: 2 }}>
                <Typography sx={{mx: 5, mb:3}} variant="h4" component="h1" gutterBottom>
                    Manage Assignments
                </Typography>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ mx: 4, borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab icon={<AssignmentIndIcon/>} label="Assign" value="1" />
                                <Tab icon={<AddCircleIcon/>} label="Add" value="2" />
                                <Tab icon={<EditIcon/>} label="Modify" value="3" />
                            </TabList>
                        </Box>
                    </TabContext>
                </Box>
                <Divider />
                <AssignmentManage/>
            </Box>
        );

    }

}

export default AssignmentMain;