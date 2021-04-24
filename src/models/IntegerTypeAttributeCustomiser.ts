import { Customiser } from "./Customiser";
import { IntegerTypeAttributeType } from "./customisationTypes";

export class IntegerTypeAttributeCustomiser extends Customiser {
  object = {} as IntegerTypeAttributeType;

  constructor(
    customisation: Element | undefined = undefined,
    path?: string,
    values?: IntegerTypeAttributeType
  ) {
    super(customisation, path);
    this.object = values || {
      optionalToMandatory: false,
      excerpt: "",
      heading: "",
      documentation: "",
      minInteger: "",
      maxInteger: "",
    };
  }

  customise() {
    const {
      optionalToMandatory,
      documentation,
      excerpt,
      minInteger,
      maxInteger,
    } = this.object;
    if (
      !optionalToMandatory &&
      !minInteger &&
      !maxInteger &&
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
    this.setInLineAttributes();
    this.integerMinMax();
    this.customExcerpt();
    this.customDocumentation();

    this.customisation.append(this.customiseItem);
  }

  integerMinMax() {
    if (!this.object.minInteger && !this.object.maxInteger) return;
    if (this.object.minInteger) {
      const doc = Customiser.docStub();
      const minInteger = doc.createElement("MinInteger");
      minInteger.textContent = this.object.minInteger.toString().trim();
      this.customiseItem.append(minInteger);
    }
    if (this.object.maxInteger) {
      const doc = Customiser.docStub();
      const maxInteger = doc.createElement("MaxInteger");
      maxInteger.textContent = this.object.maxInteger.toString().trim();
      this.customiseItem.append(maxInteger);
    }
  }

  setInLineAttributes() {
    const {
      optionalToMandatory,
      heading,
      minInteger,
      maxInteger,
    } = this.object;
    if (heading) {
      this.customiseItem.setAttribute("customHeading", heading);
    }
    if (optionalToMandatory) {
      this.customiseItem.setAttribute("OptionalToMandatory", "Yes");
    }
    if (minInteger || maxInteger) {
      this.customiseItem.setAttribute("CustomIntegerRange", "Yes");
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
        default:
          break;
      }
    });

    Array.prototype.forEach.call(customisedAttr.children, (child: Element) => {
      switch (child.localName) {
        case "CustomExcerpt":
          const excerpt = child.textContent?.trim();
          this.object.excerpt = excerpt ? excerpt : "";
          break;
        case "CustomDocumentation":
          const documentation = child.textContent?.trim();
          this.object.documentation = documentation ? documentation : "";
          break;
        case "MinInteger":
          const minInteger = child.textContent?.trim();
          if (!minInteger) return;
          try {
            // this.object.minInteger = parseInt(minInteger) ? parseInt(minInteger) : undefined;
            this.object.minInteger = minInteger ? minInteger : undefined;
          } catch (error) {}
          break;
        case "MaxInteger":
          const maxInteger = child.textContent?.trim();
          if (!maxInteger) return;
          try {
            // this.object.maxInteger = parseInt(maxInteger) ? parseInt(maxInteger) : undefined;
            this.object.maxInteger = maxInteger ? maxInteger : undefined;
          } catch (error) {}
          break;
        default:
          break;
      }
    });
    return this.object;
  }
}
