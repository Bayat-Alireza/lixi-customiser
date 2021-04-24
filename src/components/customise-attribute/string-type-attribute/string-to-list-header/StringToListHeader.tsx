import React from "react";
import { Formik, useFormikContext } from "formik";
import { stringToEnumeratedListSchema } from "./stringToListHeaderSchema";
import Grid from "@material-ui/core/Grid";
import { AppTextField } from "../../../formik-mterial-ui/AppTextField";
import ControlPointRoundedIcon from "@material-ui/icons/ControlPointRounded";
import IconButton from "@material-ui/core/IconButton/IconButton";
import { useStyles } from "./stringToListHeaderStyle";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

interface ITypeFormikValue {
  optionalToMandatory: boolean;
  stringTo: string;
  enumerations: { definition: string; name: string }[];
}

export const StringToListHeader: React.FC = () => {
  const classes = useStyles();
  const [nameAlert, setNameAlert] = React.useState(false);
  const { getFieldHelpers, values } = useFormikContext<ITypeFormikValue>();
  return (
    <Formik
      initialValues={{ definition: "", name: "", enumList: [] }}
      onSubmit={(val, { resetForm }) => {
        if (values.enumerations.some((e) => e.name === val.name)) {
          setNameAlert(true);
          return;
        }

        const valuesCopy = [...values.enumerations];
        valuesCopy.push(val);
        getFieldHelpers("enumerations").setValue(valuesCopy);
        resetForm();
      }}
      validationSchema={stringToEnumeratedListSchema}
    >
      {(formik) => (
        <Paper className={classes.header}>
          <Grid container alignItems="center" spacing={3}>
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
            <Snackbar
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              open={nameAlert}
              autoHideDuration={2000}
              onClose={() => setNameAlert(false)}
            >
              <Alert onClose={() => setNameAlert(false)} severity="error">
                <strong>Duplicated Name</strong>
                <em>{`"${formik.values.name}"`}</em>
                already exist!
              </Alert>
            </Snackbar>
          </Grid>
        </Paper>
      )}
    </Formik>
  );
};
