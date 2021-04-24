export class Customiser {
  customisation: Element;
  path: string | undefined = undefined;
  customiseItem: Element;
  excerpt: string = "";
  documentation: string = "";
  constructor(customisation: Element | undefined = undefined, path?: string) {
    this.customiseItem = this._customiseItemStub();
    if (path) {
      this.path = path;
    }
    if (customisation) {
      this.customisation = customisation.cloneNode(true) as Element;
      
    } else {
      this.customisation = this._customisationStub();
    }
  }

  itemPath() {
    if (this.path) {
      const doc = Customiser.docStub();
      const path = doc.createElement("Path");
      path.textContent = this.path;
      this.customiseItem.append(path);
    }
  }

  exclude() {
    if (this.ExcludedItem() || !this.path) return;
    this.removeCustomisedItem();
    const doc = Customiser.docStub();
    this.customiseItem.setAttribute("Exclude", "Yes");
    const path = doc.createElement("Path");
    path.textContent = this.path;
    this.customiseItem.append(path);
    this.customisation.append(this.customiseItem);
    return this.customiseItem;
  }
  include() {
    const excludedPath: Element = this.ExcludedItem();
    if (excludedPath && excludedPath.parentElement) {
      this.customisation.removeChild(excludedPath.parentElement);
    }
  }

  ExcludedItem(): Element {
    const allPath = Array.from(this.customisation?.getElementsByTagName("Path"));
    const excludedPath: Element = Array.prototype.find.call(
      allPath,
      (p: Element) => {
        if (p.parentElement?.getAttribute("Exclude") === "Yes") {
          return p.textContent === this.path;
        }
      }
    );
    return excludedPath;
  }

  _customiseItemStub(): Element {
    const doc = Customiser.docStub();
    return doc.createElement("CustomiseItem");
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

  getCustomisedItem() {
    const allPath = Array.from(this.customisation.getElementsByTagName("Path"));
    const excludedPath: Element = Array.prototype.find.call(
      allPath,
      (p: Element) => {
        if (!p.parentElement?.getAttribute("Exclude")) {
          return p.textContent === this.path;
        }
      }
    );
    return excludedPath;
  }

  getTouchedItem() {
    const allPath = Array.from(this.customisation.getElementsByTagName("Path"));
    const excludedPath: Element = Array.prototype.find.call(
      allPath,
      (p: Element) => {
        return p.textContent === this.path;
      }
    );
    return excludedPath;
  }
  removeCustomisedItem() {
    const existingCustomisedItem = this.getCustomisedItem()?.parentElement;
    if (existingCustomisedItem) {
      this.customisation.removeChild(existingCustomisedItem);
    }
  }

  static docStub(): Document {
    const parser = new DOMParser();
    return parser.parseFromString("<root></root>", "text/xml");
  }

  customExcerpt() {
    if (!this.excerpt) return;
    const doc = Customiser.docStub();
    const customExcerpt = doc.createElement("CustomExcerpt");
    customExcerpt.textContent = this.excerpt.trim();
    this.customiseItem.append(customExcerpt);
  }
  customDocumentation() {
    if (!this.documentation) return;
    const doc = Customiser.docStub();
    const customDocumentation: Element = doc.createElement(
      "CustomDocumentation"
    );
    customDocumentation.textContent = this.documentation.trim();
    this.customiseItem.append(customDocumentation);
  }

  affectedDecedents() {
    if (!this?.path) return;
    const path = this.path;
    const allPath = Array.from(this.customisation?.getElementsByTagName("Path"));
    const affectedItems: Element[] = Array.prototype.filter.call(
      allPath,
      (p: Element) => {
        return p.textContent?.startsWith(path || "");
      }
    );

    return affectedItems;
  }
  removeCustomisation(paths: string[]){
    console.log("paths:", paths);
    const allCustomisedPaths = Array.from(this.customisation.getElementsByTagName("Path"));


    Array.prototype.forEach.call(allCustomisedPaths, (p: Element) => {
      console.log("path:",  p.textContent);;
      if (p) {
        if (p?.textContent && paths.includes(p?.textContent)) {
          if (p.parentElement) {
            this.customisation.removeChild(p?.parentElement);
          }
        }
      }
    });
  }
}
