import * as React from "react";
import { useStyles } from "./uploadFileStyle";
import { Button, IconButton, Tooltip, Typography } from "@material-ui/core";
// import DescriptionTwoToneIcon from "@material-ui/icons/DescriptionTwoTone";
// import ArrowUpwardTwoToneIcon from '@material-ui/icons/ArrowUpwardTwoTone';
// import MemoryTwoToneIcon from "@material-ui/icons/MemoryTwoTone";
import PublishTwoToneIcon from '@material-ui/icons/PublishTwoTone';
import FindInPageTwoToneIcon from '@material-ui/icons/FindInPageTwoTone';
import Grid from "@material-ui/core/Grid";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";

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
