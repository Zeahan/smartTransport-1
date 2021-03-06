import React from 'react';
import PropTypes from 'prop-types';
import {createMuiTheme, makeStyles, ThemeProvider} from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {lightBlue, lightGreen} from "@material-ui/core/colors";

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: '17px',
    },
    lp: {
        height: '5px',
        border: '5px solid black'
    }
});

/* progress bar for a single grid */
function LinearProgressWithLabel(props) {
    const classes=useStyles();
    return (
        <Box display="flex" alignItems="center">
            {/*<Box minWidth={45}>*/}
            {/*    <Typography variant="body2" color="textSecondary">{props.barlabel}</Typography>*/}
            {/*</Box>*/}
            <Box width="100%" mr={1}>
                <LinearProgress className={classes.lp} variant="determinate" {...props} />
            </Box>
            <Box minWidth={30}>
                <Typography variant="body2" color="textSecondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
};



export function LinearWithValueLabel(props) {
    const theme = createMuiTheme({
        palette: {
            primary: lightBlue,
            secondary: lightGreen,
        },
    });

    const classes = useStyles();
    const [progress, setProgress] = React.useState(props.pre?props.pre:0);

    React.useEffect(() => {
        setProgress(props.curr);
    }, [props]);

    return (
        <div className={classes.root}>
            <ThemeProvider theme={theme}>
                <LinearProgressWithLabel barlabel={props.barlabel} color={props.color} value={progress} />
            </ThemeProvider>
        </div>
    );
}

export default function ProgressBarSet(props) {
    /**@type {[number, number]}*/
    const growth_values = props.growth_values;
    /**@type {[number, number]}*/
    const water_values = props.water_values;

    return (
        // <Fade in={true}>
            <Box {...props}>
                <LinearWithValueLabel  barlabel={"growth"} color={"secondary"}
                                      pre={growth_values[0]} curr={growth_values[1]}/>
                <LinearWithValueLabel barlabel={"water"} color={"primary"}
                                      pre={water_values[0]} curr={water_values[1]}/>
            </Box>
        // </Fade>
    );
}