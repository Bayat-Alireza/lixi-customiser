import { Customiser } from "./Customiser";
import { CustomisedElementType } from "./customisationTypes";

export class ElementCustomiser extends Customiser {
  object = {} as CustomisedElementType;
  constructor(
    customisation: Element | undefined = undefined,
    path?: string,
    values?: CustomisedElementType
  ) {
    super(customisation, path);
    this.object = values || {
      includeAllElements: true,
      includeAllAttributes: true,
      elements: [],
      attributes: [],
      excerpt: "",
      documentation: "",
      newMin: "",
      newMax: "",
    };
  }

  customise() {
    const { includeAllAttributes, includeAllElements } = this.object;
    if (includeAllAttributes && includeAllElements) return;
    const { documentation, excerpt } = this.object;
    this.excerpt = excerpt ? excerpt : "";
    this.documentation = documentation ? documentation : "";
    this.removeCustomisedItem();
    this.itemPath();
    this.setInLineAttributes();
    this.customMinOccurs();
    this.customMaxOccurs();
    this.customElements();
    this.customAttributes();
    this.customExcerpt();
    this.customDocumentation();
    this.customisation.append(this.customiseItem);
  }

  customMinOccurs() {
    if (this.object.newMin) {
      this.customiseItem.setAttribute("customMinOccurs", "yes");
      const doc = Customiser.docStub();
      const customMinOccurs = doc.createElement("CustomMinOccurs");
      customMinOccurs.textContent = this.object.newMin.toString();
      this.customiseItem.append(customMinOccurs);
    }
  }
  customMaxOccurs() {
    if (this.object.newMax) {
      this.customiseItem.setAttribute("customMaxOccurs", "yes");
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
    if (this.object.elements.length || this.object.attributes.length) {
      this.customiseItem.setAttribute("include", "yes");
    }
    if (this.object.elements.length) {
      this.customiseItem.setAttribute("excludeAllElements", "no");
    }
    if (this.object.attributes.length) {
      this.customiseItem.setAttribute("excludeAllAttributes", "no");
    }
    if (this.object.includeAllAttributes) {
      this.customiseItem.setAttribute("includeAllAttributes", "yes");
    } else if (!this.object.attributes.length) {
      this.customiseItem.setAttribute("excludeAllAttributes", "yes");
    }
    if (this.object.includeAllElements) {
      this.customiseItem.setAttribute("includeAllElements", "yes");
    } else if (!this.object.elements.length) {
      this.customiseItem.setAttribute("excludeAllElements", "yes");
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
      !this.object.includeAllAttributes
    ) {
      return this.exclude();
    }
  }

  customisedObject() {
    const customisedEle = this.getCustomisedItem()?.parentElement;
    if (!customisedEle) return this.object;
    console.log(customisedEle?.children);
    this.object.includeAllAttributes =
      customisedEle.getAttribute("includeAllAttributes") === "yes"
        ? true
        : false;
    this.object.includeAllElements =
      customisedEle.getAttribute("includeAllElements") === "yes" ? true : false;
    Array.prototype.forEach.call(customisedEle.children, (child: Element) => {
      switch (child.localName) {
        case "CustomMinOccurs":
          const newMin = child.textContent;
          this.object.newMin = newMin ? parseInt(newMin) : "";
          break;
        case "CustomMaxOccurs":
          const newMax = child.textContent;
          this.object.newMax = newMax ? parseInt(newMax) : "";
          break;
        case "Element":
          const element = child.textContent;
          if (!element) break;
          this.object.elements?.push(element);
          break;
        case "Attribute":
          const attribute = child.textContent;
          if (!attribute) break;
          this.object.attributes?.push(attribute);
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
  ): string | undefined => {
    console.log("type", type);
    const pathList = path.split(".");
    const pathLeaf = pathList.pop();
    const customiser = new ElementCustomiser(customisation, pathList.join("."));
    const customisedItem = customiser.getTouchedItem()?.parentElement;
    if (customisedItem) {
      if (customisedItem.getAttribute("exclude")) return pathList.join(".");
      if (type === "element") {
        console.log("insideElement");
        if (customisedItem.getAttribute("includeAllElements") === "yes") {
          return;
        } else if (pathLeaf && customiser.object.elements.includes(pathLeaf)) {
          return;
        } else {
          return pathList.join(".");
        }
      } else if (type === "attribute") {
        console.log(
          "insideAttribute",
          customisedItem.getAttribute("includeAllAttributes")
        );

        if (customisedItem.getAttribute("includeAllAttributes") === "yes") {
          return;
        } else if (
          pathLeaf &&
          customiser.object.attributes.includes(pathLeaf)
        ) {
          return;
        } else {
          return pathList.join(".");
        }
      } else {
        pathList.pop();
      }
    }
    while (pathList.length) {
      console.log(pathList);
      const pathLeaf = pathList.pop();
      const customiser = new ElementCustomiser(
        customisation,
        pathList.join(".")
      );
      const customisedItem = customiser.getTouchedItem()?.parentElement;
      if (customisedItem) {
        if (customisedItem.getAttribute("exclude")) return pathList.join(".");
        if (customisedItem.getAttribute("includeAllElements") === "yes") {
          return;
        } else if (pathLeaf && customiser.object.elements.includes(pathLeaf)) {
          return;
        } else {
          return pathList.join(".");
        }
      }
    }

    return;
  };
}
