import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import React from "react";
import { useField, FieldAttributes } from "formik";

type AppTextFieldProps = CheckboxProps & FieldAttributes<{}>;

export const AppCheckBox: React.FC<AppTextFieldProps> = ({
  checked,
  ...props
}) => {
  const [field] = useField<{}>(props);
  return <Checkbox checked={checked} {...field} {...props} />;
};
