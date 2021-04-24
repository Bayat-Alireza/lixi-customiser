import * as Yup from "yup";

export const stringToEnumeratedListSchema = Yup.object().shape({
  definition: Yup.string()
    .required()
    .matches(/^[a-zA-Z0-9 '"%]*$/, {
      message: "Only alphanumerical values, % and quotes are allowed",
    })
    .min(3),
  name: Yup.string()
    .required()
    .matches(/^[a-zA-Z0-9 '"%]*$/, {
      message: "Only alphanumerical values, % and quotes are allowed",
    })
    .min(3),
});
