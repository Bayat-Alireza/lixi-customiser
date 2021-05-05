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
  customisByExclusion: boolean
  header: string;
  name: "elements"|"attributes";
  value:string[];
  fixedListItem:string[]
  setExcludedList:React.Dispatch<React.SetStateAction<{
    elements: string[];
    attributes: string[];
} >>
}

export const ElementSubItems: React.FC<SubItems> = ({
  subItems,
  header,
  name,
  fixedListItem,
  setExcludedList,
  customisByExclusion,
  value
}) => {
  const classes = useStyles();
  const [selectAll, setSelectAll] = React.useState<{elements:boolean|"disable",attributes:boolean|"disable",touched:boolean}>({
    elements:true,attributes:true,touched:false
  })
  const [touched, setTouched] = React.useState<{elements:boolean,attributes:boolean}>({
    elements:false,attributes:false
  })
  const { customization } = useTypedSelector((state) => state.customizer);
  const { markedForDeletionList } = useTypedSelector((state) => state.item);
  // const { markedForDeletion } = useAction();
  const {values} = useFormikContext<CustomisedElementType>()
  
  const includeAllItem = React.useMemo(()=>{
    const titleCaseName = name.replace(new RegExp("^[a-z]"),(matched) => {
    return matched.toUpperCase();
    }) 
    return `includeAll${titleCaseName}`
  },[name]) as  "includeAllElements"|"includeAllAttributes"
  
  const excludeAllItem = React.useMemo(() => {
    const titleCaseName = name.replace(new RegExp("^[a-z]"), (matched) => {
      return matched.toUpperCase();
    });
    return `excludeAll${titleCaseName}`;
  }, [name]) as "excludeAllElements" | "excludeAllAttributes";

  const affected2 = React.useMemo(()=>{
    if (!customization)return
    const excluded:string[] = []
    const excludedFullPath:string[]=[]
    const included:string[] = []
    subItems?.forEach((item:LixiBase|null|undefined)=>{
      const path = item?.path as string
      const leaf = path.split(".").pop() as string
      const customiser = new Customiser(customization, path);
      const affectedList = customiser.affectedDecedents();
      affectedList?.forEach((affected)=>{
        if (affected.textContent?.split(".").pop() === leaf){
          if(!!affected?.parentElement?.getAttribute("Exclude") && !excluded.includes(leaf)){
              excluded.push(leaf)
              excludedFullPath.push(affected.textContent)
          }else if(!included.includes(leaf)){
              included.push(leaf)
          }
        } else if(!included.includes(leaf)){
            included.push(leaf)
        }
      })
    })
    return {included:[...included],excluded:[...excluded],excludedFullPath:[...excludedFullPath]}
  },[customization, subItems])


  React.useEffect(()=>{
    if (!affected2?.excludedFullPath.length)return
    const {excludedFullPath} = affected2
    const deletionList:string[] = []
    excludedFullPath.forEach((exc)=>{
      if(!markedForDeletionList?.includes(exc)){
        deletionList.push(exc)
      }
    })
    setExcludedList((pre)=>({...pre,[name]:[...deletionList]}))
  },[affected2, markedForDeletionList, name, setExcludedList])
  
  const toggleExclude = (value:string) => {
    if (values[excludeAllItem]) {
      values[excludeAllItem] = false;
    }
    if(!touched[name]){
      setTouched({...touched,[name]:true})
    }
    if (value === "disable"){
        setSelectAll({...selectAll,elements:"disable",attributes:"disable"})
        return 
      }
    if(value==="enable"){
      return
    }
    setSelectAll({...selectAll,[name]:!selectAll[name]})
  };
 
  return (
    <>
      <List className={classes.subItem}>
        <FieldArray
          name={name}
          render={(arrayHelper) => (
            <div>
              <LixiListItemHeader
                name={includeAllItem}
                header={header}
                items={subItems}
                customisByExclusion={customisByExclusion}
                arrayHelper={arrayHelper}
                selectedItemsLength={values[name].length}
                toggle={toggleExclude}
              />
              {subItems?.map((subEle, idx) => {
                if (!subEle?.path) {
                  return <p></p>;
                }
                return (
                  <LixiListItem
                    key={`${idx}-${subEle.path}`}
                    fixedListItem={fixedListItem}
                    includeAll={includeAllItem}
                    excludeAll={excludeAllItem}
                    customisByExclusion={customisByExclusion}
                    listName={name}
                    element={subEle}
                    selectAll={selectAll[name]}
                    touched={touched[name]}
                    toggleSelectAll={toggleExclude}
                    excluded={affected2?.excluded || []}
                    included={affected2?.included || []}
                    arrayHelper={arrayHelper}
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
