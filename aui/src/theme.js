import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#507D40',
        },
        background: {
            default: '#272727',
            paper: '#424242'
        },
    }
/*    palette: {
        primary: {
            main: '#507D40',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
    },*/
});

export default theme;
