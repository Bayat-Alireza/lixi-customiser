import { Theme, makeStyles, createStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    saveMinMax: {
      padding: "0.5rem",
      display: "flex",
      gap: "0.5rem",
      justifyContent: "space-between",
      alignItems: "center",
    },
    minMaxContainer: {
      display: "flex",
      justifyContent: "space-between",
      gap: "0.5rem",
    },
    textFieldMinMax: {
      width: "10rem",
    },
    saveButton: {
      width: "100%",
      display: "flex",
      justifyContent: "flex-end",
    },
  })
);
