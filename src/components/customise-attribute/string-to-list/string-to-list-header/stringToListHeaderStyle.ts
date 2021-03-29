import { Theme, createStyles, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      error: {
        position: "fixed",
      },
    },
    header: {
      display: "flex",
      padding: theme.spacing(0.5, 1, 1.5),
      justifyContent: "space-between",
      backgroundColor: "#fff8e1",
      marginBottom: "0.2rem",
      borderRadius: "0.1rem",
      alignItems: "center",
    },
    textField: {
      backgroundColor: "#fff",
    },
  })
);
