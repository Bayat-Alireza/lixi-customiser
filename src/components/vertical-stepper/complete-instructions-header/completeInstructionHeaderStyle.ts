import { Theme, makeStyles, createStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(0, 1, 0, 0),
      width: "10rem",
    },
    selectObtion: {
      // width: "12rem",
    },
    uploadContainer: {
      alignItems: "center",
      width: "inherit",

      display: "flex",
      justifyContent: "flex-start",
      marginTop: "1rem",
      padding: "1rem 1rem",
      height: "max-content",
      backgroundColor: "#fffde7",
    },
    upload: {
      alignItems: "center",
      display: "flex",
      justifyContent: "space-between",
      width: "80%",
      backgroundColor: "#fffde7",
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    nextButton: {
      marginLeft: "0.5rem",
    },
    backButton: {
      marginLeft: "0.5rem",
    },
    skipButton: {
      marginLeft: "0.5rem",
    },
  })
);
