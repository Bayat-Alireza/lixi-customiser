import { Theme, createStyles, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    uploadContainer: {
      width: "max-content",
      alignItems: "center",
      display: "flex",
      justifyContent: "flex-start",
      marginTop: "1rem",
      padding: "0.2rem 0.5rem",
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
      margin: theme.spacing(1, 0, 1, 0),
      // width: "max-content",
    },
    nextButton: {
      marginLeft: "0.1rem",
    },
    backButton: {
      marginLeft: "0.1rem",
    },
    skipButton: {
      marginLeft: "0.1rem",
    },
  })
);
