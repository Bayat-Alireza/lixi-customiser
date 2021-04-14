import Grid from "@material-ui/core/Grid";
import React from "react";
import { AppTextField } from "../formik-mterial-ui/AppTextField";
import { useFormikContext } from "formik";

export const ExcerptDocumentation: React.FC = () => {
  const excerptTooltip = `
  A short description - explaining the item usage.
  `;
  const documentationTooltip = `
  An alternative description - explaining the item usage.
  `;
  const customHeading = `A custom heading for the documentation`;
  const { values } = useFormikContext<{
    excerpt: string;
    documentation: string;
    heading: string;
  }>();

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <AppTextField
          title={customHeading}
          variant="outlined"
          multiline
          fullWidth
          rows={1}
          name="heading"
          value={values?.heading}
          label="Custom Heading"
        />
      </Grid>
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
