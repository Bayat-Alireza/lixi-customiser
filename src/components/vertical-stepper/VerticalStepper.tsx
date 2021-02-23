import React, { useEffect } from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./verticalStepperStyle";
import { UploadFile } from "../upload-file/UploadFile";
import { SubSchemaMenu } from "../sub-schema-menu/SubSchemaMenu";
import { useTypedSelector } from "../../hooks/useTypeSelector";
import { useAction } from "../../hooks/useActions";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import { SearchPath } from "../search/SearchPath";
import { LixiItem } from "../lixi-item/LixiItem";
import { ItemXMLViewer } from "../itemXMLViewer/ItemXMLViewer";
// import { Divider } from "@material-ui/core";

function getSteps() {
  return [
    "Upload LIXI Base/Transaction Schema.",
    "Upload an existing customisation file",
    // "Choose the item you want to customise",
  ];
}

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return `Upload LIXI's Base schema and specify the transaction schema that you would like to customise.
      Alternatively only upload the specific transaction schema.`;
    case 1:
      return `If you already have an existing customisation file you can upload it here, otherwise a new customisation file will be created`;
    case 2:
      return `Search item by their path or alternatively choose the item you would like to customise from the dropdown list`;
    default:
      return "Unknown step";
  }
}

export const VerticalLinearStepper: React.FC = () => {
  const labelProps: { optional?: React.ReactNode } = {
    optional: <Typography variant="caption">Optional</Typography>,
  };
  // const { loading, error, schema } = useTypedSelector((state) => state.schema);
  const { data } = useTypedSelector((state) => state.item);

  const { subSchema, customization } = useTypedSelector(
    (state) => state.customizer
  );

  useEffect(() => {}, [customization]);
  const {
    uploadBaseSchema,
    resetBaseSchema,
    resetItem,
    uploadExistingCustomization,
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
  };

  const handleSkip = () => {
    setStepProp({ completed: false });
    handleNext();
  };

  const handleFinish = () => {
    setStepProp({ completed: true });
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
          <StepLabel>{"Upload LIXI Base/Transaction Schema"}</StepLabel>
          <StepContent>
            <Typography>{getStepContent(0)}</Typography>
            <div className={classes.actionsContainer}>
              <div>
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "1rem",
                    padding: "0.2rem 0.5rem",
                    height: "max-content",
                    backgroundColor: "#fffde7",
                  }}
                >
                  <div
                    style={{
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "space-between",
                      width: "80%",
                      backgroundColor: "#fffde7",
                    }}
                  >
                    <UploadFile
                      saveFace={(file: File) => uploadBaseSchema(file)}
                      description={
                        "Click to upload LIXI Base/Transaction Schema"
                      }
                    />
                  </div>
                  <div style={{ width: "20%", marginLeft: "0.5rem" }}>
                    <SubSchemaMenu />
                  </div>
                  <div style={{ alignItems: "center" }}>
                    <Button
                      endIcon={<ArrowForwardIosIcon />}
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      disabled={subSchema?.transactionType ? false : true}
                      // className={classes.button}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </StepContent>
        </Step>
        <Step {...stepProps}>
          <StepLabel {...labelProps}>
            <Typography variant="caption">
              Upload an existing customisation file
            </Typography>
          </StepLabel>
          <StepContent>
            <Typography>{getStepContent(1)}</Typography>
            <div className={classes.actionsContainer}>
              <div>
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "1rem",
                    padding: "0.2rem 0.5rem",
                    height: "max-content",
                    backgroundColor: "#fffde7",
                  }}
                >
                  <div style={{ alignContent: "center" }}>
                    <Button
                      startIcon={<ArrowBackIosIcon />}
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      // className={classes.button}
                      variant="outlined"
                      color="primary"
                    >
                      Back
                    </Button>
                  </div>

                  <div
                    style={{
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "space-between",
                      width: "80%",
                      backgroundColor: "#fffde7",
                    }}
                  >
                    <UploadFile
                      saveFace={(file: File) =>
                        uploadExistingCustomization(file)
                      }
                      description={
                        "Click to upload an existing customisation file"
                      }
                    />
                  </div>
                  <div style={{ alignContent: "center" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleFinish}
                      disabled={customization ? false : true}
                      // className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </div>
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              </div>
            </div>
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
            {/* <Typography>All steps completed - you&apos;re finished</Typography> */}

            <div>
              <Button
                startIcon={<ArrowBackIosIcon />}
                variant="contained"
                color="primary"
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              <Button
                endIcon={<RotateLeftIcon />}
                variant="contained"
                color="primary"
                onClick={handleReset}
                className={classes.button}
              >
                Reset
              </Button>
            </div>
          </Paper>
          {/* <Divider /> */}
          <Paper
            square
            elevation={2}
            className={classes.customisationContainer}
          >
            <SearchPath />
            {data ? <LixiItem item={data} /> : undefined}
            {data ? <ItemXMLViewer itemXML={customization} /> : undefined}
          </Paper>
        </>
      )}
    </div>
  );
};
