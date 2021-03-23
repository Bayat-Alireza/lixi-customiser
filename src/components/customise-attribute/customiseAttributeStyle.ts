import { Theme, createStyles, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
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
    saveButton: {
      width: "max-content",
      height: "max-content",
    },
  })
);
