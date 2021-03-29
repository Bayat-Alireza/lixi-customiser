import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography/Typography";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Box from "@material-ui/core/Box";
// import { SubSchemaMenu } from "../../sub-schema-menu/SubSchemaMenu";
import { UploadFile } from "../../upload-file/UploadFile";
import { useAction } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypeSelector";

import { useStyles } from "./uploadSchemaStepStyle";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import Collapse from "@material-ui/core/Collapse";

interface IUploadSchemaStep {
  handelNextClicked: () => void;
}

export const UploadSchemaStep: React.FC<IUploadSchemaStep> = ({
  handelNextClicked,
}) => {
  const classes = useStyles();
  const { uploadBaseSchema } = useAction();
  const { schema,metaData } = useTypedSelector((state) => state.schema);

  const fileSize = React.useMemo(()=>{
    if (!metaData?.size) return
    if (metaData?.size === 0) return '0 Bytes';

    const k = 1024;
    
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(metaData?.size) / Math.log(k));

    return parseFloat((metaData?.size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },[metaData?.size])

  return (
    <>
      <Box maxWidth="75ch">
        <Typography>
          LIXI base schema must be uploaded.
        </Typography>
      </Box>
      <Paper className={classes.uploadContainer}>
       
          <Grid container alignItems="center">
            <Grid item xs={12} sm={12}>
              <UploadFile
                saveFace={(file: File) => uploadBaseSchema(file)}
                description={"Click to upload LIXI Base/Transaction Schema"}
              />
            </Grid>
            
          <Collapse in={!!metaData}>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
              <Table  aria-label="file table" size="small">
                <caption>File Details</caption>
                  <TableHead className={classes.fileDetailHeaderRow}>
                    <TableRow  >
                      <TableCell className={classes.fileDetailHeaderCell} variant="head" align="left" >Name</TableCell>
                      <TableCell className={classes.fileDetailHeaderCell} align="left">Last Modified</TableCell>
                      <TableCell className={classes.fileDetailHeaderCell} align="center">Size</TableCell>
                      <TableCell className={classes.fileDetailHeaderCell} align="center">Type</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow >
                      <TableCell scope="row" align="left">{metaData?.name}</TableCell>
                      <TableCell scope="row" align="left">{metaData?.lastModified?new Date(metaData?.lastModified).toString():undefined}</TableCell>
                      <TableCell scope="row" align="center">{fileSize}</TableCell>
                      <TableCell scope="row" align="center">{metaData?.type}</TableCell>
                    </TableRow>
                  </TableBody>
              </Table>
            </TableContainer>
            </Grid>
            <Grid item xs={12} sm={2}>
                <div className={classes.actionsContainer}>
                  <Button
                    size="small"
                    endIcon={<ArrowForwardIosIcon />}
                    variant="contained"
                    color="primary"
                    onClick={handelNextClicked}
                    disabled={schema ? false : true}
                    className={classes.nextButton}
                  >
                    Next
                  </Button>
                </div>
              </Grid>
          </Collapse>
            </Grid>
        
      </Paper>
    </>
  );
};
