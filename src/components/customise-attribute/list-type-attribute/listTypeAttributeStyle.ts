import { Theme, createStyles, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
    saveButton: {
      width: "max-content",
      height: "max-content",
    },
  })
);
