import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Alert from "@material-ui/lab/Alert";
import { AppCheckBox } from "../formik-mterial-ui/AppCheckBox";
import CancelPresentationTwoToneIcon from "@material-ui/icons/CancelPresentationTwoTone";
// import {CssBaseline} from "@material-ui/core"
import { Formik, Form } from "formik";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import { Divider } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import * as Yup from "yup";
import { useAction } from "../../hooks/useActions";
import Tooltip from "@material-ui/core/Tooltip";
import { Customiser } from "../../models/Customiser";
import { useTypedSelector } from "../../hooks/useTypeSelector";
import { SubSchemaMenu } from "../sub-schema-menu/SubSchemaMenu";
import { useStyles } from "./selectTransactionDialogStyle";

interface IConfirmRemoveItem {
  open: boolean;
  handleClose: () => void;
}

export const SelectTransactionDialog: React.FC<IConfirmRemoveItem> = ({
  open,

  handleClose,
}) => {
  const classes = useStyles();
  // const { updateCustomisation } = useAction();
  const { subSchema } = useTypedSelector((state) => state.customizer);
  const [preSubSchema, setPreSubSchema] = React.useState(subSchema);

  React.useEffect(() => {
    if (subSchema?.transactionType !== preSubSchema?.transactionType) {
      setPreSubSchema(subSchema);
      handleClose();
    }
  }, [
    handleClose,
    preSubSchema?.transactionType,
    subSchema,
    subSchema?.transactionType,
  ]);

  return (
    <Formik
      initialValues={{ agree: false }}
      validationSchema={Yup.object().shape({
        agree: Yup.boolean().oneOf([true]),
      })}
      enableReinitialize
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          setSubmitting(true);

          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
          handleClose();
        }, 400);
      }}
    >
      {({ isSubmitting, values, errors, touched, resetForm }) => (
        <div>
          <Dialog
            draggable
            BackdropProps={{ classes: { root: classes.root } }}
            PaperProps={{ classes: { root: classes.paper, elevation2: "5" } }}
            style={{ boxShadow: "none" }}
            open={open}
            onClose={resetForm}
            aria-labelledby="form-dialog-title"
          >
            <CssBaseline />
            <DialogTitle
              style={{
                backgroundColor: "cornsilk",
                padding: 0,
                boxShadow: "0.1rem 0.1rem 0.1rem orange",
              }}
              id="form-dialog-title"
            >
              {subSchema?.transactionType ? (
                <Alert
                  style={{ width: "100%" }}
                  variant="standard"
                  severity="warning"
                  action={
                    <Tooltip title="Cancel" placement="top">
                      <IconButton
                        onClick={handleClose}
                        aria-label="delete"
                        className={classes.alert}
                        size="small"
                        disableRipple
                      >
                        <CancelPresentationTwoToneIcon fontSize="default" />
                      </IconButton>
                    </Tooltip>
                  }
                >
                  Changing the transaction will reset the customisation file
                </Alert>
              ) : (
                <Alert
                  style={{ width: "100%" }}
                  variant="standard"
                  severity="info"
                  action={
                    <Tooltip title="Cancel" placement="top">
                      <IconButton
                        onClick={handleClose}
                        aria-label="delete"
                        className={classes.alert}
                        size="small"
                        disableRipple
                      >
                        <CancelPresentationTwoToneIcon fontSize="default" />
                      </IconButton>
                    </Tooltip>
                  }
                >
                  Target transaction schema must be selected.
                </Alert>
              )}
            </DialogTitle>
            <DialogContent>
              <Typography variant="subtitle1">
                Select the transaction from the dropdown list
              </Typography>

              <DialogContentText></DialogContentText>
            </DialogContent>
            <Divider />
            <Form>
              <DialogActions>
                <SubSchemaMenu />
              </DialogActions>
            </Form>
          </Dialog>
        </div>
      )}
    </Formik>
  );
};
