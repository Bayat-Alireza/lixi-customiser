import React from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./verticalStepperStyle";
// import { useAction } from "../../hooks/useActions";
import { UploadSchemaStep } from "./upload-schema-step/UploadSchemaStep";
import { UploadCustomisationInstruction } from "./upload-customisation-instruction/UploadCustomisationInstruction";
import CssBaseline from "@material-ui/core/CssBaseline";

export const VerticalLinearStepper: React.FC = () => {
  const labelProps: { optional?: React.ReactNode } = {
    optional: <Typography variant="caption">Optional</Typography>,
  };
 

  // const {
  //   resetBaseSchema,
  //   resetItem,
  //   resetCustomizeSubSchema,
  // } = useAction();

  const [activeStep, setActiveStep] = React.useState(0);
  const [stepProps, setStepProp] = React.useState<{ completed: boolean } | {}>(
    {}
  );
  const classes = useStyles();
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // const handleReset = () => {
  //   setActiveStep(0);
  //   setStepProp({});
  //   resetBaseSchema();
  //   resetItem();
  //   resetCustomizeSubSchema();
  // };

  const handleSkip = () => {
    setStepProp({ completed: false });
    handleNext();
  };
  
  return (
    <div className={classes.root}>
      <CssBaseline/>
      <Stepper className={classes.stepper} activeStep={activeStep} orientation="vertical">
        <Step>
        <StepLabel>{"Upload LIXI Base Schema"}</StepLabel>
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
      </Stepper>
    </div>
  );
};
