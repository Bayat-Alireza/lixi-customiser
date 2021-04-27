import { Theme, makeStyles, createStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: "transparent",
    },

    paper: {
      // backgroundColor: "transparent",
      boxShadow: "1px 1px 3px #BDBDBD",
      overflow: "hidden",
      padding: theme.spacing(0),
    },
    alert: {
      color: "#c43e00",
      "&:hover": {
        color: "#ff8f00",
      },
    },
    button: {
      color: "orange",
      backgroundColor: "#333",
      "&:hover": {
        color: "#333",
        backgroundColor: "orange",
      },
    },
  })
);
