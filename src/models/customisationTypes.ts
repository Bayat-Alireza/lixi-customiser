
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

export type StringTypeAttributeType = {
  optionalToMandatory: boolean;
  pattern?: {regex:string,definition?:string};
  stringTo?: "list" | "pattern" | "";
  excerpt: string;
  documentation: string;
  heading?: string;
  enumerations: { name: string; definition: string }[];
};

export type IntegerTypeAttributeType = {
  optionalToMandatory: boolean;
  excerpt: string;
  documentation: string;
  heading?: string;
  minInteger?: string;
  maxInteger?: string;
};
export type ListTypeAttributeType = {
  optionalToMandatory: boolean;
  excerpt: string;
  documentation: string;
  heading?: string;
};

export type tokenType={
  tokens:string[];
  excerpt?: string;
  documentation?: string;
  heading?: string;
}