import { Theme, createStyles, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: "1rem",
      backgroundColor: "##fafafa",
      border: "solid #333 0.1rem",
      borderRadius: "0.3rem",
    },
    header: {
      display: "flex",
      padding: "0.5rem",
      justifyContent: "space-between",
      backgroundColor: "#fff8e1",
      marginBottom: "0.2rem",
    },
    itemLabelDescriptin: {
      padding: "0.1rem",
      margin: "0.5rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    attributes: {
      padding: "0.1rem 1rem",
      display: "flex",
      justifyContent: "flex-start",
    },
    references: {
      display: "flex",
      alignItems: "center",
    },
  })
);
