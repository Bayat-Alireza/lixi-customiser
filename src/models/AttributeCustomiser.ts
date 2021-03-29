import { Customiser } from "./Customiser";
import { CustomiseAttributeType } from "./customisationTypes";

export class AttributeCustomiser extends Customiser {
  object = {} as CustomiseAttributeType;
  constructor(
    customisation: Element | undefined = undefined,
    path?: string,
    values?: CustomiseAttributeType
  ) {
    super(customisation, path);

    this.object = values || {
      optionalToMandatory: false,
      pattern: "",
      stringTo: "",
      excerpt: "",
      documentation: "",
      enumerations: [],
    };
  }

  customise() {
    const {
      enumerations,
      optionalToMandatory,
      pattern,
      stringTo,
      documentation,
      excerpt,
    } = this.object;
    if (
      !enumerations.length &&
      !pattern &&
      !optionalToMandatory &&
      !stringTo &&
      !documentation &&
      !excerpt
    ) {
      this.removeCustomisedItem();
      return;
    }
    this.removeCustomisedItem();
    this.excerpt = excerpt ? excerpt : "";
    this.documentation = documentation ? documentation : "";

    this.itemPath();
    this.customPattern();
    this.setInLineAttributes();
    this.customExcerpt();
    this.customDocumentation();
    this.customEnumeration();
    this.customisation.append(this.customiseItem);
  }

  customEnumeration() {
    if (!this.object.enumerations.length) return;
    const doc = Customiser.docStub();
    this.object.enumerations.forEach(({ definition, name }, idx) => {
      const enumeration = doc.createElement("Enumeration");
      enumeration.textContent = name;
      enumeration.setAttribute("definition", definition);
      this.customiseItem.append(enumeration);
    });
  }
  customPattern() {
    if (this.object.stringTo !== "pattern") return;
    const doc = Customiser.docStub();
    const pattern = doc.createElement("Pattern");
    pattern.textContent = this.object.pattern;
    this.customiseItem.append(pattern);
  }

  setInLineAttributes() {
    const { optionalToMandatory, stringTo, enumerations } = this.object;
    if (optionalToMandatory) {
      this.customiseItem.setAttribute("optionalToMandatory", "yes");
    }
    if (stringTo === "pattern") {
      this.customiseItem.setAttribute("stringToPattern", "yes");
      return;
    }
    if (stringTo === "list" && enumerations.length) {
      this.customiseItem.setAttribute("stringToList", "yes");
      return;
    }
  }

  customisedObject() {
    const customisedAttr = this.getCustomisedItem()?.parentElement;
    if (!customisedAttr) return this.object;
    customisedAttr.getAttributeNames().forEach((att, idx) => {
      switch (att) {
        case "optionalToMandatory": {
          this.object.optionalToMandatory = true;
          break;
        }
        case "stringToPattern": {
          this.object.stringTo = "pattern";
          break;
        }
        case "stringToList": {
          this.object.stringTo = "list";
          break;
        }
      }
    });
    Array.prototype.forEach.call(customisedAttr.children, (child: Element) => {
      switch (child.localName) {
        case "Enumeration":
          const name = child.textContent;
          const definition = child.getAttribute("definition");
          if (!name || !definition) return;
          this.object.enumerations.push({ name, definition });
          break;
        case "CustomExcerpt":
          const excerpt = child.textContent;
          this.object.excerpt = excerpt ? excerpt : "";
          break;
        case "CustomDocumentation":
          const documentation = child.textContent;
          this.object.documentation = documentation ? documentation : "";
          break;
        default:
          break;
      }
    });
    return this.object;
  }
}
