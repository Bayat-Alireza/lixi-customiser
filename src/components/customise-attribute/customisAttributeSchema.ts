import * as Yup from "yup";

export const customiseAttributeSchema = Yup.object().shape({
  optionalToMandatory: Yup.boolean(),
  pattern: Yup.string().required(),
});
