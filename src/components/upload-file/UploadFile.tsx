import * as React from "react";
import { useStyles } from "./uploadFileStyle";
import { IconButton, Tooltip, Typography } from "@material-ui/core";
import PublishTwoToneIcon from '@material-ui/icons/PublishTwoTone';
import FindInPageTwoToneIcon from '@material-ui/icons/FindInPageTwoTone';
import Grid from "@material-ui/core/Grid";
interface FormProps {
  description: string;
  saveFace: any; //(fileName:Blob) => Promise<void>, // callback taking a string and then dispatching a store actions
}

export const UploadFile: React.FC<FormProps> = ({ saveFace, description }) => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = React.useState<File>();
  const handleCapture = ({ target }: any) => {
    setSelectedFile(target.files[0]);
  };

  const handleSubmit = () => {
    saveFace(selectedFile);
  };

  return (
    <div style={{width:"100%"}}>
      <input
        accept=".xml,.xsd"
        className={classes.input}
        id="document"
        type="file"
        onChange={handleCapture}
      />
      <Grid wrap="nowrap" alignContent="flex-start" container spacing={1} alignItems="center">
        <Grid item >
          <Tooltip title="">
            <label
              className={classes.label}
              htmlFor="document"
            >
              <IconButton
                className={classes.findPageIcon}
                color="primary"
                aria-label="upload picture"
                component="span"
                title="Browse"
              >
                <FindInPageTwoToneIcon fontSize="large" />
              </IconButton>
              <Typography
                variant="body2"
                className={classes.fileName}
                noWrap
              >
                Choose the file
              </Typography>
            </label>
          </Tooltip>
        </Grid>
        <Grid item  >
        {selectedFile?.name?<IconButton
          className={classes.loadIcon}
          onClick={() => handleSubmit()}
          color="primary"
          aria-label="upload file"
          component="span"
          title="Load"
          >
            <PublishTwoToneIcon fontSize="large" />
          </IconButton>:undefined}
        </Grid>
      </Grid>
       
    </div>
  );
};
