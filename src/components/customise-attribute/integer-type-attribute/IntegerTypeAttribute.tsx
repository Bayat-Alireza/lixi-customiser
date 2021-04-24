import React from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import FormControl from "@material-ui/core/FormControl";
import Divider from "@material-ui/core/Divider";
import { LixiBase } from "../../../models/LixiBase";
import { useStyles } from "./integerTypeAttributeStyle";
import { useAction } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypeSelector";
import { ExcerptDocumentation } from "../../excerpt-documentation/ExcerptDocumentation";
import { AppTextField } from "../../formik-mterial-ui/AppTextField";
import { AppCheckBox } from "../../formik-mterial-ui/AppCheckBox";
import { integerTypeSchema } from "./integerTypeAttributeSchema";
import { IntegerTypeAttributeType } from "../../../models/customisationTypes";
import { IntegerTypeAttributeCustomiser } from "../../../models/IntegerTypeAttributeCustomiser";
import { Form, Formik } from "formik";

interface ICustomiseIntegerTypeAttribute {
  lixiItem: LixiBase | undefined;
  type?: "integerType";
}

export const IntegerTypeAttribute: React.FC<ICustomiseIntegerTypeAttribute> = ({
  lixiItem,
}) => {
  const classes = useStyles();
  const { updateCustomisation } = useAction();
  const { customization } = useTypedSelector((state) => state.customizer);
  const [
    initialValue,
    setInitialValue,
  ] = React.useState<IntegerTypeAttributeType>({
    optionalToMandatory: false,
    excerpt: "",
    documentation: "",
    heading: "",
    minInteger: "",
    maxInteger: "",
  });

  React.useEffect(() => {
    if (!lixiItem?.path) return;
    const newCustomisation = new IntegerTypeAttributeCustomiser(
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
      validationSchema={integerTypeSchema}
      onSubmit={(values, { setSubmitting }) => {
        if (!lixiItem?.path) return;
        setSubmitting(true);
        const attCustomiser = new IntegerTypeAttributeCustomiser(
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
                <Paper className={classes.paper}>
                  <div className={classes.container}>
                    <AppTextField
                      variant="outlined"
                      size="small"
                      label="Minimum"
                      name="minInteger"
                      placeholder="Minimum"
                      // value={values.minInteger}
                    />
                    <AppTextField
                      variant="outlined"
                      size="small"
                      label="Maximum"
                      name="maxInteger"
                      placeholder="Maximum"
                      // value={values.maxInteger}
                    />
                  </div>
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

IntegerTypeAttribute.defaultProps = {
  type: "integerType",
};
