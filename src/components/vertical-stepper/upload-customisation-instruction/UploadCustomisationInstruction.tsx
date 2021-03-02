import React from "react";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useAction } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypeSelector";
import { UploadFile } from "../../upload-file/UploadFile";
import { useStyles } from "./uploadCustomisationInstructionStyle";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid/Grid";

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
  const { customization } = useTypedSelector((state) => state.customizer);
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
        <div>
          <Grid container alignItems="center">
            <Grid item xs={12} sm={12}>
              <UploadFile
                saveFace={(file: File) => uploadExistingCustomization(file)}
                description={"Click to upload an existing customisation file"}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <div className={classes.actionsContainer}>
                <Button
                  startIcon={<ArrowBackIosIcon />}
                  size="small"
                  disabled={activeStep === 0}
                  onClick={handelBack}
                  className={classes.backButton}
                  variant="contained"
                  color="primary"
                >
                  Back
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} sm={2}>
              <div className={classes.actionsContainer}>
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  onClick={handelSkip}
                  className={classes.skipButton}
                >
                  Skip
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} sm={2}>
              <div className={classes.actionsContainer}>
                <Button
                  endIcon={<ArrowForwardIosIcon />}
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={handelNext}
                  disabled={customization ? false : true}
                  className={classes.nextButton}
                >
                  Next
                </Button>
              </div>
            </Grid>
          </Grid>
        </div>
      </Paper>
    </>
  );
};
