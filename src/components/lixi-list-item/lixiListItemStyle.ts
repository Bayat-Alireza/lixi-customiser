import { Theme, makeStyles, createStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    subItem: {
      height: "16rem",
      // maxHeight: "12rem",
      overflow: "scroll",
    },
    viewItem: {
      "&:hover": {
        color: "#3f51b5",
      },
    },
  })
);
