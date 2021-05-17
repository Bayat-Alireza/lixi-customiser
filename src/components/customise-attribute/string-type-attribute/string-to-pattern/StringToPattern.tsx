import Collapse from "@material-ui/core/Collapse";
import FormHelperText from "@material-ui/core/FormHelperText";
import Paper from "@material-ui/core/Paper";
import { FormikState, useFormikContext } from "formik";
import React from "react";
import { StringTypeAttributeType } from "../../../../models/customisationTypes";
import { AppRadioButton } from "../../../formik-mterial-ui/AppRadioButton";
import { AppTextField } from "../../../formik-mterial-ui/AppTextField";

import { useStyles } from "./stringToPatternStyle";

interface IStringToPattern {
  resetForm: (
    nextState?: Partial<FormikState<StringTypeAttributeType>> | undefined
  ) => void;
}

export const StringToPattern: React.FC<IStringToPattern> = ({ resetForm }) => {
  const classes = useStyles();
  const {
    values,
    errors,
    touched,
    submitForm
  } = useFormikContext<StringTypeAttributeType>();
  return (
    <Paper style={{ padding: "0.5rem", margin: "0.5rem 0.2rem" }}>
      <div className={classes.container}>
        <AppRadioButton
          name="stringTo"
          type="radio"
          value="pattern"
          label="String To Pattern"
        />
        <Collapse
          style={{ width: "100%", marginTop: "0.5rem" }}
          onExit={() =>
            resetForm({
              values: {
                ...values,
                pattern: { ...values.pattern, regex: "", definition: "" },
              },
            })
          }
          in={values.stringTo === "pattern"}
        >
          {/* <FormHelperText error={!!errors.pattern}>
            {errors.pattern}
          </FormHelperText> */}
          <div>
            <AppTextField
              variant="outlined"
              onBlur={submitForm}
              size="small"
              label="Regex Expression"
              name="pattern.regex"
              placeholder="Regex Expression"
              // value={values.pattern?.regex}
            />

            {touched.pattern && errors.pattern ? (
              <FormHelperText
                className={classes.helperText}
                error={!!errors.pattern}
              >
                {errors.pattern}
              </FormHelperText>
            ) : null}
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            <AppTextField
              variant="outlined"
              onBlur={submitForm}
              size="small"
              fullWidth
              label="Regex Definition"
              name="pattern.definition"
              placeholder="Regex Definition"
              // value={values.pattern?.definition}
            />
          </div>
        </Collapse>
      </div>
    </Paper>
  );
};
