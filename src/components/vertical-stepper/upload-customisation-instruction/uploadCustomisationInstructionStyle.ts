import { Theme, createStyles, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    uploadContainer: {
      maxWidth: "75ch",
      minWidth: "15rem",
      alignItems: "center",
      display: "flex",
      justifyContent: "flex-start",
      marginTop: "1rem",
      padding: "0.2rem 0.5rem",
      height: "max-content",
      backgroundColor: "#fffde7",
    },
    upload: {
      alignItems: "center",
      display: "flex",
      justifyContent: "space-between",
      width: "80%",
      backgroundColor: "#fffde7",
    },
    actionsContainer: {
      display:"flex",
      margin: theme.spacing(1, 0, 1, 0),
      [theme.breakpoints.down("xs")]:{
        margin: theme.spacing(1, 1, 1, 1),
        flexDirection:"column",
      }
      
      // width: "max-content",
    },
    button: {
      marginLeft: "0.1rem",
      [theme.breakpoints.down("xs")]:{
        marginTop: "0.1rem",

      }
    },
    fileDetailHeaderRow:{
      backgroundColor:theme.palette.primary.main,
    },
    fileDetailHeaderCell:{
      
      color:theme.palette.getContrastText(theme.palette.primary.main)
    }
    
  })
);
