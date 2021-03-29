import { Theme, makeStyles, createStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width:"inherit",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: "none",
    },
    findPageIcon: {
      color: theme.palette.primary.light,
    },

    loadIcon:{
      color: theme.palette.primary.main,

    },

    fileName: {
      backgroundColor: theme.palette.primary.light,
      width:"max-content",
      color: theme.palette.getContrastText(theme.palette.primary.light),
      padding: theme.spacing(0.75),
      borderRadius: "0.2rem",
      "&:hover": {
        cursor: "pointer",
      },
    },
    label:{ 
      display: "flex", alignItems: "center" 
    },
    uploadButton:{
      marginLeft: theme.spacing(1), 
      minWidth: "7rem",
     
    },
   
  })
);
