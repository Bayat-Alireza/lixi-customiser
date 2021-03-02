import Checkbox from "@material-ui/core/Checkbox";
import { FieldArray, FieldArrayRenderProps } from "formik";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import React from "react";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import List from "@material-ui/core/List/List";
import { AppCheckBox } from "../formik-mterial-ui/AppCheckBox";
import { useStyles } from "./elementSubItemsStyle";
import IndeterminateCheckBoxTwoToneIcon from "@material-ui/icons/IndeterminateCheckBoxTwoTone";
import { useAction } from "../../hooks/useActions";
import ListSubheader from "@material-ui/core/ListSubheader";

interface SubItems {
  subItems: (string | null | undefined)[];
  header: string;
  arrayName: string;
  parentPath: string;
  // checked?: boolean;
  onClick?: (event: any) => void;
}

export const ElementSubItems: React.FC<SubItems> = ({
  subItems,
  header,
  arrayName,
  parentPath,
}) => {
  const classes = useStyles();
  const { searchItem } = useAction();
  const [toggleAll, setToggleAll] = React.useState<boolean>(false);

  const toggleExclude = (arrayHelpers: FieldArrayRenderProps) => {
    if (!toggleAll) {
      subItems?.forEach((si) => {
        if (arrayHelpers.form.values[arrayHelpers.name].includes(si)) return;
        arrayHelpers.push(si);
      });
    } else {
      const itemArray = arrayHelpers.form.values[arrayHelpers.name];
      for (const i of itemArray) {
        arrayHelpers.remove(i);
      }
    }
    setToggleAll(!toggleAll);
  };
  return (
    <>
      <List className={classes.subItem}>
        <FieldArray
          name={arrayName}
          render={(arrayHelpers) => (
            <div>
              <ListSubheader
                style={{ marginTop: "0", cursor: "pointer" }}
                className={classes.subItemHeader}
                onClick={() => toggleExclude(arrayHelpers)}
                key={`${arrayName}_Header`}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={toggleAll}
                    disableRipple
                    checkedIcon={<CloseOutlinedIcon />}
                    icon={<DoneOutlinedIcon style={{ color: "green" }} />}
                    indeterminateIcon={
                      <IndeterminateCheckBoxTwoToneIcon color="primary" />
                    }
                    indeterminate={
                      arrayHelpers.form.values[arrayHelpers.name].length > 0 &&
                      arrayHelpers.form.values[arrayHelpers.name].length <
                        subItems.length
                    }
                  />
                </ListItemIcon>
                <ListItemText id={`${arrayName}_Header`} primary={header} />
                {/* </ListItem> */}
              </ListSubheader>
              {subItems?.map((subEle, idx) => {
                if (!subEle) {
                  return <></>;
                }
                return (
                  <ListItem divider dense key={`${arrayName}_${idx}`}>
                    <ListItemIcon>
                      <AppCheckBox
                        key={`${arrayName}_${idx}`}
                        name={arrayName}
                        checked={arrayHelpers.form.values[
                          arrayHelpers.name
                        ].includes(subEle)}
                        value={subEle}
                        checkedIcon={<CloseOutlinedIcon fontSize="small" />}
                        icon={
                          <DoneOutlinedIcon
                            style={{ color: "green" }}
                            fontSize="small"
                          />
                        }
                      />
                    </ListItemIcon>
                    <ListItemText
                      style={{ cursor: "pointer" }}
                      onClick={(e) =>
                        searchItem(
                          `${parentPath}.${e.currentTarget.textContent}`
                        )
                      }
                      id={``}
                      primary={subEle}
                    />
                  </ListItem>
                );
              })}
            </div>
          )}
        />
      </List>
    </>
  );
};
