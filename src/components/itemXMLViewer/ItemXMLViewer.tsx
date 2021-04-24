import { Button, Typography } from "@material-ui/core";
import prettifyXml from "prettify-xml";
import React, { Fragment } from "react";
import XMLViewer from "react-xml-viewer";
import { customThemeVsCode, options } from "./itemXMLViewerSettings";
import DownloadLink from "react-download-link";
import GetAppIcon from "@material-ui/icons/GetApp";
import { useStyles } from "./itemXMLViewerStyle";

interface IItemXMLViewer {
  itemXML: Element | null | undefined;
  role?: "download" | "view";
}

export const ItemXMLViewer: React.FC<IItemXMLViewer> = ({ itemXML, role }) => {
  const classes = useStyles();
  const serializer = new XMLSerializer();
  if (itemXML) {
    const xmlString = serializer.serializeToString(itemXML);
    return (
      <div className={classes.container}>
        <div className={classes.header}>
          <Typography variant="h5">
            {(!role || role ===   "download")?"Customisation Instructions":"Item Instruction"}
          </Typography>
          {(!role || role ===   "download") && (
          (
          (
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<GetAppIcon />}
                >
                  <div>
                    <DownloadLink
                      label="Download"
                      filename="customisation.xml"
                      exportFile={() => Promise.resolve(xmlString)}
                      style={{ color: "pink", textDecoration: "none" }}
                    />
                  </div>
                </Button>
          )
          )
          )}
        </div>

        <div style={{ margin: "1rem" }}>
          <XMLViewer
            xml={prettifyXml(xmlString, options)}
            theme={customThemeVsCode}
          />
        </div>
      </div>
    );
  } else {
    return <Fragment></Fragment>;
  }
};
