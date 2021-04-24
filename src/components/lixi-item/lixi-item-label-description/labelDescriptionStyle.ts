import { Theme, createStyles, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    itemLabelDescription: {
      padding: "0.1rem",
      margin: "0.5rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      [theme.breakpoints.down("sm")]: {
        display: "inline-block",
      },
    },
  })
);
