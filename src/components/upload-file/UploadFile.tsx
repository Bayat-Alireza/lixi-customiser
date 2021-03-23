import * as React from "react";
import { useStyles } from "./uploadFileStyle";
import { Button, IconButton, Tooltip, Typography } from "@material-ui/core";
import DescriptionTwoToneIcon from "@material-ui/icons/DescriptionTwoTone";
import MemoryTwoToneIcon from "@material-ui/icons/MemoryTwoTone";
import Grid from "@material-ui/core/Grid";

interface FormProps {
  description: string;
  saveFace: any; //(fileName:Blob) => Promise<void>, // callback taking a string and then dispatching a store actions
}

export const UploadFile: React.FC<FormProps> = ({ saveFace, description }) => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = React.useState<any>(undefined);
  const [metadata, setMetadata] = React.useState<{ [key: string]: string }>();
  const handleCapture = ({ target }: any) => {
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
        id="document"
        type="file"
        onChange={handleCapture}
      />
      <Grid container spacing={1} alignItems="center">
        <Grid item>
          <Tooltip title="Click to select LIXI Base Schema">
            <label
              style={{ display: "flex", alignItems: "center" }}
              htmlFor="document"
            >
              <IconButton
                className={classes.documentImage}
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <DescriptionTwoToneIcon fontSize="large" />
              </IconButton>
              <Typography
                style={{
                  backgroundColor: "#c5cae9",
                  padding: "0.3rem",
                  borderRadius: "0.2rem",
                }}
                variant="caption"
                className={classes.fileName}
                noWrap
              >
                {metadata ? metadata.name : description}
              </Typography>
            </label>
          </Tooltip>
        </Grid>
        <Grid item>
          <Button
            style={{ marginLeft: "0.5rem",    minWidth:"6rem" }}
            startIcon={<MemoryTwoToneIcon />}
            variant="outlined"
            size="small"
            onClick={() => handleSubmit()}
            color="primary"
          >
            Upload
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
