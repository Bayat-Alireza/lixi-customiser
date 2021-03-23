import React from "react";
import { Formik, useFormik, useFormikContext } from "formik";
import { stringToEnumeratedListSchema } from "./stringToListSchema";
import Grid from "@material-ui/core/Grid";
import { AppTextField } from "../../formik-mterial-ui/AppTextField";
import ControlPointRoundedIcon from "@material-ui/icons/ControlPointRounded";
import IconButton from "@material-ui/core/IconButton/IconButton";
import { useStyles } from "./stringToListStyle";
import Paper from "@material-ui/core/Paper";

interface ITypeFormikValue {
  optionalToMandatory: boolean;
  stringTo: string;
  enumerations: { definition: string; name: string }[];
}

export const StringToList: React.FC = () => {
  const classes = useStyles();
  const { getFieldHelpers, values } = useFormikContext<ITypeFormikValue>();
  return (
    <Formik
      initialValues={{ definition: "", name: "" }}
      onSubmit={(val, { resetForm }) => {
        values.enumerations.push(val);
        getFieldHelpers("enumerations").setValue(values.enumerations);
        // alert(JSON.stringify(val, null, 2));
        resetForm();
      }}
      validationSchema={stringToEnumeratedListSchema}
    >
      {(formik) => (
        <Paper className={classes.header}>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs={12} sm={5}>
              <AppTextField
                className={classes.textField}
                fullWidth
                size="small"
                variant="outlined"
                name="name"
                placeholder="Name"
                label="Name"
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <AppTextField
                className={classes.textField}
                size="small"
                fullWidth
                variant="outlined"
                name="definition"
                placeholder="Definition"
                label="Definition"
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <IconButton
                onClick={formik.submitForm}
                color="primary"
                aria-label="delete"
              >
                <ControlPointRoundedIcon fontSize="large" />
              </IconButton>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Formik>
  );
};
