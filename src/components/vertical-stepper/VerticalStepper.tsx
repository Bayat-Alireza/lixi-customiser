import React from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./verticalStepperStyle";

import { useAction } from "../../hooks/useActions";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import RotateLeftIcon from "@material-ui/icons/RotateLeft";

import { UploadSchemaStep } from "./upload-schema-step/UploadSchemaStep";
import { UploadCustomisationInstruction } from "./upload-customisation-instruction/UploadCustomisationInstruction";
import { CompleteInstructionsHeader } from "./complete-instructions-header/CompleteInstructionsHeader";
// import { Divider } from "@material-ui/core";

function getSteps() {
  return [
    "Upload LIXI Base/Transaction Schema.",
    "Upload an existing customisation file",
    "Complete Customisation Header",
  ];
}



export const VerticalLinearStepper: React.FC = () => {
  const labelProps: { optional?: React.ReactNode } = {
    optional: <Typography variant="caption">Optional</Typography>,
  };
  // const { loading, error, schema } = useTypedSelector((state) => state.schema);
  // const { data } = useTypedSelector((state) => state.item);

  // const {  customization,customisedItem } = useTypedSelector(
  //   (state) => state.customizer
  // );

  const {
    resetBaseSchema,
    resetItem,
    resetCustomizeSubSchema,
  } = useAction();

  const [activeStep, setActiveStep] = React.useState(0);
  const [stepProps, setStepProp] = React.useState<{ completed: boolean } | {}>(
    {}
  );
  const classes = useStyles();
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setStepProp({});
    resetBaseSchema();
    resetItem();
    resetCustomizeSubSchema();
  };

  const handleSkip = () => {
    setStepProp({ completed: false });
    handleNext();
  };

  // const handleFinish = () => {
  //   setStepProp({ completed: true });
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // };


  
  return (
    <Paper className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
        <StepLabel>{"Upload LIXI Base/Transaction Schema"}</StepLabel>
        <StepContent>
            <UploadSchemaStep handelNextClicked={handleNext}  />
        </StepContent>
        </Step>
        <Step {...stepProps}>
          <StepLabel {...labelProps}>
            <Typography variant="caption">
              Upload an existing customisation file
            </Typography>
          </StepLabel>
          <StepContent>
            <UploadCustomisationInstruction 
              handelBack={handleBack} 
              activeStep={activeStep} 
              handelSkip={handleSkip} 
              handelNext={handleNext}
            />
           
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Update/Complete Instruction Header</StepLabel>
          <StepContent>
          <CompleteInstructionsHeader activeStep={activeStep} handelBack={handleBack} handelNext={handleNext} />
          </StepContent>
        </Step>
      </Stepper>
      {activeStep === steps.length && (
        <>
          <Paper
            style={{ margin: "1rem" }}
            square
            elevation={0}
            className={classes.resetContainer}
          >

            <div>
              <Button
                startIcon={<ArrowBackIosIcon />}
                variant="contained"
                color="primary"
                size="small"
                // fullWidth
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              <Button
                endIcon={<RotateLeftIcon />}
                variant="contained"
                size="small"
                // fullWidth
                color="primary"
                onClick={handleReset}
                className={classes.button}
              >
                Reset
              </Button>
            </div>
          </Paper>
          <Paper
            square
            elevation={2}
            className={classes.customisationContainer}
          >
          </Paper>
        </>
      )}
      
    </Paper>
  );
};
