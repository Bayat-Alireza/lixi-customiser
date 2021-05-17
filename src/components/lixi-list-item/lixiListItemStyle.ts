import { Theme, makeStyles, createStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    subItem: {
      "&:hover": {
        backgroundColor: "rgba(255, 240, 225,01)",
        color:  theme.palette.primary.main,
      },
    },
    searchIcon: {
      "&:hover": {
        color: theme.palette.primary.main,
      },
    },
  })
);
