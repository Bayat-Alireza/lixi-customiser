import { Customiser } from "./Customiser";
import { tokenType } from "./customisationTypes";

export class TokenTypeCustomiser extends Customiser {
  object = {} as tokenType;

  constructor(
    customisation: Element | undefined = undefined,
    path?: string,
    values?: tokenType
  ) {
    super(customisation, path);
    this.object = values || {
      tokens: [],
    };
  }

  customise() {
    const { tokens, documentation, excerpt, heading } = this.object;
    if (!tokens.length && !documentation && !excerpt && !heading) {
      this.removeCustomisedItem();
      return;
    }
    this.excerpt = excerpt ? excerpt : "";
    this.documentation = documentation ? documentation : "";
    this.removeCustomisedItem();
    this.itemPath();
    this.setInLineAttributes();
    this.tokens();
    this.customExcerpt();
    this.customDocumentation();

    this.customisation.append(this.customiseItem);
  }

  setInLineAttributes() {
    const { tokens, heading } = this.object;
    if (heading) {
      this.customiseItem.setAttribute("customHeading", heading);
    }
    if (tokens.length) {
      this.customiseItem.setAttribute("Include", "Yes");
    }
  }

  tokens() {
    if (!this.object.tokens.length) return;
    this.object.tokens.forEach((token: string, idx) => {
      const doc = Customiser.docStub();
      const tokenEle = doc.createElement("Enumeration");
      tokenEle.textContent = token;
      this.customiseItem.append(tokenEle);
    });
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
        case "Enumeration":
          const token = child.textContent?.trim();
          if (token) {
            this.object.tokens.push(token);
          }
          break;
        default:
          break;
      }
    });
    return this.object;
  }
}
