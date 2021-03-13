export type CustomisedElementType = {
  includeAllElements: boolean;
  includeAllAttributes: boolean;
  elements: string[];
  attributes: string[];
  newMin?: number | "";
  newMax?: number | "";
  excerpt?: string;
  documentation?: string;
};
