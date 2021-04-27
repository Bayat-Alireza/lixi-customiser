import { Theme, createStyles, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      // backgroundColor: "#333",
      width: "max-content",
      alignItems: "right",
      margin: theme.spacing(1.5, 0, 0, 0),
    },
    transactions: {
      margin: theme.spacing(1.5, 0, 0, 0),
      padding: "0.1rem 1rem",
      display: "flex",
      // width: "100%",
      justifyContent: "flex-start",
      [theme.breakpoints.down("sm")]: {
        display: "inline-block",
      },
    },
  })
);
