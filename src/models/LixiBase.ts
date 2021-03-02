import { LixiLocalNameEnum, LixiTagEnum } from "../enums/lixiEnums";
interface ILixiBase {
  element: Element;
  annotated: boolean;
}
export class LixiBase implements ILixiBase {
  readonly element: Element;
  readonly annotated: boolean;
  constructor(element: Element) {
    this.element = element;
    this.annotated =
      this.element.children[0].localName === LixiLocalNameEnum.annotation;
  }

  get transactions() {
    if (this.annotated) {
      return this.element.children[0]
        .getElementsByTagName(LixiTagEnum.transactions)[0]
        .textContent?.split(",");
    }
    return [];
  }

  get path() {
    if (this.annotated) {
      return this.element.children[0].getElementsByTagName(LixiTagEnum.path)[0]
        .textContent;
    }
    return undefined;
  }

  get label() {
    if (this.annotated) {
      return this.element.children[0].getElementsByTagName(LixiTagEnum.label)[0]
        .textContent;
    }
    return undefined;
  }
  get documentation() {
    if (this.annotated) {
      return this.element.children[0].getElementsByTagName(
        LixiTagEnum.documentation
      )[0].textContent;
    }
    return undefined;
  }

  rootDocument() {
    return this.element.ownerDocument;
  }

  get references() {
    const referenceTargets: string[] = [];
    if (
      !this.annotated ||
      this.element.localName !== "attribute" ||
      this.element.getAttribute("type") !== "referenceType"
    ) {
      return undefined;
    }
    const targets = this.element.children[0].getElementsByTagName(
      LixiTagEnum.target
    );
    Array.prototype.map.call(targets, (t) => {
      referenceTargets.push(t.textContent);
    });
    console.log("ref", referenceTargets);
    return referenceTargets;
  }

  get baseRestriction() {
    if (!this.annotated || this.element.localName !== "attribute") {
      const restriction = this.element.children[1];
      return restriction.getAttribute("base");
    }
    return undefined;
  }

  get attributes() {
    const attributes: Array<Element> = [];
    const complexType = this.getLixiComplexType();
    if (complexType) {
      Array.from(complexType.children).forEach((child) => {
        if (child.localName === LixiLocalNameEnum.attribute) {
          attributes.push(child);
        }
      });
    }

    return attributes;
  }

  getLixiComplexType() {
    // console.log("comp");
    const complex: Element[] = [];
    Array.from(this.element.children).forEach((child) => {
      if (child.localName === LixiLocalNameEnum.complexType) {
        complex.push(child);
        // return;
      }
    });
    return complex[0];
  }

  get lixiSubElements() {
    const complexType = this.getLixiComplexType();
    const subElements: { [key: string]: Element[] } = {};
    const firstChild = complexType?.firstElementChild;

    if (firstChild?.localName === LixiLocalNameEnum.sequence) {
      subElements[LixiLocalNameEnum.sequence] = [
        ...Array.from(firstChild.children),
      ];
    } else if (firstChild?.localName === LixiLocalNameEnum.choice) {
      subElements[LixiLocalNameEnum.choice] = [
        ...Array.from(firstChild.children),
      ];
    }
    if (Object.keys(subElements).length > 0) {
      return subElements;
    }
    return subElements;
  }
}
