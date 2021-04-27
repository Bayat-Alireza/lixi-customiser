import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import SaveTwoToneIcon from "@material-ui/icons/SaveTwoTone";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useStyles } from "./completeInstructionHeaderStyle";
import { useAction } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypeSelector";
import { XmlUtil } from "../../../util/nameSpaces";
import { SubSchema } from "../../../redux/actions/customiser-actions";
import IconButton from "@material-ui/core/IconButton";
import { AppTextField } from "../../formik-mterial-ui/AppTextField";
import { AppSelect } from "../../formik-mterial-ui/AppSelect";

interface InstructionHeader {
  LIXITransactionType: string;
  customHeading: string;
  customisationCode: string;
  description: string;
}

interface ICompleteCustomisationHeader {
  handelBack: () => void;
  handelSkip?: () => void;
  handelNext: () => void;
  activeStep: number;
}

const InstructionHeaderSchema = Yup.object().shape({
  LIXITransactionType: Yup.string().required("Transaction Type Required"),
  customHeading: Yup.string().max(50),
  customisationCode: Yup.string(),
  description: Yup.string(),
});

export const CompleteInstructionsHeader: React.FC<ICompleteCustomisationHeader> = ({
  handelBack,
  handelSkip,
  handelNext,
  activeStep,
}) => {
  const { customizeSubSchema } = useAction();
  const { subSchema } = useTypedSelector((state) => state.customizer);
  const { schema } = useTypedSelector((state) => state.schema);
  const [transactionList, setTransactionList] = React.useState<SubSchema[]>([]);

  const classes = useStyles();
  const initialValue = {
    LIXITransactionType:
      subSchema && subSchema.transactionType
        ? `${subSchema?.transactionType}_${subSchema?.transactionVersion}`
        : "",
    customHeading: "",
    customisationCode: "",
    description: "",
  };
  const [
    instructionsHeader,
    setInstructionHeader,
  ] = React.useState<InstructionHeader>(initialValue);

  // React.useEffect(() => {
  //   console.log("Sub-Schema:", subSchema);
  // }, [subSchema]);

  React.useEffect(() => {
    const transaction = (): Promise<
      {
        transactionType: string;
        transactionVersion: string;
      }[]
    > => {
      return new Promise((resolves, rejects) => {
        if (!schema) {
          setTransactionList([]);
          return;
        }
        const xmlUtile = new XmlUtil(schema);
        const transactions = xmlUtile.getTransactions();
        resolves(transactions);
      });
    };

    (async () => {
      setTransactionList(await transaction());
    })();
  }, [schema]);
  return (
    <Paper style={{ width: "100%" }} className={classes.uploadContainer}>
      <Formik
        initialValues={instructionsHeader}
        validationSchema={InstructionHeaderSchema}
        onSubmit={(values, { setSubmitting }) => {
          const s = values.LIXITransactionType.split("_");
          const tv = {
            transactionType: s[0],
            transactionVersion: s[1],
          };
          customizeSubSchema(tv);
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting, values, errors, touched }) => (
          <Form>
            <div style={{ flexGrow: 1 }}>
              <Grid
                container
                alignItems="center"
                alignContent="flex-start"
                spacing={2}
              >
                <Grid item xs={12}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <AppSelect
                      data={transactionList}
                      name="LIXITransactionType"
                      label="Schema-Version"
                      formControlProps={{
                        className: classes.formControl,
                        variant: "outlined",
                        size: "small",
                      }}
                      selectProps={{
                        className: classes.selectOption,
                        autoWidth: true,
                      }}
                    />
                    <IconButton
                      type="submit"
                      color="primary"
                      size="medium"
                      aria-label="delete"
                    >
                      <SaveTwoToneIcon fontSize="large" />
                    </IconButton>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <AppTextField
                    name="customHeading"
                    size="small"
                    fullWidth
                    type="text"
                    value={values.customHeading}
                    label="Custom Heading"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <AppTextField
                    name="customisationCode"
                    fullWidth
                    size="small"
                    type="text"
                    value={values.customisationCode}
                    label="Customisation Code"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <AppTextField
                    name="description"
                    fullWidth
                    size="small"
                    multiline
                    rows={3}
                    type="text"
                    value={values.description}
                    label="Description"
                    variant="outlined"
                  />
                </Grid>

                <div className={classes.actionsContainer}>
                  <Button
                    startIcon={<ArrowBackIosIcon />}
                    variant="contained"
                    color="primary"
                    size="small"
                    disabled={activeStep === 0}
                    onClick={handelBack}
                    className={classes.backButton}
                  >
                    Back
                  </Button>

                  <Button
                    endIcon={<ArrowForwardIosIcon />}
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={handelNext}
                    className={classes.nextButton}
                  >
                    Next
                  </Button>
                </div>
              </Grid>
            </div>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};
