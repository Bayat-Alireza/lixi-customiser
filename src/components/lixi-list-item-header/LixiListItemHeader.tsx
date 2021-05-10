import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import React from "react";
import IndeterminateCheckBoxTwoToneIcon from "@material-ui/icons/IndeterminateCheckBoxTwoTone";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
import { useStyles } from "./lixiListItemHeaderStyle";
import { CustomisedElementType } from "../../models/customisationTypes";
import { LixiBase } from "../../models/LixiBase";
import { FieldArrayRenderProps, useFormikContext } from "formik";
import Paper from "@material-ui/core/Paper";
import Switch from "@material-ui/core/Switch";
import PlaylistAddCheckRoundedIcon from '@material-ui/icons/PlaylistAddCheckRounded';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

interface IHeaderLixiItem {
  name: "includeAllElements" | "includeAllAttributes";
  header: string;
  items: (LixiBase | null | undefined)[];
  selectedItemsLength: number;
  toggle: (value:string) => void;
  arrayHelper:FieldArrayRenderProps
  listName:"elements" | "attributes"
  excluded:string[]
  included:string[]
  exclusion:boolean
}

export const LixiListItemHeader: React.FC<IHeaderLixiItem> = ({
  name,
  toggle,
  items,
  listName,
  selectedItemsLength,
  header,
  excluded,
  included,
  arrayHelper:FieldArrayRenderProps,
  exclusion
}) => {
  const classes = useStyles();
  const [value,setValue]=React.useState<string>("")
  const [selectAll, setSelectAll]= React.useState(true)
  const {values,getFieldHelpers,submitForm} = useFormikContext<CustomisedElementType>()

  const listTitle = React.useMemo(()=>{
    if(!exclusion){

      if(values[name]){
        return `${header} - included`
      }
      if (!selectedItemsLength){
        return `${header} - not included`
      }
    }
    return `${header}`
  },[exclusion, header, name, selectedItemsLength, values])
  React.useEffect(()=>{
    if(selectedItemsLength === items.length ){
      setValue(name)
      getFieldHelpers(name).setValue(true)
      return
    }
    getFieldHelpers(name).setValue(false)
    setValue("")
    
  },[getFieldHelpers, items.length, name, selectedItemsLength, value, values])

  const toggleAll = ()=>{
    if(!exclusion){
      const copyList = [...values[listName]]
      if(selectAll){
        items.forEach((item,idx)=>{
          const leafItem = item?.path?.split(".").pop() 
          if(leafItem && !copyList.includes(leafItem) ){
            copyList.push(leafItem) 
          }
        })
        getFieldHelpers(listName).setValue(copyList)
        setSelectAll(false)
        submitForm()
        return
      }
      items.forEach((item,idx)=>{
        const leafItem = item?.path?.split(".").pop() 
        if(leafItem && copyList.includes(leafItem) && !included.includes(leafItem) ){
          copyList.splice(copyList.indexOf(leafItem),1) 
        }
        getFieldHelpers(listName).setValue(copyList)
      })
      setSelectAll(true)
      submitForm()
    }
  }

  return (
    <Paper>
      <div 
        // onClick={()   =>   toggle(name)} 
        onClick={()   =>   toggleAll()} 
        style={{cursor:"pointer"}}>
      <ListSubheader
        key={name}
        style={{ marginTop: "0", alignItems: "center" }}
        className={classes.subItemHeader}
      >
        
         {!exclusion &&( <ListItemIcon>
          
           {(selectedItemsLength > 0 && selectedItemsLength < items.length)
            ? <IndeterminateCheckBoxTwoToneIcon color="primary" />
            : !!value
            ? <PlaylistAddCheckRoundedIcon style={{ color: "green" }} fontSize="large" />
            :<CloseOutlinedIcon fontSize="small" style={{ color: "red" }}/>}
          
          </ListItemIcon>)}
          <ListItemSecondaryAction>
          {exclusion && <Switch size="small"
              checked={(!!value)}
              // onChange={(e) => toggleIncludeExclude(e,submitForm,values)}
              inputProps={{ "aria-label": "controlled" }}
            />}
          </ListItemSecondaryAction>
          <ListItemText primary={listTitle} />
      </ListSubheader>
      </div>
    </Paper>
  );
};
