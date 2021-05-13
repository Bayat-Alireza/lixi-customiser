import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import React from "react";
import IndeterminateCheckBoxTwoToneIcon from "@material-ui/icons/IndeterminateCheckBoxTwoTone";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import { useStyles } from "./lixiListItemHeaderStyle";
import { CustomisedElementType } from "../../models/customisationTypes";
import { LixiBase } from "../../models/LixiBase";
import { FieldArrayRenderProps, useFormikContext } from "formik";
import Paper from "@material-ui/core/Paper";
import Switch from "@material-ui/core/Switch";
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { Customiser } from "../../models/Customiser";
import { useTypedSelector } from "../../hooks/useTypeSelector";
import { useAction } from "../../hooks/useActions";
import Typography from "@material-ui/core/Typography";


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
  const [includeAll, setIncludeAll]= React.useState(true)
  const [excludeAll, setExcludeAll]= React.useState(false)
  const {updateCustomisation} = useAction()
  const { customization } = useTypedSelector((state) => state.customizer);

  const {values,getFieldHelpers,submitForm} = useFormikContext<CustomisedElementType>()

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
      setIncludeAll(!includeAll)
      if(!includeAll){
        items.forEach((item,idx)=>{
          const leafItem = item?.path?.split(".").pop() 
          if(leafItem && !copyList.includes(leafItem) ){
            copyList.push(leafItem) 
          }
        })
        getFieldHelpers(listName).setValue(copyList)
        
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
      // setIncludeAll(true)
      submitForm()
    }
    else{
      const newCustomisation = new Customiser(customization);
      setExcludeAll(!excludeAll)
      items.forEach((item,idx)=>{
        const path = item?.path
        const leafItem = path?.split(".").pop() 
        if(!excludeAll){
          if (
            path &&
            leafItem &&
            !included.includes(leafItem) &&
            !excluded.includes(leafItem) &&
            !included.includes(leafItem)
          ) {
            newCustomisation.excludeByPath(path);
          }
      }else{
        if (path && leafItem && excluded.includes(leafItem)) {
          newCustomisation.notExcludeByPath(path);
        }
      }
      })
      updateCustomisation(newCustomisation.customisation)
    }
  }

  // React.useEffect(()=>{
  //   if(items.length === excluded.length){
  //     setExcludeAll(true)
  //     return
  //   }
  //   setExcludeAll(false)
  // },[excluded.length, items.length])
  React.useEffect(()=>{
    if(items.length === selectedItemsLength){
      setIncludeAll(true)
      return
    }
    setIncludeAll(false)
  },[items.length, selectedItemsLength, setIncludeAll])

  const StatusText = ()=>{
    if (exclusion && excludeAll && !included.length) {
      return (
        <Typography color="secondary" variant="button">
          <strong>{" - "}All Excluded</strong>
        </Typography>
      );
    }
    if(!exclusion && includeAll ){
      return <Typography color="primary" variant="button"><strong style={{color:"green"}}>{" - "}All Included</strong></Typography>
    }
    return <></>
  }

  return (
    <Paper>
      <div 
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
            : includeAll
            ? <CheckRoundedIcon style={{ color: "green" }} fontSize="default" />
            :<CloseOutlinedIcon fontSize="small" style={{ color: "red" }}/>}
          
          </ListItemIcon>)}
          <ListItemSecondaryAction>
          {exclusion && <Switch size="small"
              checked={excludeAll}
              onChange={(e) => toggleAll()}
              inputProps={{ "aria-label": "controlled" }}
            />}
          </ListItemSecondaryAction>
          <ListItemText primary={<>{header}<StatusText/></>} />
      </ListSubheader>
      </div>
    </Paper>
  );
};
