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
import Typography from "@material-ui/core/Typography/Typography";
import { LixiBase } from "../../models/LixiBase";
import { LixiItemToolTip } from "../tool-tip/LixiItemToolTip";

interface SubItems {
  subItems: (LixiBase | null | undefined)[];
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
                style={{ marginTop: "0",alignItems:"center" }}
                className={classes.subItemHeader}
                // onClick={() => toggleExclude(arrayHelpers)}
                key={`${arrayName}_Header`}
              >
                <ListItemIcon>
                  <AppCheckBox
                    name={`includeAll${arrayName}`}
                    checked={arrayHelpers.form.values[arrayHelpers.name]?.length ===
                      subItems.length?true: includeAll}
                    disableRipple
                    onClick={() => toggleExclude(arrayHelpers)}
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
                      <ListItem
                        divider
                        dense
                        button
                        key={`${arrayName}_${idx}`}
                        onClick={() => handelAddItem(arrayHelpers, subEle?.path?.split(".").pop()||"")}
                      >
                        <ListItemIcon>
                          <AppCheckBox
                            key={`${arrayName}_${idx}`}
                            name={arrayName}
                            checked={arrayHelpers.form.values[
                              arrayHelpers.name
                            ]?.includes(subEle?.path?.split(".").pop())}
                            value={subEle?.path?.split(".").pop()}
                            checkedIcon={
                              <DoneOutlinedIcon
                                style={{ color: "green" }}
                                fontSize="small"
                              />
                            }
                            icon={
                              <CloseOutlinedIcon
                                fontSize="small"
                                style={{ color: "red" }}
                              />
                            }
                          />
                        </ListItemIcon>
                        <ListItemText
                          style={{ cursor: "pointer" }}
                          id={``}
                          // primary={subEle}
                          primary={
                             <Typography
                            style={{alignItems:"center"}}
                            component="span"
                            variant="body2"
                            color="textPrimary"
                          >
                            {subEle?.path?.split(".").pop()} 
                           <LixiItemToolTip lixiItem={subEle} placement="top-start"/>
                          </Typography>}
                        />
                       <ListItemSecondaryAction>
                        <IconButton
                            edge="end" 
                            aria-label="comments"
                            className={classes.viewItem}
                            value={subEle?.path?.split(".").pop()}
                            onClick={(e) =>
                              searchItem(
                                `${parentPath}.${subEle?.path?.split(".").pop()}`
                              )
                            }
                          >
                            
                            <LaunchIcon fontSize="small" />
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
