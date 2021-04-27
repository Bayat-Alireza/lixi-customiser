export enum LixiAttributeEnum {
  type = "type",
  name = "name",
  use = "use",
  minOccurs = "minOccurs",
  maxOccurs = "maxOccurs",
  value = "value",
  base = "base",
}

export enum LixiTagEnum {
  element = "xs:element",
  annotation = "xs:annotation",
  complexType = "xs:complexType",
  choice = "xs:choice",
  sequence = "xs:sequence",
  attribute = "xs:attribute",
  simpleType = "xs:simpleType",
  restriction = "xs:restriction",
  documentation = "xs:documentation",
  path = "lx:path",
  label = "lx:label",
  transactions = "li:transactions",
  enumeration = "xs:enumeration",
  target = "lx:target",
  references = "lx:references",
}

export enum LixiLocalNameEnum {
  element = "element",
  complexType = "complexType",
  choice = "choice",
  sequence = "sequence",
  attribute = "attribute",
  simpleType = "simpleType",
  restriction = "restriction",
  annotation = "annotation",
  documentation = "documentation",
  path = "path",
  label = "label",
  transactions = "transactions",
  enumeration = "enumeration",
}
