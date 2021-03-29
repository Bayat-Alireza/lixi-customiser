import { Theme, createStyles, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},

    helperText: {
      width: "100%",
      padding: "0.5rem 0.2rem",
      position: "absolute",
      background: "#fff8e1",
      borderColor: theme.palette.error.main,
      borderStyle: "solid",
      borderWidth: "0.1rem",
      borderRadius: "0.2rem",
      zIndex: 20,
      boxSizing: "border-box",
      marginTop: "2.7rem",
    },
  })
);
