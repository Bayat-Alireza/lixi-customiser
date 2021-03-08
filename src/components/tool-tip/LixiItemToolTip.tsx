import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import InfoTwoToneIcon from "@material-ui/icons/InfoTwoTone";
import { useStyles } from "./lixiItemToolTipStyle";
import { LixiBase } from "../../models/LixiBase";

interface IToolTip {
  lixiItem: LixiBase;
  placement:
    | "top-start"
    | "top"
    | "top-end"
    | "left-start"
    | "left"
    | "left-end"
    | "right-start"
    | "right"
    | "right-end"
    | "bottom-start"
    | "bottom"
    | "bottom-end";
}

export const LixiItemToolTip: React.FC<IToolTip> = ({
  lixiItem,
  placement,
}) => {
  const classes = useStyles();
  return (
    <Tooltip
      placement={placement}
      className={classes.tooltip2}
      title={
        <React.Fragment>
          <Typography color="inherit">{lixiItem.label}</Typography>
          {lixiItem.documentation}
        </React.Fragment>
      }
    >
      <InfoTwoToneIcon className={classes.viewItem} fontSize="small" />
    </Tooltip>
  );
};
