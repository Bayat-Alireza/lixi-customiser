import { Theme, makeStyles, createStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    subItem: {
      height: "35rem",
      // maxHeight: "12rem",
      overflow: "scroll",
      "&::-webkit-scrollbar": {
        width: "0.4em",
      },
      "&::-webkit-scrollbar-track": {
        boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
        webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: theme.palette.primary.light,
        outline: "1px solid slategrey",
      },
      paddingTop: "0",
    },
  })
);
