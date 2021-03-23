import List from "@material-ui/core/List/List";
import { FieldArray, useFormikContext } from "formik";
import React from "react";
import { useTypedSelector } from "../../hooks/useTypeSelector";
import { CustomisedElementType } from "../../models/customisationTypes";
import { Customiser } from "../../models/Customiser";
import { LixiBase } from "../../models/LixiBase";
import { LixiListItemHeader } from "../lixi-list-item-header/LixiListItemHeader";
import { LixiListItem } from "../lixi-list-item/LixiListItem";
import { useStyles } from "./elementSubItemsStyle";

interface SubItems {
  subItems: (LixiBase | null | undefined)[];
  header: string;
  name: "elements"|"attributes";
  value:string[];
}

export const ElementSubItems: React.FC<SubItems> = ({
  subItems,
  header,
  name,
  value
}) => {
  const classes = useStyles();
  const { customization } = useTypedSelector((state) => state.customizer);
  const [includeAll, setIncludeAll] = React.useState<boolean>(true);
  const {values,getFieldHelpers} = useFormikContext<CustomisedElementType>()

  const includeAllItem = React.useMemo(()=>{
    const titleCaseName = name.replace(new RegExp("^[a-z]"),(matched) => {
    return matched.toUpperCase();
    }) 
    return `includeAll${titleCaseName}`
  },[name]) as  "includeAllElements"|"includeAllAttributes"


  const affected = React.useMemo(()=>{
    const affectedItem = {}as{path:string,items:string[]}
    const result = [] as {path:string,items:string[]}[]
    subItems?.forEach((item:LixiBase|null|undefined) => {
      if (item && item.path){
        const customiser = new Customiser(customization,item.path)
        const affectedList = customiser.affectedDecedents()
        if (affectedList.length){
          affectedItem.path = item.path
          affectedItem.items = []
          affectedList.forEach((i)=>{
            if (i.textContent){
              affectedItem.items.push(i.textContent)
            }
          })
          if(affectedItem.items.length)
          result.push(affectedItem)
        }
      }
    });
    if(result.length){return result}

  },[customization,subItems])



  React.useEffect(()=>{
    const reflectAffected = (): Promise<void>=>{
      return new Promise((resolves,rejects)=>{
        affected?.forEach(({path})=>{
          values[name]?.push(path.split(".").pop()|| "")
          resolves(getFieldHelpers(name).setValue(values[name]))
  
        })
      })
    }
    if (!includeAll){
      (async()=>{
       await reflectAffected()
      })()
      
    }
    
    
  },[affected, name, getFieldHelpers, values,includeAllItem,includeAll])

  const toggleExclude = async() => {
    setIncludeAll(!includeAll);
    promiseRemove()
    
  };
  const promiseRemove = (): Promise<void> =>{
        return new Promise((resolves,rejects)=>{
          if (!includeAll && value?.length) {
                for (let i=value.length; i >=0;i--){
                  values[name]?.splice(i,1)
                }
              } 
          resolves(getFieldHelpers(name).setValue(values[name]))
        })
      }

  React.useEffect(()=>{
      if (!values[includeAllItem] && !value.length){
        setIncludeAll(false)
      }
  },[values,includeAllItem,value.length])
  React.useEffect(()=>{
    if (value.length && includeAll){
      setIncludeAll(false)

    }
  },[value?.length,includeAll])

  return (
    <>
    
      <List className={classes.subItem}>
        <FieldArray
          name={name}
          render={() => (
            <div>
              <LixiListItemHeader 
              name={includeAllItem}
              includesAll={includeAll}
              header={header} 
              itemsLength={subItems.length}
              selectedItemsLength={values[name].length}
              toggle={toggleExclude}
              />
              {!includeAll &&
                subItems?.map((subEle, idx) => {
                  if (!subEle?.path) {
                    return <></>;
                  }
                  return (
                    <LixiListItem 
                    key={`${idx}-${subEle.path}`} 
                    name={name} 
                    element={subEle} 
                    values={{values}} 
                    />
                  );
                })}
            </div>
          )}
        />
      </List>
    </>
  );
};
