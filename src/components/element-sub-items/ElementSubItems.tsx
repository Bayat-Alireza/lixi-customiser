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
import { ItemActionType } from "../../redux/action-types";
import LaunchIcon from '@material-ui/icons/Launch';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton/IconButton";

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
  const [includeAll, setIncludeAll] = React.useState<boolean>(true);

  const toggleExclude = (arrayHelpers: FieldArrayRenderProps) => {
    setIncludeAll(!includeAll);
    const itemArray = arrayHelpers.form.values[arrayHelpers.name];
    if (!includeAll && itemArray?.length) {
      for (let i=itemArray.length; i >=0;i--){

        arrayHelpers.remove(i);
      }
    } 
    
  };

  const handelAddItem =(arrayHelpers:FieldArrayRenderProps,subItem:string)=>{
    const arrayItems = arrayHelpers.form.values[arrayHelpers.name]
    if (!arrayItems?.includes(subItem)){
     arrayHelpers.push(subItem)
    }else{
      
      arrayHelpers.remove(arrayItems.indexOf(subItem))
    }
  }
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
                  <AppCheckBox
                    name={`includeAll${arrayName}`}
                    checked={includeAll}
                    disableRipple
                    checkedIcon={<DoneOutlinedIcon style={{ color: "green" }} />}
                    icon={<CloseOutlinedIcon  style={{ color: "red" }}/>}
                    indeterminateIcon={
                      <IndeterminateCheckBoxTwoToneIcon color="primary" />
                    }
                    indeterminate={
                      arrayHelpers.form.values[arrayHelpers.name]?.length > 0 &&
                      arrayHelpers.form.values[arrayHelpers.name]?.length <
                        subItems.length
                    }
                  />
                </ListItemIcon>
                <ListItemText id={`${arrayName}_Header`} primary={`Include All ${header}`} />
                {/* </ListItem> */}
              </ListSubheader>
              {!includeAll &&
                
                subItems?.map((subEle, idx) => {
                    if (!subEle) {
                      return <></>;
                    }
                    return (
                      <ListItem divider dense button key={`${arrayName}_${idx}`} onClick={()=>handelAddItem(arrayHelpers,subEle)}>
                        <ListItemIcon>
                          <AppCheckBox
                            key={`${arrayName}_${idx}`}
                            name={arrayName}
                            checked={arrayHelpers.form.values[
                              arrayHelpers.name
                            ]?.includes(subEle)}
                            value={subEle}
                            checkedIcon={
                              <DoneOutlinedIcon
                                style={{ color: "green" }}
                                fontSize="small"
                              />
                            }
                            icon={<CloseOutlinedIcon fontSize="small" style={{ color: "red" }}/>}
                          />
                        </ListItemIcon>
                        <ListItemText
                          style={{ cursor: "pointer" }}
                          id={``}
                          primary={subEle}
                        />
                        <ListItemSecondaryAction>
                        <IconButton value={subEle} onClick={(e) =>
                            searchItem(
                              `${parentPath}.${e.currentTarget.value}`
                            )
                          } edge="start" aria-label="comments">
                          <LaunchIcon fontSize="small"/>
                          </IconButton>
                        </ListItemSecondaryAction>
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
