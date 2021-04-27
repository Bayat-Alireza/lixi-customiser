import * as Yup from "yup";

export const customiseAttributeSchema = Yup.object().shape({
  optionalToMandatory: Yup.boolean(),
  stringTo: Yup.string().oneOf(["list", "pattern"]),
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
  // pattern: Yup.string().test({
  //   name: "stringTo",
  //   exclusive: false,
  //   message: "Must provide a regular expression for the pattern",
  //   params: {},
  //   test: function (value) {
  //     if (this.parent.stringTo === "pattern") {
  //       return !!value;
  //     }
  //     return true;
  //   },
  // }),

  // "pattern.regex": Yup.string().test({
  //   name: "stringTo",
  //   exclusive: false,
  //   message: "Must provide a regular expression for the pattern",
  //   params: {},
  //   test: function (value) {
  //     if (this.parent.stringTo === "pattern") {
  //       console.log("value@", value);
  //       return !!value;
  //     }
  //     return true;
  //   },
  // }),

  pattern: Yup.object({
    regex: Yup.string(),
    definition: Yup.string(),
  }).test({
    name: "stringTo",
    exclusive: false,
    message: "Must provide a valid regular expression for the pattern",
    params: {},
    test: function (value) {
      if (this.parent.stringTo === "pattern") {
        console.log("value", value);
        if (!value.regex) return false;
        try {
          return !!new RegExp(value.regex);
        } catch (error) {
          return false;
        }
      }
      return true;
    },
  }),
});
