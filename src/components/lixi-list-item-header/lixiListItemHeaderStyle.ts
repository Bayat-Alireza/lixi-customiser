import { Theme, makeStyles, createStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container:    {
      position:    "sticky",
      top:    "0rem",
      backgroundColor: "rgba(255, 248, 225,1)",
      zIndex:    2,
      "&:hover": {
        backgroundColor: "rgba(255, 240, 225,01)",
      },
    },
    subItemHeader: {
      display: "flex",
      justifyContent: "space-between",
      borderRadius: "0.2rem",
      maxHeight: "5rem",
      color: theme.palette.primary.main,
    },
  })
);
