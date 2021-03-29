import Grid from "@material-ui/core/Grid";
import React from "react";
import { AppTextField } from "../formik-mterial-ui/AppTextField";
import { Formik, useFormik, useFormikContext } from "formik";
import Tooltip from "@material-ui/core/Tooltip";

export const ExcerptDocumentation: React.FC = () => {
  const excerptTooltip = `
  A short description - explaining the item usage.
  `;
  const documentationTooltip = `
  An alternative description - explaining the item usage.
  `;
  const { values } = useFormikContext<{
    excerpt: string;
    documentation: string;
  }>();

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6}>
        <AppTextField
          title={excerptTooltip}
          variant="outlined"
          multiline
          fullWidth
          rows={4}
          name="excerpt"
          value={values?.excerpt}
          label="Custom Excerpt"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <AppTextField
          title={documentationTooltip}
          variant="outlined"
          multiline
          fullWidth
          rows={4}
          name="documentation"
          value={values?.documentation}
          label="Custom Documentation"
        />
      </Grid>
    </Grid>
  );
};
