import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      padding: 0,
      margin: 0,
      // margin: theme.spacing(1),
    },
    stepper:  {
      padding:  "0.5rem",
      margin:  "0.5rem",
      [theme.breakpoints.down("xs")]:{
        padding:  "0.2rem",
        margin:  "0.2rem"
      }
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    resetContainer: {
      padding: theme.spacing(0, 2, 2),
    },
    customisationContainer: {
      padding: theme.spacing(2, 2, 2),
      margin: theme.spacing(1, 0, 1),
    },
  })
);
