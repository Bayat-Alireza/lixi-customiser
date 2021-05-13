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
import { useStyles } from "./confirmRemoveItemDialogStyle";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import { Divider } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import * as Yup from "yup";
import { useAction } from "../../hooks/useActions";
import Tooltip from "@material-ui/core/Tooltip";
import { useTypedSelector } from "../../hooks/useTypeSelector";
import { Customiser } from "../../models/Customiser";

interface IConfirmRemoveItem {
  open: boolean;
  handleClose: () => void;
  affected: { path: string; items: string[] } | undefined;
}

export const ConfirmRemoveItemDialog: React.FC<IConfirmRemoveItem> = ({
  open,
  affected,
  handleClose,
}) => {
  const classes = useStyles();
  const { updateCustomisation } = useAction();
  const { customization } = useTypedSelector((state) => state.customizer);
  
  return (
    <Formik
      initialValues={{ agree: false, ...affected }}
      validationSchema={Yup.object().shape({
        agree: Yup.boolean().oneOf([true]),
      })}
      enableReinitialize
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          setSubmitting(true);
          const newCustomisation = new Customiser(
            customization,
            affected?.path
          );
          newCustomisation.removeCustomisation([...(values.items || [])]);
          updateCustomisation(newCustomisation.customisation);
          setSubmitting(false);
          resetForm();
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
                boxShadow: "1px 1px 1px orange",
              }}
              id="form-dialog-title"
            >
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
                <em>
                  <strong>{affected?.path.split(".").pop()}</strong>{' '}
                  Has Customised Descendant(s)!
                </em>
                
              </Alert>
            </DialogTitle>
            <DialogContent>
              <Typography gutterBottom variant="subtitle1">
                Before excluding/not including{" "}<strong>{affected?.path.split(".").pop()}</strong>
                , following customisation must be deleted to avoid conflicting instructions.
              </Typography>

              {affected?.items.map((i, idx) => {
                return <li key={i}>{`${i}`}</li>;
              })}
              <DialogContentText></DialogContentText>
            </DialogContent>
            <Divider />
            <Form>
              <DialogActions
                style={{
                  justifyContent: "space-between",
                  padding: "0.2rem 1rem",
                }}
              >
                <AppCheckBox
                  checked={values.agree}
                  name="agree"
                  label="I know what I'm doing"
                  onClick={() => (values.agree = !values.agree)}
                  value={`${values?.agree}`}
                />
                {/* <Checkbox value={values.agree} name="agree" /> */}
                <Button
                  type="submit"
                  variant="contained"
                  className={classes.button}
                  disabled={isSubmitting}
                  size="small"
                  // onClick={handleClose}
                  color="primary"
                >
                  Proceed
                </Button>
              </DialogActions>
            </Form>
          </Dialog>
        </div>
      )}
    </Formik>
  );
};
