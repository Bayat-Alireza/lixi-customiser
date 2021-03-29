import * as Yup from "yup";

export const customiseAttributeSchema = Yup.object().shape({
  optionalToMandatory: Yup.boolean(),
  stringTo: Yup.string().oneOf(["list", "pattern"]),
  pattern: Yup.string().test({
    name: "stringTo",
    exclusive: false,
    message: "Must provide a regular expression for the pattern",
    params: {},
    test: function (value) {
      if (this.parent.stringTo === "pattern") {
        return !!value;
      }
      return true;
    },
  }),
});
