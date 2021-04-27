import { makeStyles, createStyles, Theme } from "@material-ui/core";

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
      margin: theme.spacing(1, 0, 1, 0),
    },
    nextButton: {
      marginLeft: "0.5rem",
    },
    fileDetailHeaderRow:{
      backgroundColor:theme.palette.primary.main,
    },
    fileDetailHeaderCell:{
      
      color:theme.palette.getContrastText(theme.palette.primary.main)
    }
  })
);
