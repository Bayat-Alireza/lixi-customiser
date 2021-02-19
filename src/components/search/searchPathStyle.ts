import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { Palette } from "@material-ui/icons";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listbox: {
      boxSizing: "border-box",

      "& ul": {
        padding: 0,
        margin: 0,
        "& li:hover": {
          borderBottom: "solid #444 0.05rem",
          backgroundColor: theme.palette.primary.light,
          color: theme.palette.primary.contrastText,
        },
       
      },
    },
    root: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      marginTop: "0rem",
    },
   
  })
);
