import { CustomisedElementType } from "./customisationTypes";

export class Customiser {
  customisation: Element;
  path:string|undefined=undefined
  constructor(Customisation: Element | undefined = undefined,  path?:  string) {
    if (path){
      this.path = path
    }
    if (Customisation) {
      this.customisation = Customisation;
    } else {
      this.customisation = this._customisationStub();
    }
  }

  exclude() {
    if (this.ExcludedItem())return
    this.removeCustomisedItem()
    const parser = new DOMParser();
    const xDoc = parser.parseFromString("<root></root>", "text/xml");
    const customiseItem = xDoc.createElement("CustomiseItem");
    customiseItem.setAttribute("exclude", "yes");
    const path = xDoc.createElement("Path");
    path.textContent = this.path || "";
    customiseItem.append(path);
    this.customisation.append(customiseItem);
    return customiseItem;
  }
  include() {
  
    const excludedPath: Element = this.ExcludedItem();
    if (excludedPath && excludedPath.parentElement) {
      this.customisation.removeChild(excludedPath.parentElement);
    }
    // console.log(excludedPath);
  }

  ExcludedItem(): Element {
    const allPath = this.customisation.getElementsByTagName("Path");
    const excludedPath: Element = Array.prototype.find.call(
      allPath,
      (p: Element) => {
        if (p.parentElement?.getAttribute("exclude") ==="yes"){
          console.log("excluded",p.parentElement?.getAttribute("exclude"))
          return p.textContent === this.path
        } 
      }
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

  customiseElement(customisedElement: CustomisedElementType): Element|undefined {
    const {
      includeAllElements,
      includeAllAttributes,
      Elements,
      Attributes,
      excerpt,
      documentation,
      newMin,
      newMax,
    } = customisedElement;
    this.include()
    this.removeCustomisedItem()
    const parser = new DOMParser();
    const xDoc = parser.parseFromString("<root></root>", "text/xml");
    const customiseItem = xDoc.createElement("CustomiseItem");
    const path = xDoc.createElement("Path");
    path.innerHTML = this.path || "";
    customiseItem.append(path);

    if (!Elements.length && includeAllElements && !Attributes.length && includeAllAttributes){
      return
    }
    if (!Elements.length && !includeAllElements && !Attributes.length && !includeAllAttributes){
      console.log("exclude")
      // this.removeCustomisedItem()
      return this.exclude()
    }

    if (Attributes.length || Elements.length) {
      customiseItem.setAttribute("include", "yes");
    }

    if (newMin) {
      customiseItem.setAttribute("customMinOccurs", "yes");
      const customMinOccurs = xDoc.createElement("CustomMinOccurs");
      customMinOccurs.textContent = newMin.toString();
      customiseItem.append(customMinOccurs);
    }
    if (newMax) {
      customiseItem.setAttribute("customMaxOccurs", "yes");
      const customMaxOccurs = xDoc.createElement("CustomMaxOccurs");
      customMaxOccurs.textContent = newMax.toString();
      customiseItem.append(customMaxOccurs);
    }

    if (!includeAllElements && Elements.length) {
      customiseItem.setAttribute("excludeAllElement", "no");
      Elements.forEach((ele, idx) => {
        const newElement = xDoc.createElement("Element");
        newElement.textContent = ele;
        customiseItem.append(newElement);
      });
    }else if(!includeAllElements){
      customiseItem.setAttribute("excludeAllElement", "yes");
    }else if(includeAllElements){
      customiseItem.setAttribute("includeAllElement", "yes");

    }
    if (!includeAllAttributes && Attributes.length) {
      console.log("att", Attributes.length);
      customiseItem.setAttribute("excludeAllAttributes", "no");
      Attributes.forEach((att, idx) => {
        const newAttribute = xDoc.createElement("Attribute");
        newAttribute.textContent = att;
        customiseItem.append(newAttribute);
      });
    }else if (!includeAllAttributes){
      customiseItem.setAttribute("excludeAllAttributes", "yes");
    }else if (includeAllAttributes){
      customiseItem.setAttribute("includeAllAttributes", "yes");

    }
    if (excerpt) {
      const customExcerpt = xDoc.createElement("CustomExcerpt");
      customExcerpt.textContent = excerpt;
      customiseItem.append(customExcerpt);
    }
    if (documentation) {
      const customDocumentation = xDoc.createElement("CustomDocumentation");
      customDocumentation.textContent = documentation;
      customiseItem.append(customDocumentation);
    }

    this.customisation.append(customiseItem);
    return customiseItem;
  }

  getCustomisedItem(){
const allPath = this.customisation.getElementsByTagName("Path");
    const excludedPath: Element = Array.prototype.find.call(
      allPath,
      (p: Element) => {
        if (!p.parentElement?.getAttribute("exclude") ||p.parentElement?.getAttribute("exclude")==="no"){

          return p.textContent === this.path
        } 
      }
    );
    return excludedPath;
  }

  private removeCustomisedItem(){
    const existingCustomisedItem = this.getCustomisedItem()?.parentElement
    if (existingCustomisedItem){
      this.customisation.removeChild(existingCustomisedItem)
    }
  }

}
