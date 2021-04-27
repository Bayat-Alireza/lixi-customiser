import { Theme, createStyles, makeStyles, darken } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
    list: {
      height: "40vh",
      overflowY: "scroll",
      width: "100%",
      margin: theme.spacing("0.5rem", 0),
      // border: "solid red 0.1rem",
      paddingTop: "0",
    },
    subItemHeader: {
      zIndex: 2,
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
      backgroundColor: "#fff8e1",
      borderRadius: "0.2rem",
      maxHeight: "5rem",
      color: theme.palette.primary.main,
      cursor: "pointer",
      "&:hover": {
        backgroundColor: darken("#fff8e1", 0.1),
        color: theme.palette.text.primary,
      },
    },
    item: {
      cursor: "pointer",
      "&:hover": {
        backgroundColor: theme.palette.action.hover,
        color: theme.palette.primary.dark,
      },
    },

    selectAllText: {},
  })
);
