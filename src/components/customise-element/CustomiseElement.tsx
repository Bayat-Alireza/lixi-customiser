import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Switch from "@material-ui/core/Switch";
import SaveIcon from "@material-ui/icons/Save";
import { Form, Formik } from "formik";
import React, { Dispatch } from "react";
import { useAction } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypeSelector";
import { CustomisedElementType } from "../../models/customisationTypes";
import { ElementCustomiser } from "../../models/ElementCustomiser";
import { LixiBase } from "../../models/LixiBase";
import { ElementSubItems } from "../element-sub-items/ElementSubItems";
import { ExcerptDocumentation } from "../excerpt-documentation/ExcerptDocumentation";
import { AppTextField } from "../formik-mterial-ui/AppTextField";
import { CustomiseElementSchema } from "./customiseElementSchema";
import { useStyles } from "./customiseElementStyle";

interface ICustomiseElement {
  lixiItem: LixiBase | undefined;
}
type SubElement = { [key: string]: Element[] };

export const CustomiseElement: React.FC<ICustomiseElement> = ({ lixiItem }) => {
  const classes = useStyles();
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
      excludeAllAttributes: true,
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

  const leafAttribs = React.useMemo(() => {
    return itemAttributes?.map((item, idx) => {
      const itemEle = new LixiBase(item);
      if (itemEle) {
        return itemEle;
      }
      return undefined;
    });
  }, [itemAttributes]);
  const leafEle = React.useMemo(() => {
    return (itemSubElement["choice"] || itemSubElement["sequence"])?.map(
      (item, idx) => {
        const itemEle = new LixiBase(item);
        return itemEle;
      }
    );
  }, [itemSubElement]);

  React.useEffect(() => {
    if (!lixiItem?.path) return;
    const newCustomisation = new ElementCustomiser(
      customization,
      lixiItem?.path
    );
    const instruction = newCustomisation.customisedObject();
    setInitialValue(instruction);
    if (!instruction.elements.length && !instruction.attributes.length) return;
    setFixedListItems({
      elements: [...instruction.elements],
      attributes: [...instruction.attributes],
    });
  }, [customization, lixiItem?.path]);

  const toggleIncludeExclude = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      setFixedListItems({
        elements: [],
        attributes: [],
      });
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValue}
      validationSchema={() =>
        CustomiseElementSchema(occursMinMax?.min, occursMinMax?.max)
      }
      onSubmit={(values, { setSubmitting }) => {
        if (!lixiItem?.path || checked) return;
        setSubmitting(true);

        alert(JSON.stringify(values, null, 2));
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
      {({ isSubmitting, values, errors, touched }) => (
        <Form>
          <Paper style={{ padding: "0.5rem" }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
              <div className={classes.saveMinMax}>
                  <FormControlLabel
                    label={checked ? "Customise By Exclusion" : "Customise By Inclusion"}
                    control={<Switch
                      checked={checked}
                      onChange={(e) => toggleIncludeExclude(e)}
                      inputProps={{ "aria-label": "controlled" }}
                    />} />
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className={classes.saveMinMax}>

                  <div className={classes.minMaxContainer}>
                    <AppTextField
                      className={classes.textFieldMinMax}
                      name="newMin"
                      size="small"
                      variant="outlined"
                      label="New Min Occurs"
                      disabled={
                        occursMinMax?.min === "1" && occursMinMax?.max === "1"
                      }
                      value={values?.newMin}
                    />

                    <AppTextField
                      className={classes.textFieldMinMax}
                      name="newMax"
                      size="small"
                      variant="outlined"
                      label="New Max Occurs"
                      disabled={occursMinMax?.max === "1"}
                      value={values?.newMax}
                    />
                  </div>
                  <div className={classes.saveButton}>

                    {!checked && <><Button
                      size="small"
                      style={{ marginInline: "0.5rem" }}
                      // onClick={(DeleteInstruction)  =>  useDeleteInstruction(lixiItem?.path,customization,updateCustomisation)}
                      onClick={deleteInstruction}
                      variant="contained"
                      color="primary"
                      startIcon={<SaveIcon fontSize="large" />}
                    >
                      Delete
                    </Button>
                    <Button
                      size="small"
                      type="submit"
                      variant="contained"
                      color="primary"
                      startIcon={<SaveIcon fontSize="large" />}
                    >
                        Save
                    </Button></>}

                  </div>
                 
                </div>
                <Divider />
              </Grid>
              {leafEle?.length ? (
                <Grid item xs={12} sm={itemAttributes?.length ? 6 : 12}>
                  <ElementSubItems
                    setExcludedList={setExcludedList}
                    customisByExclusion={checked}
                    fixedListItem={fixedListItem["elements"]}
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
                    customisByExclusion={checked}
                    setExcludedList={setExcludedList}
                    fixedListItem={fixedListItem["attributes"]}
                    key="attribute"
                    value={values.attributes}
                    header="Attributes"
                    subItems={leafAttribs}
                    name="attributes"
                  />
                </Grid>
              ) : undefined}

              <Grid item xs={12}>
                <ExcerptDocumentation />
              </Grid>
            </Grid>
          </Paper>
          {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
          {/* <pre>{JSON.stringify(markedForDeletionList, null, 2)}</pre> */}
          {/* <pre>{JSON.stringify(excludedList["attributes"], null, 2)}</pre> */}
          {/* <pre>{JSON.stringify(excludedList["elements"], null, 2)}</pre> */}
        </Form>
      )}
    </Formik>
  );
};
