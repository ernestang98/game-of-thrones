import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {Link} from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
//import {AppBar} from "@material-ui/core";
import {AppBar} from "@mui/material";

/**
 * function to generate app bar
 * @returns {JSX.Element}
 * @constructor
 */
function ButtonAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar sx={{p:1}} style={{ background: '#507D40'}} position="static">
                <Toolbar>
                    <IconButton component={Link} to={'/'} size="large" edge="start" color="inherit" aria-label="home" sx={{ mr: 2 }}>
                        <HomeIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        SSAD Teachers Portal
                    </Typography>
                    <Box sx={{mr:5}}>
                        <Button sx={{mx:2}} color="inherit" component={Link} to={'/create'}>
                            <Typography variant="button">
                                Create
                            </Typography>
                        </Button>
                        <Button sx={{mx:2}} color="inherit" component={Link} to={'/questions'}>
                            <Typography variant="button">
                                Question Bank
                            </Typography>
                        </Button>
                        <Button sx={{mx:2}} color="inherit" component={Link} to={'/second'}>
                            <Typography variant="button">
                                Assign
                            </Typography>
                        </Button>
                        <Button sx={{mx:2}} color="inherit" component={Link} to={'/report'}>
                            <Typography variant="button">
                                View Report
                            </Typography>
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default ButtonAppBar;