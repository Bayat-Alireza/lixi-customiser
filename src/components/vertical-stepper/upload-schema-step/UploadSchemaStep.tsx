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

interface IUploadSchemaStep {
  handelNextClicked: () => void;
}

export const UploadSchemaStep: React.FC<IUploadSchemaStep> = ({
  handelNextClicked,
}) => {
  const classes = useStyles();
  const { uploadBaseSchema } = useAction();
  const { schema } = useTypedSelector((state) => state.schema);

  return (
    <>
      <Box maxWidth="75ch">
        <Typography>
          Upload LIXI's Base/Transaction schema that that you want to customise.
        </Typography>
      </Box>
      <Paper className={classes.uploadContainer}>
        <div>
          <Grid container alignItems="center">
            <Grid item xs={12} sm={12}>
              <UploadFile
                saveFace={(file: File) => uploadBaseSchema(file)}
                description={"Click to upload LIXI Base/Transaction Schema"}
              />
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
          </Grid>
        </div>
      </Paper>
    </>
  );
};
