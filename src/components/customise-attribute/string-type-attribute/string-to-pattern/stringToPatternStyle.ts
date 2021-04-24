import { Theme, createStyles, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      marginBottom: "0.5rem",
      width: "100%",
    },
    helperText: {
      width: "20rem",
      padding: "0.5rem 0.2rem",
      position: "absolute",
      background: "#fff8e1",
      borderColor: theme.palette.error.main,
      borderStyle: "solid",
      borderWidth: "0.1rem",
      borderRadius: "0.2rem",
      zIndex: 20,
      boxSizing: "border-box",
      // marginTop: "2.7rem",
    },
  })
);
