import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import React, { Fragment } from "react";
import { AppCheckBox } from "../formik-mterial-ui/AppCheckBox";
import { LixiItemToolTip } from "../tool-tip/LixiItemToolTip";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
import LaunchIcon from "@material-ui/icons/Launch";
import { useAction } from "../../hooks/useActions";
import { LixiBase } from "../../models/LixiBase";
import { CustomisedElementType } from "../../models/customisationTypes";
import { useFormikContext } from "formik";

import { useStyles } from "./lixiListItemStyle";
import { Customiser } from "../../models/Customiser";
import { useTypedSelector } from "../../hooks/useTypeSelector";
import { ConfirmRemoveItemDialog } from "../confirm-remove-dialog/ConfirmRemoveItemDialog";

interface FormikValues<T> {
  values: T;
}

interface IListLixiItem {
  name: "elements" | "attributes";
  values: FormikValues<CustomisedElementType>;
  element: LixiBase;
  // handelAddRemove: (element: LixiBase) => void;
}
export const LixiListItem: React.FC<IListLixiItem> = ({ name, element }) => {
  const classes = useStyles();
  const { customization } = useTypedSelector((state) => state.customizer);
  const { searchItem } = useAction();
  const { values, getFieldHelpers } = useFormikContext<CustomisedElementType>();
  const [affectedPath, setAffectedPath] = React.useState<{
    path: string;
    items: string[];
  }>();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const affected = React.useMemo(():
    | { path: string; items: string[] }
    | undefined => {
    const affectedItem = {} as { path: string; items: string[] };
    if (element && element.path) {
      const customiser = new Customiser(customization, element.path);
      const affectedList = customiser.affectedDecedents();
      if (affectedList.length) {
        affectedItem.path = element.path;
        affectedItem.items = [];
        affectedList.forEach((i) => {
          if (i.textContent) {
            affectedItem.items.push(i.textContent);
          }
        });
        if (affectedItem.items.length) {
          return affectedItem;
        }
      }
    }
  }, [customization, element]);

  const handelAddItem = (subEle: LixiBase) => {
    if (!subEle || !subEle?.path) return;
    const impacted = affected;
    if (impacted) {
      setAffectedPath(impacted);
      setOpen(true);
      return;
    }

    const subItem = subEle?.path?.split(".").pop() || "";
    if (!values[name].includes(subItem)) {
      values[name]?.push(subItem);
    } else {
      values[name]?.splice(values[name].indexOf(subItem), 1);
    }
    getFieldHelpers(name).setValue(values[name]);
  };

  return (
    <Fragment>
      <ConfirmRemoveItemDialog
        affected={affectedPath}
        open={open}
        handleClose={handleClose}
      />
      <ListItem divider dense button onClick={() => handelAddItem(element)}>
        <ListItemIcon>
          <AppCheckBox
            disableRipple
            name={name}
            // onClick={() => handelAddItem(element)}
            checked={values[name]?.includes(
              element?.path?.split(".").pop() || ""
            )}
            value={element?.path?.split(".").pop()}
            checkedIcon={
              <DoneOutlinedIcon style={{ color: "green" }} fontSize="small" />
            }
            icon={
              <CloseOutlinedIcon fontSize="small" style={{ color: "red" }} />
            }
          />
        </ListItemIcon>
        <ListItemText
          style={{ cursor: "pointer" }}
          id={`${element?.path?.split(".").pop()}`}
          primary={
            <Typography
              style={{ alignItems: "center" }}
              component="span"
              variant="body2"
              color="textPrimary"
            >
              {element?.path?.split(".").pop()}
              <LixiItemToolTip lixiItem={element} placement="top-start" />
            </Typography>
          }
        />

        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="comments"
            className={classes.viewItem}
            value={element?.path?.split(".").pop()}
            onClick={(e) => searchItem(element?.path || "")}
          >
            <LaunchIcon fontSize="small" />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </Fragment>
  );
};
