export class Customiser {
  customisation: Element;
  constructor(Customisation: Element | undefined = undefined) {
    if (Customisation) {
      this.customisation = Customisation;
    } else {
      this.customisation = this._customisationStub();
    }
  }

  exclude(itemPath: string) {
    const parser = new DOMParser();
    const xDoc = parser.parseFromString("<root></root>", "text/xml");
    const customiseItem = xDoc.createElement("CustomiseItem");
    const path = xDoc.createElement("path");
    customiseItem.setAttribute("exclude", "yes");
    path.innerHTML = itemPath;
    customiseItem.append(path);
    this.customisation.append(customiseItem);
    return customiseItem;
  }
  include(itemPath: string) {
    const excludedPath: Element = this.ExcludedItem(itemPath);
    if (excludedPath && excludedPath.parentElement) {
      this.customisation.removeChild(excludedPath.parentElement);
    }
    // console.log(excludedPath);
  }

  ExcludedItem(itemPath: string): Element {
    const allPath = this.customisation.getElementsByTagName("path");
    const excludedPath: Element = Array.prototype.find.call(
      allPath,
      (p: Element) => p.textContent === itemPath
    );
    return excludedPath;
  }

  _customisationStub(): Element {
    const parser = new DOMParser();
    const customisationStub = `
    <Customisations 
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
        xsi:noNamespaceSchemaLocation="LIXI-Customisation-By-Restriction.xsd" 
        LIXICode="LIXI" CustomisationCode="" 
        LIXITransactionType="" 
        customHeading="Custom Heading for All Customised Items">
    </Customisations>`;
    const parsedXML = parser.parseFromString(customisationStub, "text/xml");
    return parsedXML.getElementsByTagName("Customisations")[0];
  }
}
