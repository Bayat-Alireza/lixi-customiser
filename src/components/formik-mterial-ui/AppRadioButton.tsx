import React from "react";
import Radio, { RadioProps } from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { FieldAttributes, useField } from "formik";

type AppRadioButtonType = { label: string } & RadioProps & FieldAttributes<{}>;

export const AppRadioButton: React.FC<AppRadioButtonType> = ({
  label,
  onSelect,
  ...props
}) => {
  const [field] = useField<{}>(props);
  return (
    <FormControlLabel
      {...field}
      control={<Radio onSelect={onSelect} color="primary" />}
      label={label}
    />
  );
};
