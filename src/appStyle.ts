import { Theme, createStyles, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      minHeight: "100vh",
      backgroundColor: "#333",
      padding: "1rem",
    },
    main: {
      backgroundColor: "#fff",
      width: "50%",
      margin: "auto",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
      [theme.breakpoints.up("md")]: {
        width: "70%",
      },
    },
  })
);
