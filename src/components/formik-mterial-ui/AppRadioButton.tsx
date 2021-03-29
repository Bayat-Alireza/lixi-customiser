import React from "react";
import Radio, { RadioProps } from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { FieldAttributes, useField } from "formik";

type AppRadioButtonType = { label: string } & RadioProps & FieldAttributes<{}>;

export const AppRadioButton: React.FC<AppRadioButtonType> = ({
  label,
  onSelect,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  return (
    <FormControlLabel
      {...field}
      control={<Radio onSelect={onSelect} color="primary" />}
      label={label}
    />
  );
};
