import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import React from "react";
import { AppCheckBox } from "../formik-mterial-ui/AppCheckBox";
import IndeterminateCheckBoxTwoToneIcon from "@material-ui/icons/IndeterminateCheckBoxTwoTone";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
import { useStyles } from "./lixiListItemHeaderStyle";
import { CustomisedElementType } from "../../models/customisationTypes";
import { LixiBase } from "../../models/LixiBase";
import { FieldArrayRenderProps, useFormikContext } from "formik";

interface IHeaderLixiItem {
  name: "includeAllElements" | "includeAllAttributes";
  header: string;
  items: (LixiBase | null | undefined)[];
  selectedItemsLength: number;
  toggle: (value:string) => void;
  arrayHelper:FieldArrayRenderProps
}

export const LixiListItemHeader: React.FC<IHeaderLixiItem> = ({
  name,
  toggle,
  items,
  selectedItemsLength,
  header,
  arrayHelper:FieldArrayRenderProps
}) => {
  const classes = useStyles();
  const [value,setValue]=React.useState<string>("")
  const {values} = useFormikContext<CustomisedElementType>()

  React.useEffect(()=>{
    if(selectedItemsLength === items.length ){
      setValue(name)
      values[name] = true
      return
    }
    values[name] = false
    setValue("")
    
  },[items.length, name, selectedItemsLength, value, values])

  return (
    <ListSubheader
      key={name}
      style={{ marginTop: "0", alignItems: "center" }}
      className={classes.subItemHeader}
    >
      <ListItemIcon>
        <AppCheckBox
          key={name}
          name={name}
          checked={!!value}
          value={value}
          disableRipple
          onClick={()=>toggle(name)}
          checkedIcon={<DoneOutlinedIcon style={{ color: "green" }} />}
          icon={<CloseOutlinedIcon style={{ color: "red" }} />}
          indeterminateIcon={
            <IndeterminateCheckBoxTwoToneIcon color="primary" />
          }
          indeterminate={
            selectedItemsLength > 0 && selectedItemsLength < items.length
          }
        />
      </ListItemIcon>
      <ListItemText primary={`Include All ${header}`} />
    </ListSubheader>
  );
};
