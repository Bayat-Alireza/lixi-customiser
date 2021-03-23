import { Theme, createStyles, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},

    helperText: {
      position: "fixed",
      marginTop: "2.5rem",
    },
  })
);
