export type CustomisedElementType = {
  includeAllElements: boolean;
  includeAllAttributes: boolean;
  elements: string[];
  attributes: string[];
  newMin?: number | "";
  newMax?: number | "";
  excerpt?: string;
  documentation?: string;
  heading?: string;
};

export type CustomiseAttributeType = {
  optionalToMandatory: boolean;
  pattern: string;
  stringTo: "list" | "pattern" | "";
  excerpt: string;
  documentation: string;
  heading?: string;
  enumerations: { name: string; definition: string }[];
};
