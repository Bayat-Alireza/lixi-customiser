import { Theme, makeStyles, createStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: "none",
    },
    faceImage: {
      color: theme.palette.primary.light,
    },

    fileName: {
      "&:hover": {
        cursor: "pointer",
      },
    },
  })
);
