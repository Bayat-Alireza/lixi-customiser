import * as Yup from "yup";

export const stringToEnumeratedListSchema = Yup.object().shape({
  definition: Yup.string().required().min(3),
  name: Yup.string().required().min(3),
});
