import * as React from "react";
import { useStyles } from "./uploadFileStyle";
import { Button, IconButton, Tooltip, Typography } from "@material-ui/core";
import DescriptionTwoToneIcon from "@material-ui/icons/DescriptionTwoTone";
import MemoryTwoToneIcon from "@material-ui/icons/MemoryTwoTone";

interface FormProps {
  saveFace: any; //(fileName:Blob) => Promise<void>, // callback taking a string and then dispatching a store actions
}

export const UploadFile: React.FC<FormProps> = ({ saveFace }) => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = React.useState<any>(undefined);
  const [metadata, setMetadata] = React.useState<{ [key: string]: string }>();

  const handleCapture = ({ target }: any) => {
    // console.log("jwiegfj", target.files[0].name);
    setSelectedFile(target.files[0]);
  };

  const handleSubmit = () => {
    saveFace(selectedFile);
  };

  React.useEffect(() => {
    if (selectedFile) {
      const meta: { [key: string]: string } = {};
      if (!selectedFile) return;
      for (const att in selectedFile) {
        meta[att] = selectedFile[att];
      }

      setMetadata(meta);
    }
  }, [selectedFile]);

  return (
    <>
      <input
        accept=".xml,.xsd"
        className={classes.input}
        id="faceImage"
        type="file"
        onChange={handleCapture}
      />
      <Tooltip title="Click to s elect LIXI Base Schema">
        <label
          style={{ display: "flex", alignItems: "center" }}
          htmlFor="faceImage"
        >
          <IconButton
            className={classes.faceImage}
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <DescriptionTwoToneIcon fontSize="large" />
          </IconButton>
          <Typography className={classes.fileName} noWrap>
            {metadata ? metadata.name : "LIXI Base Schema"}
          </Typography>
        </label>
      </Tooltip>
      {/* <label>{metadata ? metadata.name : "Select LIXI MainSchema.xsd"}</label> */}
      {/* <label>{"Select Image"}</label> */}
      <Button
        style={{ marginLeft: "0.5rem", height: "2rem" }}
        startIcon={<MemoryTwoToneIcon />}
        variant="outlined"
        size="small"
        onClick={() => handleSubmit()}
        color="primary"
      >
        Upload
      </Button>
    </>
  );
};
