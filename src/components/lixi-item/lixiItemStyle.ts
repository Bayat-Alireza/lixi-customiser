import { Theme, createStyles, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: "1rem",
      backgroundColor: "##fafafa",
      border: "solid #333 0.1rem",
      borderRadius: "0.3rem",
    },
    header: {
      display: "flex",
      padding: "0.5rem",
      justifyContent: "space-between",
      backgroundColor: "#fff8e1",
      marginBottom: "0.2rem",
      borderRadius: "0.1rem",
      alignItems: "center",
    },
    subItemHeader: {
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: "#fff8e1",
      marginBottom: "0.2rem",
      borderRadius: "0.2rem",
      maxHeight: "5rem",
      color: theme.palette.primary.main,
    },
    subItem: {
      height: "12rem",
      maxHeight: "12rem",
      overflow: "scroll",
    },

    itemLabelDescription: {
      padding: "0.1rem",
      margin: "0.5rem",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      [theme.breakpoints.down("sm")]: {
        display: "inline-block",
      },
    },
    attributes: {
      margin: theme.spacing(1.5, 0, 0, 0),
      padding: "0.1rem 1rem",
      display: "flex",
      justifyContent: "flex-start",
      [theme.breakpoints.down("sm")]: {
        display: "inline-block",
      },
    },
    references: {
      display: "flex",
      alignItems: "center",
    },
    alert: {
      color: "orange",
      backgroundColor: "#333",
      "&:hover": {
        color: "#333",
        backgroundColor: "orange",
      },
    },
    typeAttribute: {
      cursor: "pointer",

      "&:hover": {
        color: theme.palette.primary.main,
      },
    },
    otherAttribute: {
      cursor: "not-allowed",
    },
  })
);
