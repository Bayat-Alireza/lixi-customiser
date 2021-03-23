import { Theme, makeStyles, createStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    subItemHeader: {
      zIndex: 2,
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: "#fff8e1",
      // marginBottom: "0.2rem",
      borderRadius: "0.2rem",
      maxHeight: "5rem",
      color: theme.palette.primary.main,
    },

    viewItem: {
      "&:hover": {
        color: "#3f51b5",
      },
    },
  })
);
