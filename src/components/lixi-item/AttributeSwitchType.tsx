import React from "react";

interface ISwitchAttributeType {
  switchType: string;
  children: React.ReactElement<{
    type:
      | "stringType"
      | "integerType"
      | "decimalType"
      | "currencyType"
    | "listType"
    | "default"
  }>[];
}
export const SwitchAttributeType: React.FC<ISwitchAttributeType> = ({
  children,
  switchType,
}) => {
  const regex = /^[a-zA-Z]+List$/;
  const child = children.find(({ props }) => {
    const { type } = props;

    if (regex.test(switchType)) {
      return type === "listType";
    }
    if (type === 'default') {
      return true
    }
    return switchType === type;
  });
  return child || <></>;
};
