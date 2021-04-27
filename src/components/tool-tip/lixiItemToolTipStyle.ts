import { Theme, makeStyles, createStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    viewItem: {
      "&:hover": {
        color: "#3f51b5",
      },
    },
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      // boxShadow: theme.shadows[1],
      fontSize: 16,
    },
    tooltip2: {
      backgroundColor: "#fff",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(16),
    },
  })
);
