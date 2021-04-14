import React from "react";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
// import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useAction } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypeSelector";
import { UploadFile } from "../../upload-file/UploadFile";
import { useStyles } from "./uploadCustomisationInstructionStyle";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid/Grid";
// import ButtonGroup from "@material-ui/core/ButtonGroup";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import Collapse from "@material-ui/core/Collapse";

interface IUploadCustomisationInstruction {
  handelBack: () => void;
  handelSkip: () => void;
  handelNext: () => void;
  activeStep: number;
}

export const UploadCustomisationInstruction: React.FC<IUploadCustomisationInstruction> = ({
  handelBack,
  handelSkip,
  handelNext,
  activeStep,
}) => {
  const classes = useStyles();
  const { uploadExistingCustomization } = useAction();
  const { metaData } = useTypedSelector((state) => state.customizer);

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
          If you already have an existing customisation instruction file you can
          upload it here, otherwise a new customisation instruction file will be
          created.
        </Typography>
      </Box>
      <Paper className={classes.uploadContainer}>
        
          <Grid container alignItems="center">
            <Grid item xs={12} sm={12}>
              <UploadFile
                saveFace={(file: File) => uploadExistingCustomization(file)}
                description={"Click to upload an existing customisation file"}
              />
            </Grid>
            <Grid item xs={12}>
            <Collapse in={!!metaData}>
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
                </Collapse>
          </Grid>
            <Grid item>
                  <div className={classes.actionsContainer}>
                    <Button
                      startIcon={<ArrowBackIosIcon />}
                      size="small"
                      disabled={activeStep === 0}
                      onClick={handelBack}
                      className={classes.button}
                      variant="contained"
                      color="primary"
                    >
                      Back
                    </Button>
                  </div>
                </Grid>
          </Grid>
        
      </Paper>
    </>
  );
};
