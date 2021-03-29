import { Theme, createStyles, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    name: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
    },
    definition: {
      marginBottom: 12,
      marginLeft: "2.7rem",
      width: "75ch",
    },
    root: {
      width: "100%",
    },
    row: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
    },
  })
);
