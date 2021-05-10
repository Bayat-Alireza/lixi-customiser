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
      width:"100%",
      margin:"auto",
      // padding: "0.5rem 0",
      // display: "flex",
      gap: "0.5rem",
      // justifyContent: "space-between",
      alignItems: "center",
    },
    minMaxContainer: {
      // width:"50%",
      margin:"auto",
      display: "flex",

      justifyContent: "space-between",
      gap: "0.5rem",
    },
    textFieldMinMax: {
      // width: "10rem",
    },
    saveButton: {
      // width: "100%",
      display: "flex",
      justifyContent: "flex-end",
    },
    customisationTitleContainer: {
      display: "flex",
      justifyContent:  "space-between",
      padding: "0.5rem",
      backgroundColor: theme.palette.primary.main,
      // color: theme.palette.text.primary,
    },
    customisationTitle: {
      color: theme.palette.getContrastText(theme.palette.primary.main),
    },
    customisationTitleExclusion: {
      color: theme.palette.secondary.main,
    },
    customisationTitleInclusion: {
      color: theme.palette.getContrastText(theme.palette.primary.main),
    },

    customisationTooltip: {
      // backgroundColor: "#f5f5f9",
      // color: "rgba(0, 0, 0, 0.87)",
      // maxWidth: 220,
      // fontSize: theme.typography.pxToRem(12),
      // border: "1px solid #dadde9",
    },
  })
);
