import * as Yup from "yup";

export const CustomiseElementSchema = (
  currentMin: string | null | undefined,
  currentMax: string | null | undefined
) => {
  const min = currentMin ? parseInt(currentMin) : 0;
  const max = currentMax && parseInt(currentMax) ? parseInt(currentMax) : 99999;

  return Yup.object().shape(
    {
      newMin: Yup.number().moreThan(min).max(max),
      newMax: Yup.number()
        .max(max - 1)
        .test({
          name: "min",
          exclusive: false,
          message: "Must be greater than new min occurs",
          params: {},
          test: function (value) {
            if (value && this.parent.newMin) {
              return value > this.parent.newMin;
            }
            return true;
          },
        }),

      excerpt: Yup.string().max(100),
      documentation: Yup.string().max(100),
    },
    [["newMin", "newMax"]]
  );
};
