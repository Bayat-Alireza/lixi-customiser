import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Switch from "@material-ui/core/Switch";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import SaveIcon from "@material-ui/icons/Save";
import { Form, Formik } from "formik";
import React from "react";
import { useAction } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypeSelector";
import { CustomisedElementType } from "../../models/customisationTypes";
import { Customiser } from "../../models/Customiser";
import { ElementCustomiser } from "../../models/ElementCustomiser";
import { LixiBase } from "../../models/LixiBase";
import { ElementSubItems } from "../element-sub-items/ElementSubItems";
import { ExcerptDocumentation } from "../excerpt-documentation/ExcerptDocumentation";
import { AppTextField } from "../formik-mterial-ui/AppTextField";
import { CustomiseElementSchema } from "./customiseElementSchema";
import { useStyles } from "./customiseElementStyle";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";

interface ICustomiseElement {
  lixiItem: LixiBase | undefined;
}
type SubElement = { [key: string]: Element[] };

export const CustomiseElement: React.FC<ICustomiseElement> = ({ lixiItem }) => {
  const classes = useStyles();
  const previousValues = React.useRef<CustomisedElementType>()
  const { updateCustomisation } = useAction();
  const { customization } = useTypedSelector((state) => state.customizer);
  const { markedForDeletionList } = useTypedSelector((state) => state.item);
  const [initialValue, setInitialValue] = React.useState<CustomisedElementType>(
    {
      newMin: "",
      newMax: "",
      includeAllElements: true,
      excludeAllElements: false,
      includeAllAttributes: true,
      excludeAllAttributes: false,
      elements: [],
      attributes: [],
      excerpt: "",
      documentation: "",
      heading: "",
    }
  );

  const [checked, setChecked] = React.useState(true);
  const [itemSubElement, setItemSubElement] = React.useState<SubElement>({});
  const [itemAttributes, setItemAttributes] = React.useState<Element[]>([]);
  const [excludedList, setExcludedList] = React.useState<{
    elements: string[];
    attributes: string[];
  }>({ elements: [], attributes: [] });
  const [fixedListItem, setFixedListItems] = React.useState<{
    elements: string[];
    attributes: string[];
  }>({ elements: [], attributes: [] });

  const [occursMinMax, setOccursMinMax] = React.useState<
    | {
        min: string | null | undefined;
        max: string | null | undefined;
      }
    | undefined
  >();
  
  React.useEffect(()=>{
    previousValues.current = {
      ...initialValue,
      elements:[...initialValue.elements],
      attributes:[...initialValue.attributes]
    }
  },[initialValue])

  const leafAttribs = React.useMemo(() => {
    return itemAttributes?.map((item, idx) => {
      const itemEle = new LixiBase(item);
      if (itemEle) {
        return itemEle;
      }
      return undefined;
    });
  }, [itemAttributes]);
  const attributesPaths = React.useMemo(()=>{
    const results:string[] = []
    leafAttribs?.forEach((att,idx)=>{
      if(att?.path){
        results.push(att.path)
      }
    })
    return results
  },[leafAttribs])
 
  const leafEle = React.useMemo(() => {
    return (itemSubElement["choice"] || itemSubElement["sequence"])?.map(
      (item, idx) => {
        const itemEle = new LixiBase(item);
        return itemEle;
      }
    );
  }, [itemSubElement]);

  const elementsPaths = React.useMemo(()=>{
    const results:string[] = []
    leafEle?.forEach((att,idx)=>{
      if(att?.path){
        results.push(att.path)
      }
    })
    return results
  },[leafEle])
  
  const excludeNotIncludedItems = React.useCallback(()=>{
    const paths = [...elementsPaths,...attributesPaths]
    const copyAttributes = [...(previousValues.current?.attributes||[])]
    const copyElements = [...(previousValues.current?.elements||[])]
    const leafItems = [...copyAttributes,...copyElements]
    if (!(lixiItem && lixiItem?.path))return
      const newCustomisation = new ElementCustomiser(customization,lixiItem?.path)
      newCustomisation.removeElementsAndAttributes()
      paths.forEach((path,idx)=>{
        const leafItem = path?.split(".").pop()
        if( leafItem && !leafItems.includes(leafItem)){
          newCustomisation.excludeByPath(path)
        }
      })
      updateCustomisation(newCustomisation.customisation);
  },[attributesPaths, customization, elementsPaths, lixiItem, updateCustomisation])

  React.useEffect(() => {
    if (!lixiItem?.path) return;
    const newCustomisation = new ElementCustomiser(
      customization,
      lixiItem?.path
    );
    const instruction = newCustomisation.customisedObject();
    if (
      (instruction.attributes.length ||
      instruction.elements.length) 
     ){
        setChecked(false)
      }else{
      
      }
    
    setInitialValue(instruction);
    if (!instruction.elements.length && !instruction.attributes.length) return;
    setFixedListItems({
      elements: [...instruction.elements],
      attributes: [...instruction.attributes],
    });
  }, [ customization, lixiItem?.path]);

  

  const toggleIncludeExclude = (
    event: React.ChangeEvent<HTMLInputElement>,
    submitForm:(() => Promise<void>) & (() => Promise<any>),
    values:CustomisedElementType) => {
      const copyInitialValues = {...values,elements:[...values['elements']],attributes:[...values["attributes"]]}
      
    setInitialValue({...copyInitialValues, elements:[],attributes:[]})
    if (event.target.checked){
      excludeNotIncludedItems()
      setInitialValue({...copyInitialValues, elements:[],attributes:[]})
      setChecked(event.target.checked);
      return 
    }
   
    if(!event.target.checked){
      const copyListAttributes = [...values["attributes"]]
      attributesPaths.forEach((path,idx)=>{
          const leafItem =path.split(".").pop() 
          if(leafItem && !copyListAttributes.includes(leafItem) && !excludedList.attributes.includes(path) ){
            copyListAttributes.push(leafItem) 
          }
        })
        
        copyInitialValues["attributes"] = [...copyListAttributes]

      const copyListElements = [...values["elements"]]
      elementsPaths.forEach((path,idx)=>{
          const leafItem =path.split(".").pop() 
          if(leafItem && !copyListElements.includes(leafItem) && !excludedList.elements.includes(path) ){
            copyListElements.push(leafItem) 
          }
        })
       
        copyInitialValues["elements"] = [...copyListElements]
        
        setInitialValue(copyInitialValues)
    }
    submitForm()
    setChecked(event.target.checked);
  };


  React.useEffect(() => {
    const subElement = lixiItem?.lixiSubElements;
    const attributes = lixiItem?.attributes;
    if (subElement) {
      setItemSubElement(subElement);
    }
    if (attributes?.length) {
      setItemAttributes(attributes);
    }
  }, [lixiItem]);

  React.useEffect(() => {
    const occurrenceMinMax = {
      min: lixiItem?.element.getAttribute("minOccurs"),
      max: lixiItem?.element.getAttribute("maxOccurs"),
    };
    setOccursMinMax(occurrenceMinMax);
  }, [lixiItem?.element]);

  const deleteInstruction = () => {
    if (!lixiItem?.path) return;
    const newCustomisation = new ElementCustomiser(
      customization,
      lixiItem?.path
    );
    const removedItem = newCustomisation.removeCustomisedItem();
    if (removedItem) {
      updateCustomisation(newCustomisation.customisation);
    }
    setInitialValue(newCustomisation.customisedObject())
    setFixedListItems({
      elements: [],
      attributes: [],
    });
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValue}
      validationSchema={() =>
        CustomiseElementSchema(occursMinMax?.min, occursMinMax?.max)
      }
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        if (!lixiItem?.path) return;

        // alert(JSON.stringify(values, null, 2));
        const newCustomisation = new ElementCustomiser(
          customization,
          lixiItem?.path,
          values
        );
        const { elements, attributes } = excludedList;
        if (markedForDeletionList) {
          newCustomisation.removeCustomisation([...markedForDeletionList]);
        }
        if (elements.length) {
          newCustomisation.removeCustomisation([...elements]);
        }
        if (attributes.length) {
          newCustomisation.removeCustomisation([...attributes]);
        }
        newCustomisation.customise();
        updateCustomisation(newCustomisation.customisation);
        
        setSubmitting(false);
        // searchItem(lixiItem.path);
        // setTimeout(() => {
        // }, 400);
      }}
    >
      {({ isSubmitting, values, errors, touched,submitForm }) => (
        <Form>
          <Paper style={{ padding: "0.5rem" }}>
            <Grid container spacing={1}>
            <Grid item xs={12}>
                <Paper className={classes.customisationTitleContainer}>
                <div>
                  <Switch
                        checked={checked}
                        onChange={(e) => toggleIncludeExclude(e,submitForm,values)}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                      <Typography variant="button" className={classes.customisationTitle}> Customisation by&nbsp;</Typography>
                    {checked &&
                     <Tooltip
                     title={
                       <div style={{backgroundColor:"#fff",margin:0,color:"#333",padding:"0.5rem"}}>
                         <Typography color="primary" variant="h6"><u>Exclusion Mode</u></Typography>
                         <Typography component="div" color="textPrimary">The&nbsp;<Typography variant="caption" color="secondary">excluded</Typography>&nbsp;item(s) will not appear in the customised schema</Typography>
                       </div>
                     }>
                    <Typography variant="button" className={classes.customisationTitleExclusion}>
                       <u><em>Exclusion</em></u>
                    </Typography>
                    </Tooltip>
                    }
                    {!checked &&
                          <Tooltip
                            title={
                              <div style={{backgroundColor:"#fff",margin:0,color:"#333",padding:"0.5rem"}}>
                                <Typography color="primary" variant="h6"><u>Inclusion Mode</u></Typography>
                                <Typography color="textPrimary">ONLY the included item(s)&nbsp;<DoneOutlinedIcon style={{ color: "green" }} fontSize="small" />of the parent element will appear in the customised schema.</Typography>
                              </div>
                            }>
                              <Typography variant="button" className={classes.customisationTitleInclusion}><u><em>Inclusion</em></u></Typography>
                            </Tooltip>
                   }
                </div>
                 <div className={classes.saveButton}>
                    <Button
                      size="small"
                      style={{ marginInline: "0.5rem" }}
                      onClick={deleteInstruction}
                      variant="text"
                      color="secondary"
                      startIcon={<SaveIcon fontSize="large" />}
                    >
                      Delete
                    </Button>
                    <Button
                      size="small"
                      type="submit"
                      variant="text"
                      color="secondary"
                      startIcon={<SaveIcon fontSize="large" />}
                    >
                      Save
                    </Button>
                  </div>
                </Paper>
              </Grid>
            
              {leafEle?.length ? (
                <Grid item xs={12} sm={itemAttributes?.length ? 6 : 12}>
                  <ElementSubItems
                    setExcludedList={setExcludedList}
                    fixedListItem={fixedListItem["elements"]}
                    exclusion={checked}
                    key={"element"}
                    value={values.elements}
                    header={`Sub-Elements ${
                      itemSubElement["choice"] ? "CHOICE" : "(SEQUENCE)"
                    }`}
                    subItems={leafEle}
                    name="elements"
                  />
                </Grid>
              ) : undefined}
              {leafAttribs?.length ? (
                <Grid item xs={12} sm={leafEle?.length ? 6 : 12}>
                  <ElementSubItems
                    setExcludedList={setExcludedList}
                    fixedListItem={fixedListItem["attributes"]}
                    exclusion={checked}
                    key="attribute"
                    value={values.attributes}
                    header="Attributes"
                    subItems={leafAttribs}
                    name="attributes"
                  />
                </Grid>
              ) : undefined}
              
              <Grid item xs={12}>
                <ExcerptDocumentation>
                <Grid item xs={12} sm={6}>
                <div className={classes.saveMinMax}>
                  <div className={classes.minMaxContainer}>
                    <AppTextField
                      // className={classes.textFieldMinMax}
                      name="newMin"
                      size="medium"
                      fullWidth
                      variant="outlined"
                      label="New Min Occurs"
                      disabled={
                        occursMinMax?.min === "1" && occursMinMax?.max === "1"
                      }
                      value={values?.newMin}
                    />

                    <AppTextField
                      // className={classes.textFieldMinMax}
                      name="newMax"
                      size="medium"
                      fullWidth
                      variant="outlined"
                      label="New Max Occurs"
                      disabled={occursMinMax?.max === "1"}
                      value={values?.newMax}
                    />
                  </div>
                  
                </div>
              </Grid>
                </ExcerptDocumentation>
              </Grid>
            </Grid>
          </Paper>
          <pre>{JSON.stringify(values, null, 2)}</pre>
          {/* <pre>{JSON.stringify(markedForDeletionList, null, 2)}</pre> */}
          {/* <pre>{JSON.stringify(excludedList["attributes"], null, 2)}</pre> */}
          {/* <pre>{JSON.stringify(excludedList["elements"], null, 2)}</pre> */}
        </Form>
      )}
    </Formik>
  );
};
