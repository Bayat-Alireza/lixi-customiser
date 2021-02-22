import * as React from "react";
import { useStyles } from "./uploadFileStyle";
import { Button, IconButton, Tooltip, Typography } from "@material-ui/core";
import DescriptionTwoToneIcon from "@material-ui/icons/DescriptionTwoTone";
import MemoryTwoToneIcon from "@material-ui/icons/MemoryTwoTone";

interface FormProps {
  description: string;
  saveFace: any; //(fileName:Blob) => Promise<void>, // callback taking a string and then dispatching a store actions
}

export const UploadFile: React.FC<FormProps> = ({ saveFace, description }) => {
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
      <Tooltip title="Click to select LIXI Base Schema">
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
          <Typography 
          style={{backgroundColor:"#c5cae9",padding:"0.5rem" ,borderRadius:"0.1rem"}} 
          variant="caption" 
          className={classes.fileName} 
          noWrap>
            {metadata ? metadata.name : description}
          </Typography>
        </label>
      </Tooltip>
      <Button
        style={{ marginLeft: "0.5rem" }}
        startIcon={<MemoryTwoToneIcon />}
        variant="outlined"
        size="medium"
        onClick={() => handleSubmit()}
        color="primary"
      >
        Upload
      </Button>
    </>
  );
};
