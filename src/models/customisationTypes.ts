export type CustomisedElementType = {
  includeAllElements: boolean;
  includeAllAttributes: boolean;
  Elements: string[];
  Attributes: string[];
  newMin?: number | undefined;
  newMax?: number | undefined;
  excerpt?: string | undefined;
  documentation?: string | undefined;
};
