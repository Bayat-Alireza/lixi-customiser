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
import { FieldArrayRenderProps, useFormikContext } from "formik";

import { useStyles } from "./lixiListItemStyle";
import { Customiser } from "../../models/Customiser";
import { useTypedSelector } from "../../hooks/useTypeSelector";
import { ConfirmRemoveItemDialog } from "../confirm-remove-dialog/ConfirmRemoveItemDialog";

interface IListLixiItem {
  name: "elements" | "attributes";
  element: LixiBase;
  included:   string[];
  excluded:   string[];
  selectAll:   boolean |   "disable";
  fixedListItem:   string[];
  touched:   boolean;
  arrayHelper:   FieldArrayRenderProps;
  toggleSelectAll:   (value:   string)   =>   void;
}
export const LixiListItem: React.FC<IListLixiItem> = ({
  name,
  element,
  included,
  excluded,
  touched,
  fixedListItem,
  selectAll,
  arrayHelper,
  toggleSelectAll,
}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState<string>("");
  const [neutral, setNeutral] = React.useState<string[]>([]);
  const { markedForDeletionList } = useTypedSelector((state) => state.item);
  const { customization } = useTypedSelector((state) => state.customizer);
  const { searchItem } = useAction();
  const { values } = useFormikContext<CustomisedElementType>();
  const [affectedPath, setAffectedPath] = React.useState<{
    path: string;
    items: string[];
  }>();
  const [open, setOpen] = React.useState(false);

  const leafItem = React.useMemo(() => {
    return element.path?.split(".").pop();
  }, [element.path]);

  const furtherCustomisation = React.useMemo(() => {
    const path = element?.path;
    if (!path) return;
    return markedForDeletionList?.find((d) => {
      return d.startsWith(path);
    });
  }, [element?.path, markedForDeletionList]);

  React.useEffect(() => {
    if (!leafItem) return;
    if (
      (included.includes(leafItem) || excluded.includes(leafItem)) &&
      neutral.includes(leafItem)
    ) {
      setNeutral([]);
    }
    if (
      !(included.includes(leafItem) || excluded.includes(leafItem)) &&
      !neutral.includes(leafItem)
    ) {
      setNeutral([leafItem]);
    }
  }, [excluded, included, leafItem, neutral]);

  React.useEffect(() => {
    if (!leafItem) return;
    if (furtherCustomisation && values[name].includes(leafItem)) {
      setValue(leafItem);
      return;
    }
    if (furtherCustomisation && !values[name].includes(leafItem)) {
      setValue("");
      return;
    }
    if (included.includes(leafItem) || values[name].includes(leafItem)) {
      setValue(leafItem);
      return;
    }
    if (excluded.includes(leafItem) || !values[name].includes(leafItem)) {
      setValue("");
      return;
    }
  }, [excluded, furtherCustomisation, included, leafItem, name, values]);

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (!leafItem) return;
    if (values[name].includes(leafItem)) return;
    if (fixedListItem.length && !fixedListItem.includes(leafItem) && !touched)
      return;
    if (selectAll === "disable") return;

    if (selectAll && !excluded.includes(leafItem)) {
      arrayHelper.push(leafItem);

      return;
    }
  }, [
    arrayHelper,
    excluded,
    fixedListItem,
    leafItem,
    name,
    selectAll,
    touched,
    values,
  ]);

  React.useEffect(() => {
    if (!leafItem) return;
    if (selectAll === "disable") return;
    if (
      !selectAll &&
      (furtherCustomisation ||
        (!excluded.includes(leafItem) && !included.includes(leafItem))) &&
      values[name].includes(leafItem)
    ) {
      arrayHelper.remove(values[name].indexOf(leafItem));
      return;
    }
  }, [
    arrayHelper,
    excluded,
    furtherCustomisation,
    included,
    leafItem,
    name,
    selectAll,
    values,
  ]);

  const affected = React.useMemo(():
    | { path: string; items: string[] }
    | undefined => {
    const affectedItem = {} as { path: string; items: string[] };
    if (element && element.path) {
      const customiser = new Customiser(customization, element.path);
      const affectedList = customiser.affectedDecedents();
      if (affectedList?.length) {
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

  const handelAddItem = (subEle: string | undefined) => {
    if (!subEle) return;
    if (affected && !furtherCustomisation) {
      toggleSelectAll("enable");
      setAffectedPath(affected);
      if (leafItem && !excluded.includes(leafItem)) {
        setOpen(true);
        return;
      }
    }
    if (selectAll !== "disable") {
      toggleSelectAll("disable");
    }
    if (!values[name].includes(subEle)) {
      setValue(subEle);
      arrayHelper.push(subEle);
    } else {
      setValue("");
      arrayHelper.remove(values[name].indexOf(subEle));
    }
  };

  return (
    <Fragment>
      <ConfirmRemoveItemDialog
        affected={affectedPath}
        open={open}
        handleClose={handleClose}
      />
      <ListItem divider dense button onClick={() => handelAddItem(leafItem)}>
        <ListItemIcon>
          <AppCheckBox
            onClick={() => handelAddItem(leafItem)}
            disableRipple
            name={name}
            checked={!!value}
            value={value}
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
            <div>
              <Typography
                style={{ alignItems: "center" }}
                component="span"
                variant="body2"
                color="textPrimary"
              >
                {leafItem}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                &nbsp;
                <em>
                  {excluded.includes(leafItem || "")
                    ? "- excluded."
                    : included.includes(leafItem || "")
                    ? "- customised."
                    : ""}
                </em>
                <LixiItemToolTip lixiItem={element} placement="top-start" />
              </Typography>
            </div>
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
