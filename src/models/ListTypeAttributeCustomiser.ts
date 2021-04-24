import { Customiser } from "./Customiser";
import { IntegerTypeAttributeType } from "./customisationTypes";

export class ListTypeAttributeCustomiser extends Customiser {
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
    this.customExcerpt();
    this.customDocumentation();

    this.customisation.append(this.customiseItem);
  }

  setInLineAttributes() {
    const { optionalToMandatory, heading } = this.object;
    if (heading) {
      this.customiseItem.setAttribute("customHeading", heading);
    }
    if (optionalToMandatory) {
      this.customiseItem.setAttribute("OptionalToMandatory", "Yes");
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
        default:
          break;
      }
    });
    return this.object;
  }
}
