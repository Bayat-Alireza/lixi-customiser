import { Theme, createStyles, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    itemLabel: {
      padding: "0.1rem",
      margin: "0.5rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      [theme.breakpoints.down("sm")]: {
        display: "inline-block",
      },
    },
    itemDescription: {
       maxWidth: "75ch", 
       marginBottom: "1rem", 
       [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
  })
);
