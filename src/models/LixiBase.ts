import { LixiLocalNameEnum, LixiTagEnum } from "../enums/lixiEnums";
interface ILixiBase {
  element: Element;
  annotated: boolean;
}
export class LixiBase implements ILixiBase {
  readonly element: Element;
  readonly annotated: boolean;
  constructor(element: Element) {
    this.element = element.cloneNode(true) as Element;
    this.annotated =
      this.element.children[0].localName === LixiLocalNameEnum.annotation;
  }

  get transactions() {
    if (this.annotated) {
      const annotation = this.element.children[0];
      const transactions = annotation?.getElementsByTagName(
        LixiTagEnum.transactions
      );
      if (transactions.length) {
        return transactions[0].textContent?.split(",");
      }
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
    return referenceTargets;
  }

  get baseRestriction() {
    if (this.element.localName === "simpleType") {
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
    const complex: Element[] = [];
    Array.from(this.element.children).forEach((child) => {
      if (child.localName === LixiLocalNameEnum.complexType) {
        complex.push(child);
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

  get enumeration() {
    if (this.element.localName === "simpleType") {
      const restriction = this.element.children[1];
      if (restriction.getAttribute("base") === "xs:token") {
        return [...Array.from(restriction.children)];
      }
    }
    return undefined;
  }
}
