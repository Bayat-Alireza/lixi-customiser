import React from "react";
import { useStyles } from "./customiseAttributeStyle";
import { FieldArray, Form, Formik } from "formik";
import Paper from "@material-ui/core/Paper";
import { AppCheckBox } from "../formik-mterial-ui/AppCheckBox";
import { customiseAttributeSchema } from "./customisAttributeSchema";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { AppRadioButton } from "../formik-mterial-ui/AppRadioButton";
import FormControl from "@material-ui/core/FormControl";
import { AppTextField } from "../formik-mterial-ui/AppTextField";
import { StringToList } from "./string-to-list/string-to-list-header/StringToListHeader";
import Divider from "@material-ui/core/Divider";
import Collapse from "@material-ui/core/Collapse";
import { StringToListBody } from "./string-to-list/string-to-list-body/StringToListBody";
import { ExcerptDocumentation } from "../excerpt-documentation/ExcerptDocumentation";
import { AttributeCustomiser } from "../../models/AttributeCustomiser";
import { LixiBase } from "../../models/LixiBase";
import { useTypedSelector } from "../../hooks/useTypeSelector";
import { CustomiseAttributeType } from "../../models/customisationTypes";
import { useAction } from "../../hooks/useActions";

interface ICustomiseAttribute {
  lixiItem: LixiBase | undefined;
}

export const CustomiseAttribute: React.FC<ICustomiseAttribute> = ({
  lixiItem,
}) => {
  const classes = useStyles();
  const { updateCustomisation } = useAction();
  const { customization } = useTypedSelector((state) => state.customizer);
  const [
    initialValue,
    setInitialValue,
  ] = React.useState<CustomiseAttributeType>({
    optionalToMandatory: false,
    pattern: "",
    stringTo: "",
    excerpt: "",
    documentation: "",
    heading:     "",
    enumerations: [],
  });

  React.useEffect(() => {
    if (!lixiItem?.path) return;
    const newCustomisation = new AttributeCustomiser(
      customization,
      lixiItem?.path
    );
    const instruction = newCustomisation.customisedObject();
    setInitialValue(instruction);
  }, [customization, lixiItem?.path]);

  return (
    <Formik
      initialValues={initialValue}
      enableReinitialize
      validationSchema={customiseAttributeSchema}
      onSubmit={(values, { setSubmitting }) => {
        if (!lixiItem?.path) return;
        setSubmitting(true);
        const attCustomiser = new AttributeCustomiser(
          customization,
          lixiItem?.path,
          values
        );
        attCustomiser.customise();
        // console.log("ci", attCustomiser.customisation);
        updateCustomisation(attCustomiser.customisation);
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting, values, errors, touched, resetForm }) => (
        <Form>
          <Paper style={{ padding: "0.5rem" }}>
          <FormControl style={{ width: "100%" }}>
            <Paper
              style={{ padding: "0.5rem", margin: "0.5rem 0.2rem" }}
            >
              <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "0.5rem",
                    }}
                  >
              <AppCheckBox
                name="optionalToMandatory"
                color="primary"
                size="medium"
                label="Optional To Mandatory"
                checked={values?.optionalToMandatory}
                // value={values?.optionalToMandatory}
              />
              <Button
                className={classes.saveButton}
                size="small"
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<SaveIcon fontSize="large" />}
              >
                Save
              </Button>
              </div>
            </Paper>
            </FormControl>
            <Divider />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                width: "100%",
              }}
            >
              <FormControl style={{ width: "100%" }}>
                <Paper style={{ padding: "0.5rem", margin: "0.5rem 0.2rem" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <AppRadioButton
                      name="stringTo"
                      type="radio"
                      value="pattern"
                      label="String To Pattern"
                    />
                    <Collapse
                      onExit={() =>
                        resetForm({ values: { ...values, pattern: "" } })
                      }
                      in={values.stringTo === "pattern"}
                    >
                      <AppTextField
                        variant="outlined"
                        size="small"
                        label="Regex Expression"
                        name="pattern"
                        placeholder="Regex Expression"
                        value={values.pattern}
                      />
                    </Collapse>
                  </div>
                </Paper>
                <Paper style={{ padding: "0.5rem", margin: "0.5rem 0.2rem" }}>
                  <AppRadioButton
                    name="stringTo"
                    type="radio"
                    value="list"
                    label="String To Enumerated List"
                  />

                  <Collapse
                    onExit={() =>
                      resetForm({ values: { ...values, enumerations: [] } })
                    }
                    in={values.stringTo === "list"}
                  >
                    <div style={{ width: "100%" }}>
                      <StringToList />
                      <FieldArray name="enumerations">
                        {(arrayHelper) => {
                          return (
                            <div className={classes.enumeratedList}>
                              {values.enumerations.map((e, idx) => {
                                return (
                                  <StringToListBody
                                    key={`${e["name"]}-`}
                                    idx={idx}
                                    remove={arrayHelper.remove}
                                    name={e["name"]}
                                    definition={e["definition"]}
                                  />
                                );
                              })}
                            </div>
                          );
                        }}
                      </FieldArray>
                    </div>
                  </Collapse>
                </Paper>
              </FormControl>
            </div>
            <ExcerptDocumentation />
          </Paper>
        </Form>
      )}
    </Formik>
  );
};
