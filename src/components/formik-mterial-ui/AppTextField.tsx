import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import React from "react";
import { useField, FieldAttributes } from "formik";
import classes from "*.module.css";
import { useStyles } from "./appTextFieldStyle";

type AppTextFieldProps = TextFieldProps & FieldAttributes<{}>;

export const AppTextField: React.FC<AppTextFieldProps> = (
  props: AppTextFieldProps
) => {
  const [field, meta] = useField<{}>(props);
  const classes = useStyles();
  return (
    <TextField
      FormHelperTextProps={{
        className: classes.helperText,
      }}
      {...field}
      {...props}
      error={!!(meta.touched && meta.error)}
      helperText={meta.error && meta.touched ? meta.error : undefined}
    />
  );
};
