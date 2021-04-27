import { makeStyles, createStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: "relative",
      overflow: "scroll",
      backgroundColor: "#444",
      maxHeight: "100vh",
      marginTop: "0.5rem",
      borderRadius: "0.1rem",
    },
    header: {
      position: "sticky",
      top: "0",
      right: "0",
      left: "0",
      padding: "0.5rem 1rem",
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: "#333",
      marginBottom: "1rem",
      borderRadius: "0.1rem",
      width: "inherit",
      boxShadow: "0.3rem 0.4rem #555",
      color: theme.palette.getContrastText("#333"),
    },
    downloadLink: {
      color: theme.palette.secondary.light,
      textDecoration: "none",
    },
  })
);
