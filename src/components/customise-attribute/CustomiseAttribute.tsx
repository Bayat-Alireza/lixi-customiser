import Typography from "@material-ui/core/Typography";
import React from "react";
import { useStyles } from "./customiseAttributeStyle";
export const CustomiseAttribute: React.FC = () => {
  const classes = useStyles();
  return <Typography className={classes.root}>Customise Attribute </Typography>;
};
