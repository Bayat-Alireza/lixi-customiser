import FormControl, { FormControlProps } from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select, { SelectProps } from "@material-ui/core/Select";
import { useField, FieldAttributes } from "formik";
import React from "react";

type AppSelectProps = {
  selectProps?: SelectProps;
  formControlProps?: FormControlProps;
  data: any;
  label?: string;
} & FieldAttributes<{}>;

export const AppSelect: React.FC<AppSelectProps> = ({
  label,
  selectProps,
  formControlProps,
  data,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  return (
    <FormControl fullWidth {...formControlProps}>
      <InputLabel id="transactionList">{label}</InputLabel>
      <Select
        error={!!meta.error}
        {...field}
        {...selectProps}
        fullWidth
        label={label}
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        value={meta.value}
      >
        {data.map((tv: any) => {
          if (tv.transactionType) {
            return (
              <MenuItem
                id={`${tv.transactionType}_${tv.transactionVersion}`}
                key={`${tv.transactionType}_${tv.transactionVersion}`}
                value={`${tv.transactionType}_${tv.transactionVersion}`}
              >{`${tv.transactionType} ${tv.transactionVersion}`}</MenuItem>
            );
          } else {
            return <MenuItem></MenuItem>;
          }
        })}
      </Select>
      <FormHelperText error>{meta.error}</FormHelperText>
    </FormControl>
  );
};
