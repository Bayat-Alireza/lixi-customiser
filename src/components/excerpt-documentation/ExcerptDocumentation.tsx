import Grid from "@material-ui/core/Grid";
import React from "react";
import { AppTextField } from "../formik-mterial-ui/AppTextField";
import { useFormikContext } from "formik";

export const ExcerptDocumentation: React.FC = ({ children }) => {
  const excerptTooltip = `
  A short description - explaining the item usage.
  `;
  const documentationTooltip = `
  An alternative description - explaining the item usage.
  `;
  const customHeadingTooltip = `A custom heading for the documentation`;
  const { values,submitForm } = useFormikContext<{
    excerpt: string;
    documentation: string;
    heading: string;
  }>();

  return (
    <Grid container spacing={2}>
      
      <Grid item xs={12} sm={children?6:12}>
        <AppTextField
          title={customHeadingTooltip}
          onBlur={submitForm}
          variant="outlined"
          multiline
          fullWidth
          rows={1}
          name="heading"
          value={values.heading}
          label="Custom Heading"
        />
      </Grid>
      {children}
      <Grid item xs={12} sm={6}>
        <AppTextField
          title={excerptTooltip}
          onBlur={submitForm}
          variant="outlined"
          multiline
          fullWidth
          rows={4}
          name="excerpt"
          value={values.excerpt}
          label="Custom Excerpt"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <AppTextField
          title={documentationTooltip}
          onBlur={submitForm}
          variant="outlined"
          multiline
          fullWidth
          rows={4}
          name="documentation"
          value={values.documentation}
          label="Custom Documentation"
        />
      </Grid>
    </Grid>
  );
};
