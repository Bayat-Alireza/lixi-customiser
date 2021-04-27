import React from "react";
import { useStyles } from "./stringTypeAttributeStyle";
import { FieldArray, Form, Formik } from "formik";
import Paper from "@material-ui/core/Paper";

import { customiseAttributeSchema } from "./stringTypeAttributeSchema";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

import FormControl from "@material-ui/core/FormControl";
// import { AppTextField } from "../formik-mterial-ui/AppTextField";

import Divider from "@material-ui/core/Divider";
import Collapse from "@material-ui/core/Collapse";
import { LixiBase } from "../../../models/LixiBase";
import { useAction } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypeSelector";
import { StringTypeAttributeType } from "../../../models/customisationTypes";
import { AppCheckBox } from "../../formik-mterial-ui/AppCheckBox";
import { StringToPattern } from "./string-to-pattern/StringToPattern";
import { AppRadioButton } from "../../formik-mterial-ui/AppRadioButton";
import { StringToListHeader } from "./string-to-list-header/StringToListHeader";
import { StringToListBody } from "./string-to-list-body/StringToListBody";
import { ExcerptDocumentation } from "../../excerpt-documentation/ExcerptDocumentation";
import { StringTypeAttributeCustomiser } from "../../../models/StringTypeAttributeCustomiser";

// import { CustomIntegerRange } from "./custom-integer-range/CustomIntegerRange";

interface ICustomiseAttribute {
  lixiItem: LixiBase | undefined;
  type?: "stringType";
}

export const StringTypeAttribute: React.FC<ICustomiseAttribute> = ({
  lixiItem,
}) => {
  const classes = useStyles();
  const { updateCustomisation } = useAction();
  const { customization } = useTypedSelector((state) => state.customizer);
  const [
    initialValue,
    setInitialValue,
  ] = React.useState<StringTypeAttributeType>({
    optionalToMandatory: false,
    pattern: { regex: "", definition: "" },
    stringTo: "",
    excerpt: "",
    documentation: "",
    heading: "",
    enumerations: [],
  });

  React.useEffect(() => {
    if (!lixiItem?.path) return;
    const newCustomisation = new StringTypeAttributeCustomiser(
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
        console.log("values", values);
        if (!lixiItem?.path) return;
        setSubmitting(true);
        const attCustomiser = new StringTypeAttributeCustomiser(
          customization,
          lixiItem?.path,
          values
        );
        attCustomiser.customise();
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
              <Paper style={{ padding: "0.5rem", margin: "0.5rem 0.2rem" }}>
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
                <StringToPattern resetForm={resetForm} />
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
                      <StringToListHeader />
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
          {/* <pre>{JSON.stringify(values, null, 2)}</pre>
          <pre>{JSON.stringify(lixiItem?.path, null, 2)}</pre>
          <pre>{JSON.stringify(errors, null, 2)}</pre> */}
        </Form>
      )}
    </Formik>
  );
};

StringTypeAttribute.defaultProps = {
  type: "stringType",
};
