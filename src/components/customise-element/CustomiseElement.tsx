import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import List from "@material-ui/core/List";
import { LixiBase } from "../../models/LixiBase";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { CustomiseElementSchema } from "./customiseElementSchema";
import { AppTextField } from "../formik-mterial-ui/AppTextField";
import { AppCheckBox } from "../formik-mterial-ui/AppCheckBox";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./customiseElementStyle";
import { FastRewind } from "@material-ui/icons";
import { ElementSubItems } from "../element-sub-items/ElementSubItems";

interface ICustomiseElement {
  lixiItem: LixiBase | undefined;
}
type SubElement = { [key: string]: Element[] };

export const CustomiseElement: React.FC<ICustomiseElement> = ({ lixiItem }) => {
  const classes = useStyles();

  const [itemSubElement, setItemSubElement] = React.useState<SubElement>({});
  const [itemAttributes, setItemAttributes] = React.useState<Element[]>([]);

  const [newMin, setNewMin] = React.useState<string>();
  const [newMax, setNewMax] = React.useState<string>();
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
      return itemEle?.path?.split(".").pop();
    });
  }, [itemAttributes]);
  const leafEle = React.useMemo(() => {
    return (itemSubElement["choice"] || itemSubElement["sequence"])?.map(
      (item, idx) => {
        const itemEle = new LixiBase(item);
        return itemEle?.path?.split(".").pop();
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
      // validateOnBlur={false}
      initialValues={{
        newMin: undefined,
        newMax: "",
        excludeSubElement: [],
        excludeItemAttributes: [],
        excerpt: undefined,
        documentation: undefined,
      }}
      validationSchema={() =>
        CustomiseElementSchema(occursMinMax?.min, occursMinMax?.max)
      }
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
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
              <Grid item xs={12} sm={itemAttributes?.length ? 6 : 12}>
                {/* <Divider /> */}
                {leafEle ? (
                  <ElementSubItems
                    parentPath={lixiItem?.path || ""}
                    header={`Sub-Elements ${
                      itemSubElement["choice"] ? "CHOICE" : "(SEQUENCE)"
                    }`}
                    subItems={leafEle}
                    arrayName="excludeSubElement"
                  />
                ) : undefined}
              </Grid>
              <Grid
                item
                xs={12}
                sm={
                  (itemSubElement["choice"] || itemSubElement["sequence"])
                    ?.length
                    ? 6
                    : 12
                }
              >
                {leafAttribs ? (
                  <ElementSubItems
                    parentPath={lixiItem?.path || ""}
                    header="Attributes"
                    subItems={leafAttribs}
                    arrayName="excludeItemAttributes"
                  />
                ) : undefined}
              </Grid>
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
