import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import React from "react";
import { useField, FieldAttributes } from "formik";

type AppTextFieldProps = TextFieldProps & FieldAttributes<{}>;

export const AppTextField: React.FC<AppTextFieldProps> = (
  props: AppTextFieldProps
) => {
  const [field, meta] = useField<{}>(props);
  return (
    <TextField
      {...field}
      {...props}
      error={!!meta.error}
      helperText={meta.error && meta.touched ? meta.error : undefined}
    />
  );
};
