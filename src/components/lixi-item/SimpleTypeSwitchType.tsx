import React from "react";
interface ISwitchSimpleType {
  switchBase: string;
  children: React.ReactElement<{
    baseRestriction: "xs:token";
  }>[];
}
export const SwitchSimpleType: React.FC<ISwitchSimpleType> = ({
  children,
  switchBase,
}) => {
  const child = children.find(({ props }) => {
    const { baseRestriction } = props;
    return switchBase === baseRestriction;
  });
  return child || <></>;
};
