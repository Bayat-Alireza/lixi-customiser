import { Customiser } from "./Customiser";
import { CustomisedElementType } from "./customisationTypes";

export class ElementCustomiser extends Customiser {
  object = {} as CustomisedElementType;
  fixedList: boolean;
  constructor(
    customisation: Element | undefined = undefined,
    path?: string,
    values?: CustomisedElementType
  ) {
    super(customisation, path);
    this.fixedList = !!(values?.elements.length || values?.attributes.length);
    this.object = values || {
      includeAllElements: true,
      excludeAllElements: false,
      includeAllAttributes: true,
      excludeAllAttributes: false,
      elements: [],
      attributes: [],
      heading: "",
      excerpt: "",
      documentation: "",
      newMin: "",
      newMax: "",
    };
  }

  customise() {
    const {
      includeAllAttributes,
      attributes,
      includeAllElements,
      elements,
      newMin,
      newMax,
      documentation,
      excerpt,
      heading,
    } = this.object;
    if (
      !includeAllAttributes &&
      !attributes.length &&
      !includeAllElements &&
      !elements.length &&
      !newMax &&
      !newMin &&
      !documentation &&
      !heading &&
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
    this.customMaxOccurs();
    this.customMinOccurs();
    this.customAttributes();
    this.customElements();
    this.customExcerpt();
    this.customDocumentation();
    this.customisation.append(this.customiseItem);
  }

  customMinOccurs() {
    if (this.object.newMin) {
      this.customiseItem.setAttribute("CustomMinOccurs", "Yes");
      const doc = Customiser.docStub();
      const customMinOccurs = doc.createElement("CustomMinOccurs");
      customMinOccurs.textContent = this.object.newMin.toString();
      this.customiseItem.append(customMinOccurs);
    }
  }
  customMaxOccurs() {
    if (this.object.newMax) {
      this.customiseItem.setAttribute("CustomMaxOccurs", "Yes");
      const doc = Customiser.docStub();
      const customMaxOccurs = doc.createElement("CustomMaxOccurs");
      customMaxOccurs.textContent = this.object.newMax.toString();
      this.customiseItem.append(customMaxOccurs);
    }
  }

  customAttributes() {
    if (!this.object.attributes.length) return;
    const doc = Customiser.docStub();
    this.object.attributes.forEach((att, idx) => {
      const attribute = doc.createElement("Attribute");
      attribute.textContent = att;
      this.customiseItem.append(attribute);
    });
  }
  customElements() {
    if (!this.object.elements.length) return;
    const doc = Customiser.docStub();
    this.object.elements.forEach((att, idx) => {
      const element = doc.createElement("Element");
      element.textContent = att;
      this.customiseItem.append(element);
    });
  }

  setInLineAttributes() {
    if (this.object.heading) {
      this.customiseItem.setAttribute("customHeading", this.object.heading);
    }
    if (this.object.elements.length || this.object.attributes.length) {
      this.customiseItem.setAttribute("Include", "Yes");
    }
    if (this.object.elements.length) {
      // this.customiseItem.setAttribute("ExcludeAllElements", "No");
    }
    if (this.object.attributes.length) {
      // this.customiseItem.setAttribute("ExcludeAllAttributes", "No");
    }
    if (this.object.includeAllAttributes) {
      // this.customiseItem.setAttribute("IncludeAllAttributes", "Yes");
    } else if (!this.object.attributes.length && this.object.elements.length) {
      this.customiseItem.setAttribute("ExcludeAllAttributes", "Yes");
    }
    if (this.object.includeAllElements) {
      // this.customiseItem.setAttribute("IncludeAllElements", "Yes");
    } else if (!this.object.elements.length && this.object.attributes.length) {
      this.customiseItem.setAttribute("ExcludeAllElements", "Yes");
    }
    if (
      !this.object.elements.length &&
      this.object.includeAllElements &&
      !this.object.attributes.length &&
      this.object.includeAllAttributes
    ) {
      return;
    }
    if (
      !this.object.elements.length &&
      !this.object.includeAllElements &&
      !this.object.attributes.length &&
      !this.object.includeAllAttributes &&
      !this.object.heading &&
      !this.object.documentation &&
      !this.object.excerpt
    ) {
      return this.exclude();
    }
  }

  // Remove a customsed element, while switching from 
  // customisation by inclusion to customisation by exclusion 
  removeElementsAndAttributes() {
    const customisedEle = this.getCustomisedItem()?.parentElement;
    if (!customisedEle) return;
    const customHeading = customisedEle.getAttribute("customHeading");
    const result = Array.prototype.find.call(
      customisedEle.children,
      (child: Element) => {
        return ["CustomDocumentation", "CustomExcerpt"].includes(
          child.localName
        );
      }
    );
    if (!result && !customHeading) {
      customisedEle.parentElement?.removeChild(customisedEle);
      return;
    }
    Array.prototype.forEach.call(customisedEle.children, (child: Element) => {
      switch (child.localName) {
        case "Element":
          customisedEle.removeChild(child);
          break;
        case "Attribute":
          customisedEle.removeChild(child);
          break;

        default:
          break;
      }
    });
  }
  customisedObject() {
    const customisedEle = this.getCustomisedItem()?.parentElement;
    if (!customisedEle) return this.object;
    this.object.excludeAllAttributes =
      customisedEle.getAttribute("ExcludeAllAttributes") === "Yes";
    this.object.excludeAllElements =
      customisedEle.getAttribute("ExcludeAllElements") === "Yes";
    this.fixedList = !!customisedEle.getAttribute("Include");
    const heading = customisedEle.getAttribute("customHeading");
    this.object.heading = heading ? heading : undefined;
    // this.object.includeAllAttributes = !this.object.excludeAllAttributes;
    // this.object.includeAllElements = !this.object.excludeAllElements;

    Array.prototype.forEach.call(customisedEle.children, (child: Element) => {
      switch (child.localName) {
        case "CustomMaxOccurs":
          const newMax = child.textContent;
          this.object.newMax = newMax ? parseInt(newMax) : "";
          break;
        case "CustomMinOccurs":
          const newMin = child.textContent;
          this.object.newMin = newMin ? parseInt(newMin) : "";
          break;
        case "Attribute":
          const attribute = child.textContent;
          if (!attribute) break;
          this.object.attributes?.push(attribute);
          break;
        case "Element":
          const element = child.textContent;
          if (!element) break;
          this.object.elements?.push(element);
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
  static parentCustomised = (
    path: string,
    customisation: Element,
    type: string
  ): { included: boolean; path: string } | undefined => {
    const parentStatus = {} as { included: boolean; path: string };

    const pathList = path.split(".");
    const pathLeaf = pathList.pop();
    const customiser = new ElementCustomiser(customisation, pathList.join("."));
    const customisedItem = customiser.getTouchedItem()?.parentElement;
    customiser.customisedObject();
    if (customisedItem) {
      if (customisedItem.getAttribute("Exclude")) {
        parentStatus.included = false;
        parentStatus.path = pathList.join(".");
        return parentStatus;
      }
      if (!customisedItem.getAttribute("Include")) {
        parentStatus.included = true;
        parentStatus.path = pathList.join(".");
        return parentStatus;
      }
      if (type === "element") {
        if (customisedItem.getAttribute("ExcludeAllElements")) {
          parentStatus.included = false;
          parentStatus.path = pathList.join(".");
          return parentStatus;
        } else {
          if (pathLeaf && customiser.object.elements.includes(pathLeaf)) {
            parentStatus.included = true;
            parentStatus.path = pathList.join(".");
            return parentStatus;
          } else {
            parentStatus.included = false;
            parentStatus.path = pathList.join(".");
            return parentStatus;
          }
        }
      } else if (type === "attribute") {
        if (customisedItem.getAttribute("ExcludeAllAttributes")) {
          parentStatus.included = false;
          parentStatus.path = pathList.join(".");
          return parentStatus;
        } else {
          if (pathLeaf && customiser.object.attributes.includes(pathLeaf)) {
            parentStatus.included = true;
            parentStatus.path = pathList.join(".");
            return parentStatus;
          } else {
            parentStatus.included = false;
            parentStatus.path = pathList.join(".");
            return parentStatus;
          }
        }
      }
      pathList.pop();
    }
    while (pathList.length) {
      const pathLeaf = pathList.pop();
      const customiser = new ElementCustomiser(
        customisation,
        pathList.join(".")
      );
      const customisedItem = customiser.getTouchedItem()?.parentElement;
      customiser.customisedObject();
      if (customisedItem) {
        if (customisedItem.getAttribute("Exclude")) {
          parentStatus.included = false;
          parentStatus.path = pathList.join(".");
          return parentStatus;
        }

        if (!customisedItem.getAttribute("Include")) {
          parentStatus.included = true;
          parentStatus.path = pathList.join(".");
          return parentStatus;
        }
        if (customisedItem.getAttribute("ExcludeAllElements")) {
          parentStatus.included = false;
          parentStatus.path = pathList.join(".");
          return parentStatus;
        } else if (pathLeaf && customiser.object.elements.includes(pathLeaf)) {
          parentStatus.included = true;
          parentStatus.path = pathList.join(".");
          return parentStatus;
        }
      }
    }
    return;
  };
}

