// import { InfoRounded } from "@material-ui/icons";
// import { read } from "fs";
// import { master_schema } from "../assets/LIXI-Master-Schema1";
import { LixiTagEnum } from "../enums/lixiEnums";
type NameSpace = {
  [ns: string]: string;
};

export const nameSpaceResolver: XPathNSResolver = (
  prefix: string | null
): string | null => {
  const ns: NameSpace = {
    xs: "http://www.w3.org/2001/XMLSchema",
    lx: "lixi.org.au/schema/appinfo_elements",
    li: "lixi.org.au/schema/appinfo_instructions",
  };
  return prefix ? ns[prefix] : null;
};

// const parser = new DOMParser();
// export const parsedXml = parser.parseFromString(master_schema, "text/xml");

// export const path = parsedXml.evaluate(
//   "//lx:path[1]/text()",
//   parsedXml,
//   nameSpaceResolver,
//   XPathResult.UNORDERED_NODE_ITERATOR_TYPE,
//   null
// );

// export const result = parsedXml.evaluate(
//   "/xs:schema/xs:element",
//   parsedXml,
//   nameSpaceResolver,
//   XPathResult.ANY_TYPE,
//   null
// );

// export const packageElement = parsedXml.evaluate(
//   "/xs:schema/xs:element[@name='Package']",
//   parsedXml,
//   nameSpaceResolver,
//   XPathResult.ANY_TYPE,
//   null
// );

export class XmlUtil {
  private parsedDoc: Document;
  constructor(parsedDoc: Document) {
    this.parsedDoc = parsedDoc;
  }

  getPathOfAllElements() {
    const elementsPath = [];
    const elements = this.parsedDoc.getElementsByTagName(LixiTagEnum.element);
    for (const e of Array.prototype.fill(elements)) {
      elementsPath.push(
        e.getElementsByTagName(LixiTagEnum.path)[0].textContent
      );
    }
    return elementsPath;
  }

  getPathOfAllItems() {
    const itemsPath: string[] = [];
    const result = this.evaluateXpath(
      "//lx:path[text()]/text()",
      this.parsedDoc
    );
    let path = result?.iterateNext();
    while (path) {
      itemsPath.push(path.textContent as string);
      path = result?.iterateNext();
    }

    return itemsPath;
  }

  getPathOfAllItemsInATransaction(subSchema: string) {
    const itemsPath: string[] = [];
    const result = this.evaluateXpath(
      "//lx:path/following-sibling::li:transactions",
      this.parsedDoc
    );
    let transaction = result?.iterateNext();
    while (transaction) {
      const transactions = transaction.textContent?.split(",");
      if (transactions && transactions.includes(subSchema)) {
        itemsPath.push(
          transaction.parentElement?.children[0].textContent as string
        );
      }
      transaction = result?.iterateNext();
    }
    console.log(itemsPath.length);
    return itemsPath;
  }

  evaluateXpath(xpath: string, contextNode: Node | Document): XPathResult {
    contextNode = !contextNode ? this.parsedDoc : contextNode;
    return this.parsedDoc.evaluate(
      xpath,
      contextNode,
      nameSpaceResolver,
      XPathResult.ANY_TYPE,
      null
    );
  }

  getItemByPath(path: string): Element | undefined | null {
    const xpathResult = this.parsedDoc.evaluate(
      `//lx:path[text()='${path}'][1]`,
      this.parsedDoc,
      nameSpaceResolver,
      XPathResult.ANY_UNORDERED_NODE_TYPE,
      null
    );
    return xpathResult.singleNodeValue?.parentElement?.parentElement
      ?.parentElement;
  }
  getSchemaDetails(): Element | undefined {
    const xpathResult = this.parsedDoc.evaluate(
      "//lx:schemadetail",
      this.parsedDoc,
      nameSpaceResolver,
      XPathResult.ANY_UNORDERED_NODE_TYPE,
      null
    );
    return xpathResult.singleNodeValue?.parentElement?.children[0];
  }

  getTransactions() {
    const xpathResult = this.parsedDoc.evaluate(
      "//lx:schemadetail",
      this.parsedDoc,
      nameSpaceResolver,
      XPathResult.ANY_UNORDERED_NODE_TYPE,
      null
    );
    const appInfo = xpathResult.singleNodeValue?.parentElement?.children;
    const transaction: {
      transactionType: string;
      transactionVersion: string;
    }[] = [];
    Array.prototype.map.call(appInfo, (i: Element) => {
      if (i.localName === "subschema") {
        transaction?.push({
          transactionType: i.getAttribute("transactiontype") as string,
          transactionVersion: i.getAttribute("version") as string,
        });
      }
    });
    return transaction;
  }
}
