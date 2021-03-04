import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // display: "flex",
      // justifyContent: "center",
      paddingLeft: "0.5rem",
      borderLeft: "solid 0.5rem #3f51b5",
      borderRadius: "0.2rem",
    },
    link: {
      display: "flex",
      cursor: "pointer",
      color: theme.palette.primary.dark,
      "&:hover": {
        backgroundColor: "#fff8e1",
        borderBottom: "solid 0.1rem #3f51b5",
      },
    },
    icon: {
      marginRight: theme.spacing(0.25),
      color: theme.palette.primary.dark,
      width: 20,
      height: 20,
    },
    leafLink: {
      color: theme.palette.primary.main,
      "&:hover": {
        backgroundColor: "#fff8e1",
      },
    },
  })
);
