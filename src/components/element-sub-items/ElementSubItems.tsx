import IconButton from "@material-ui/core/IconButton/IconButton";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Typography from "@material-ui/core/Typography/Typography";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
import IndeterminateCheckBoxTwoToneIcon from "@material-ui/icons/IndeterminateCheckBoxTwoTone";
import LaunchIcon from '@material-ui/icons/Launch';
import { FieldArray, FieldArrayRenderProps,useFormikContext } from "formik";
import React from "react";
import { useAction } from "../../hooks/useActions";
import { CustomisedElementType } from "../../models/customisationTypes";
import { LixiBase } from "../../models/LixiBase";
import { AppCheckBox } from "../formik-mterial-ui/AppCheckBox";
import { LixiItemToolTip } from "../tool-tip/LixiItemToolTip";
import { useStyles } from "./elementSubItemsStyle";

interface SubItems {
  subItems: (LixiBase | null | undefined)[];
  header: string;
  arrayName: string;
  parentPath: string;
  value:string[];
  // checked?: boolean;
  onClick?: (event: any) => void;
}

export const ElementSubItems: React.FC<SubItems> = ({
  subItems,
  header,
  arrayName,
  parentPath,
  value
}) => {
  const classes = useStyles();
  const { searchItem } = useAction();
  const [includeAll, setIncludeAll] = React.useState<boolean>(true);
  const {values} = useFormikContext<CustomisedElementType>()

  const name = React.useMemo(()=>{
    return arrayName.replace(new RegExp("^[a-z]"),(matched) => {
    return matched.toUpperCase();
    }) as keyof CustomisedElementType
  },[arrayName])

  const toggleExclude = (arrayHelpers: FieldArrayRenderProps) => {
    setIncludeAll(!includeAll);
    if (!includeAll && value?.length) {
      for (let i=value.length; i >=0;i--){
        arrayHelpers.remove(i);
      }
    } 
  };

  React.useEffect(()=>{
    const controlName = `includeAll${name}` as keyof CustomisedElementType

    if (controlName in values){
      if (!values[controlName] && !value.length){
        setIncludeAll(false)
      }
    }
  },[values,name,value.length])
  React.useEffect(()=>{
    if (value.length && includeAll){
      setIncludeAll(false)

    }
  },[value?.length,includeAll])

  const handelAddItem =(arrayHelpers:FieldArrayRenderProps,subItem:string)=>{
    if (!value.includes(subItem)){
     arrayHelpers.push(subItem)
     
    }else{
      arrayHelpers.remove(value.indexOf(subItem))
    }
  }

  return (
    <>
      <List className={classes.subItem}>
        <FieldArray
          name={arrayName}

          render={(arrayHelpers:FieldArrayRenderProps) => (
            <div>
              <ListSubheader
                style={{ marginTop: "0", alignItems: "center" }}
                className={classes.subItemHeader}
                key={`${arrayName}_Header`}
              >
                <ListItemIcon>
                  <AppCheckBox
                    name={`includeAll${arrayName.replace(
                      new RegExp("^[a-z]"),
                      (matched) => {
                        return matched.toUpperCase();
                      }
                    )}`}
                    checked={
                      value?.length === subItems.length ? true : includeAll
                    }
                    disableRipple
                    onClick={() => toggleExclude(arrayHelpers)}
                    checkedIcon={
                      <DoneOutlinedIcon style={{ color: "green" }} />
                    }
                    icon={<CloseOutlinedIcon style={{ color: "red" }} />}
                    indeterminateIcon={
                      <IndeterminateCheckBoxTwoToneIcon color="primary" />
                    }
                    indeterminate={
                      value?.length > 0 && value?.length < subItems.length
                    }
                  />
                </ListItemIcon>
                <ListItemText
                  id={`${arrayName}_Header`}
                  primary={`Include All ${header}`}
                />
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
                      onClick={() =>
                        handelAddItem(
                          arrayHelpers,
                          subEle?.path?.split(".").pop() || ""
                        )
                      }
                    >
                      <ListItemIcon>
                        <AppCheckBox
                          key={`${arrayName}_${idx}`}
                          name={arrayName}
                          checked={value?.includes(
                            subEle?.path?.split(".").pop() || ""
                          )}
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
                        primary={
                          <Typography
                            style={{ alignItems: "center" }}
                            component="span"
                            variant="body2"
                            color="textPrimary"
                          >
                            {subEle?.path?.split(".").pop()}
                            <LixiItemToolTip
                              lixiItem={subEle}
                              placement="top-start"
                            />
                          </Typography>
                        }
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
