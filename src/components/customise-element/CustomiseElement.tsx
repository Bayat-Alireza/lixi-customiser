import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import SaveIcon from "@material-ui/icons/Save";
import { Form, Formik } from "formik";
import React from "react";
import { useAction } from "../../hooks/useActions";
import { LixiBase } from "../../models/LixiBase";
import { ElementSubItems } from "../element-sub-items/ElementSubItems";
import { AppTextField } from "../formik-mterial-ui/AppTextField";
import { CustomiseElementSchema } from "./customiseElementSchema";
import { useStyles } from "./customiseElementStyle";

interface ICustomiseElement {
  lixiItem: LixiBase | undefined;
}
type SubElement = { [key: string]: Element[] };

export const CustomiseElement: React.FC<ICustomiseElement> = ({ lixiItem }) => {
  const classes = useStyles();
  const { customiseElement } = useAction();
  const [itemSubElement, setItemSubElement] = React.useState<SubElement>({});
  const [itemAttributes, setItemAttributes] = React.useState<Element[]>([]);
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
      if (itemEle){

        return itemEle;
      }
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
    const subElement = lixiItem?.lixiSubElements;
    const attributes = lixiItem?.attributes;
    if (subElement) {
      setItemSubElement(subElement);
    }
    if (attributes?.length) {
      setItemAttributes(attributes);
    }
    console.log(attributes?.length);
  }, [lixiItem]);

  React.useEffect(() => {
    const occurrenceMinMax = {
      min: lixiItem?.element.getAttribute("minOccurs"),
      max: lixiItem?.element.getAttribute("maxOccurs"),
    };
    setOccursMinMax(occurrenceMinMax);
  }, [lixiItem?.element]);

  return (
    <Formik
      initialValues={{
        newMin: undefined,
        newMax: undefined,
        includeAllElements: true,
        includeAllAttributes: true,
        Elements: [],
        Attributes: [],
        excerpt: undefined,
        documentation: undefined,
      }}
      validationSchema={() =>
        CustomiseElementSchema(occursMinMax?.min, occursMinMax?.max)
      }
      onSubmit={(values, { setSubmitting }) => {
        customiseElement(values,   lixiItem?.path||"");
        // setTimeout(() => {
        //   alert(JSON.stringify(values, null, 2));
        //   setSubmitting(false);
        // }, 400);
      }}
    >
      {({ isSubmitting, values, errors, touched }) => (
        <Form>
          <Paper>
            <Grid container spacing={1}>
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
                      value={values.newMin}
                    />

                    <AppTextField
                      className={classes.textFieldMinMax}
                      name="newMax"
                      size="small"
                      variant="outlined"
                      label="New Max Occurs"
                      disabled={occursMinMax?.max === "1"}
                      value={values.newMax}
                    />
                  </div>
                  <div className={classes.saveButton}>
                    <Button
                      size="small"
                      type="submit"
                      variant="outlined"
                      color="primary"
                      startIcon={<SaveIcon fontSize="large" />}
                    >
                      Save
                    </Button>
                  </div>
                </div>
                <Divider />
              </Grid>
              {leafEle?.length?<Grid item xs={12} sm={itemAttributes?.length ? 6 : 12}>
                  <ElementSubItems
                    parentPath={lixiItem?.path || ""}
                    header={`Sub-Elements ${
                      itemSubElement["choice"] ? "CHOICE" : "(SEQUENCE)"
                    }`}
                    subItems={leafEle}
                    arrayName="Elements"
                  />
              </Grid>:undefined}
              {leafAttribs?.length?<Grid
                item
                xs={12}
                sm={leafEle?.length? 6: 12}
              >
                  <ElementSubItems
                    parentPath={lixiItem?.path || ""}
                    header="Attributes"
                    subItems={leafAttribs}
                    arrayName="Attributes"
                  />
              </Grid>:undefined}
              <Grid item xs={12} sm={6}>
                <AppTextField
                  variant="outlined"
                  multiline
                  fullWidth
                  rows={4}
                  name="excerpt"
                  value={values.excerpt}
                  label="Custom Excerpt"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <AppTextField
                  variant="outlined"
                  multiline
                  fullWidth
                  rows={4}
                  name="documentation"
                  value={values.documentation}
                  label="Custom Documentation"
                />
              </Grid>
            </Grid>
          </Paper>
          <pre>{JSON.stringify(values, null, 2)}</pre>
        </Form>
      )}
    </Formik>
  );
};
