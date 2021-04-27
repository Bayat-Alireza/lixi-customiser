import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./navTabsStyle";
interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

export const TabPanel: React.FC<TabPanelProps> = (props: TabPanelProps) => {
  const classes = useStyles();
  const { children, value, index, ...other } = props;

  return (
    <div
      className={classes.root}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className={classes.tabPanelChildren}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
};
