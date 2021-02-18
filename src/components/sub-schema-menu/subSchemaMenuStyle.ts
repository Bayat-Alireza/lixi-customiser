import { Theme, createStyles, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      width: "max-content",
      minWidth: "135px",
      height: "inherit",
      margin: "0.05rem",
      display: "flex",
      justifyContent: "space-between",
    },
  })
);
