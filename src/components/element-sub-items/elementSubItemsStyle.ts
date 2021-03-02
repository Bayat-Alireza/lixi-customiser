import { Theme, makeStyles, createStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    subItemHeader: {
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: "#fff8e1",
      // marginBottom: "0.2rem",
      borderRadius: "0.2rem",
      maxHeight: "5rem",
      color: theme.palette.primary.main,
    },
    subItem: {
      height: "16rem",
      // maxHeight: "12rem",
      overflow: "scroll",
    },
  })
);
