import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import React from "react";
import { AppCheckBox } from "../formik-mterial-ui/AppCheckBox";
import IndeterminateCheckBoxTwoToneIcon from "@material-ui/icons/IndeterminateCheckBoxTwoTone";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
import { useStyles } from "./lixiListItemHeaderStyle";

interface IHeaderLixiItem {
  name: "includeAllElements" | "includeAllAttributes";
  header: string;
  itemsLength: number;
  selectedItemsLength: number;
  toggle: () => void;
  includesAll: boolean;
}

export const LixiListItemHeader: React.FC<IHeaderLixiItem> = ({
  name,
  toggle,
  itemsLength,
  selectedItemsLength,
  header,
  includesAll,
}) => {
  const classes = useStyles();
  return (
    <ListSubheader
      style={{ marginTop: "0", alignItems: "center" }}
      className={classes.subItemHeader}
    >
      <ListItemIcon>
        <AppCheckBox
          name={name}
          checked={selectedItemsLength === itemsLength ? true : includesAll}
          disableRipple
          onClick={toggle}
          checkedIcon={<DoneOutlinedIcon style={{ color: "green" }} />}
          icon={<CloseOutlinedIcon style={{ color: "red" }} />}
          indeterminateIcon={
            <IndeterminateCheckBoxTwoToneIcon color="primary" />
          }
          indeterminate={
            selectedItemsLength > 0 && selectedItemsLength < itemsLength
          }
        />
      </ListItemIcon>
      <ListItemText primary={`Include All ${header}`} />
    </ListSubheader>
  );
};
