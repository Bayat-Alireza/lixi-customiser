import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import { Form, Formik } from "formik";
import React from "react";
import { useAction } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypeSelector";
import { LixiBase } from "../../../models/LixiBase";
import { ExcerptDocumentation } from "../../excerpt-documentation/ExcerptDocumentation";
import { AppCheckBox } from "../../formik-mterial-ui/AppCheckBox";
import { useStyles } from "./defaultTypeAttributeStyle";
import { ListTypeAttributeType } from "../../../models/customisationTypes";
import { ListTypeAttributeCustomiser } from "../../../models/ListTypeAttributeCustomiser";

interface ICustomiseListTypeAttribute {
  lixiItem: LixiBase | undefined;
  type?: "default";
}

export const DefaultTypeAttribute: React.FC<ICustomiseListTypeAttribute> = ({
  lixiItem,
}) => {
  const classes = useStyles();
  const { updateCustomisation } = useAction();
  const { customization } = useTypedSelector((state) => state.customizer);
  const [initialValue, setInitialValue] = React.useState<ListTypeAttributeType>(
    {
      optionalToMandatory: false,
      excerpt: "",
      documentation: "",
      heading: "",
    }
  );

  React.useEffect(() => {
    if (!lixiItem?.path) return;
    const newCustomisation = new ListTypeAttributeCustomiser(
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
      // validationSchema={integerTypeSchema}
      onSubmit={(values, { setSubmitting }) => {
        if (!lixiItem?.path) return;
        setSubmitting(true);
        const attCustomiser = new ListTypeAttributeCustomiser(
          customization,
          lixiItem?.path,
          values
        );
        attCustomiser.customise();
        // console.log("ci", attCustomiser.customisation);
        updateCustomisation(attCustomiser.customisation);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, values, errors, touched, resetForm, submitForm }) => (
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
                    onBlur={submitForm}
                    color="primary"
                    size="medium"
                    label="Optional To Mandatory"
                    checked={values?.optionalToMandatory}
                  />
                  {/* <Button
                    className={classes.saveButton}
                    size="small"
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon fontSize="large" />}
                  >
                    Save
                  </Button> */}
                </div>
              </Paper>
            </FormControl>
            <Divider />
            <ExcerptDocumentation />
          </Paper>
        </Form>
      )}
    </Formik>
  );
};

DefaultTypeAttribute.defaultProps = {
  type: "default",
};
