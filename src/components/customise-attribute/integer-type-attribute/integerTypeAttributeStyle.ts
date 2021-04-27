import { Theme, makeStyles, createStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      marginBottom: "0.5rem",
      gap: "0.5rem",
    },
    paper: {
      padding: "0.5rem",
      margin: "0.5rem 0.2rem",
    },
    saveButton: {
      width: "max-content",
      height: "max-content",
    },
  })
);
