import { Customiser } from "./Customiser";
import { StringTypeAttributeType } from "./customisationTypes";

export class StringTypeAttributeCustomiser extends Customiser {
  object = {} as StringTypeAttributeType;
  constructor(
    customisation: Element | undefined = undefined,
    path?: string,
    values?: StringTypeAttributeType
  ) {
    super(customisation, path);
    this.object = values || {
      optionalToMandatory: false,
      pattern: { regex: "", definition: "" },
      stringTo: "",
      excerpt: "",
      heading: "",
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
    this.excerpt = excerpt ? excerpt : "";
    this.documentation = documentation ? documentation : "";
    this.removeCustomisedItem();
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
      enumeration.textContent = name.trim();
      enumeration.setAttribute("Definition", definition);
      this.customiseItem.append(enumeration);
    });
  }
  customPattern() {
    if (this.object.stringTo !== "pattern") return;
    const doc = Customiser.docStub();
    const pattern = doc.createElement("Pattern");
    if (this.object.pattern) {
      const { regex, definition } = this.object.pattern;
      if (regex) {
        pattern.textContent = regex?.toString();
      }
      if (definition) {
        pattern.setAttribute("Definition", definition);
      }
    }
    this.customiseItem.append(pattern);
  }

  setInLineAttributes() {
    const {
      optionalToMandatory,
      stringTo,
      enumerations,
      heading,
    } = this.object;
    if (heading) {
      this.customiseItem.setAttribute("customHeading", heading);
    }
    if (optionalToMandatory) {
      this.customiseItem.setAttribute("OptionalToMandatory", "Yes");
    }
    if (stringTo === "pattern") {
      this.customiseItem.setAttribute("StringToPattern", "Yes");
      return;
    }
    if (stringTo === "list" && enumerations.length) {
      this.customiseItem.setAttribute("StringToList", "Yes");
      return;
    }
  }

  customisedObject() {
    const customisedAttr = this.getCustomisedItem()?.parentElement;
    if (!customisedAttr) return this.object;
    customisedAttr.getAttributeNames().forEach((att, idx) => {
      switch (att) {
        case "customHeading": {
          this.object.heading =
            customisedAttr.getAttribute("customHeading") || "";
          break;
        }
        case "OptionalToMandatory": {
          this.object.optionalToMandatory = true;
          break;
        }
        case "StringToPattern": {
          this.object.stringTo = "pattern";
          break;
        }
        case "StringToList": {
          this.object.stringTo = "list";
          break;
        }
        default:
          break;
      }
    });
    Array.prototype.forEach.call(customisedAttr.children, (child: Element) => {
      switch (child.localName) {
        case "Enumeration":
          const name = child.textContent?.trim();
          const definition = child.getAttribute("Definition");
          if (!name || !definition) return;
          this.object.enumerations.push({ name, definition });
          break;
        case "CustomExcerpt":
          const excerpt = child.textContent?.trim();
          this.object.excerpt = excerpt ? excerpt : "";
          break;
        case "CustomDocumentation":
          const documentation = child.textContent?.trim();
          this.object.documentation = documentation ? documentation : "";
          break;
        case "Pattern":
          const pattern = child.textContent?.trim();
          const regexDefinition = child.getAttribute("Definition") || "";
          this.object.pattern = {
            regex: pattern ? pattern : "",
            definition: regexDefinition,
          };
          break;
        default:
          break;
      }
    });
    return this.object;
  }
}
