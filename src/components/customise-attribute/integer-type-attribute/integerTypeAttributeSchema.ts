import * as Yup from "yup";

export const integerTypeSchema = Yup.object().shape({
  optionalToMandatory: Yup.boolean(),
  minInteger: Yup.number()
    .min(0, "Value must be grater than or equal to zero")
    .typeError("Only an integer value allowed")
    .integer("Only an integer value allowed"),
  maxInteger: Yup.number()
    .positive("Value must be grater than zero")
    .typeError("Only an integer value allowed")
    .integer("Only an integer value allowed")
    .test({
      name: "minInteger",
      exclusive: false,
      message: "Value must be grater than the minimum value",
      params: {},
      test: function (value) {
        if (value && this.parent.minInteger) {
          return value > this.parent.minInteger;
        }
        return true;
      },
    }),
});
