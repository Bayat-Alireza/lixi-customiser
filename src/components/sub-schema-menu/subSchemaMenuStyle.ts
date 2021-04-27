import { Theme, createStyles, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      // width: "max-content",
      // color: theme.palette.getContrastText(theme.palette.primary.main),
      minWidth: "10rem",
      height: "inherit",
      marginLeft: "0.05rem",
      display: "flex",
      justifyContent: "space-between",
    },
  })
);
