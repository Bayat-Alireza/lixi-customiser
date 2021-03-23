import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import React from "react";
import { useField, FieldAttributes } from "formik";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";

type AppTextFieldProps = { label?: string } & CheckboxProps &
  FieldAttributes<{}>;

export const AppCheckBox: React.FC<AppTextFieldProps> = ({
  checked,
  label,
  ...props
}) => {
  const [field,meta] = useField<{}>(props);
  if (label)  {
    return (
      <FormControl error={meta.touched && meta.error?true:false }>
        {/* <FormHelperText>{meta.touched && meta.error? meta.error:undefined}</FormHelperText> */}
        <FormControlLabel
          
          style={{ padding: 0,color:meta.touched && meta.error?"red":"inherit" }}
          control={<Checkbox checked={checked} {...field} {...props} />}
          label={label}
        />
      
      </FormControl>
      
    );
  }  else  {
    return <Checkbox checked={checked} {...field} {...props} />;;
  }
};
