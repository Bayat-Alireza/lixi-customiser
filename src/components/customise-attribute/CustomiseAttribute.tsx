import Typography from "@material-ui/core/Typography";
import React from "react";
import { useStyles } from "./customiseAttributeStyle";
import { FieldArray, Form, Formik } from "formik";
import Paper from "@material-ui/core/Paper";
import { AppCheckBox } from "../formik-mterial-ui/AppCheckBox";
import { customiseAttributeSchema } from "./customisAttributeSchema";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { AppRadioButton } from "../formik-mterial-ui/AppRadioButton";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import { AppTextField } from "../formik-mterial-ui/AppTextField";
import Grid from "@material-ui/core/Grid/Grid";
import { StringToList } from "./string-to-list/StringList";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton/IconButton";
import RemoveCircleOutlineRoundedIcon from "@material-ui/icons/RemoveCircleOutlineRounded";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Collapse from "@material-ui/core/Collapse";

export const CustomiseAttribute: React.FC = () => {
  const classes = useStyles();
  return (
    <Formik
      initialValues={{
        optionalToMandatory: false,
        pattern: "",
        stringTo: "",
        excerpt: "",
        documentation: "",
        enumerations: [],
      }}
      enableReinitialize
      validationSchema={customiseAttributeSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting, values, errors, touched }) => (
        <Form>
          <Paper style={{ padding: "0.5rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <AppCheckBox
                name="optionalToMandatory"
                color="primary"
                size="medium"
                label="Optional To Mandatory"
                value={values?.optionalToMandatory}
              />
              <Button
                className={classes.saveButton}
                size="small"
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<SaveIcon fontSize="large" />}
              >
                Save
              </Button>
            </div>
            <Divider />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                width: "100%",
              }}
            >
              <FormControl style={{ width: "100%" }}>
                <Paper style={{ padding: "0.5rem", margin: "0.5rem 0.2rem" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <AppRadioButton
                      name="stringTo"
                      type="radio"
                      value="pattern"
                      label="String To Pattern"
                    />
                    {/* {values.stringTo === "pattern" ? ( */}
                    <Collapse in={values.stringTo === "pattern"}>
                      <AppTextField
                        variant="outlined"
                        size="small"
                        label="Regex Expression"
                        name="pattern"
                        placeholder="Regex Expression"
                        value={values.pattern}
                      />
                    </Collapse>
                  </div>
                  {/* ) : undefined} */}
                </Paper>
                <Paper style={{ padding: "0.5rem", margin: "0.5rem 0.2rem" }}>
                  <AppRadioButton
                    name="stringTo"
                    type="radio"
                    value="list"
                    label="String To enumerated List"
                  />

                  <Collapse in={values.stringTo === "list"}>
                    <div style={{ width: "100%" }}>
                      <StringToList />
                      <FieldArray name="enumerations">
                        {(arrayHelper) => {
                          return (
                            <div
                              style={{
                                height: "15rem",
                                width: "100%",
                                overflowY: "scroll",
                              }}
                            >
                              {/* <List
                                subheader={
                                  <ListSubheader>Enumerated List</ListSubheader>
                                }
                              > */}
                              {values.enumerations.map((e, idx) => {
                                return (
                                  <div
                                    style={{
                                      display: "flex",
                                      gap: "0.5rem",
                                      width: "100%",
                                    }}
                                    key={`${e["value"]}-${idx}`}
                                  >
                                    <div style={{ width: "100%" }}>
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "flex-start",
                                          alignItems: "center",
                                        }}
                                      >
                                        <IconButton
                                          onClick={() =>
                                            arrayHelper.remove(idx)
                                          }
                                          color="secondary"
                                          aria-label="delete"
                                        >
                                          <RemoveCircleOutlineRoundedIcon fontSize="small" />
                                        </IconButton>

                                        <Typography variant="h5" component="h2">
                                          {e["name"]}
                                        </Typography>
                                      </div>

                                      <div>
                                        <Typography
                                          className={classes.definition}
                                          color="textSecondary"
                                        >
                                          {e["definition"]}
                                        </Typography>
                                      </div>
                                      <Divider />
                                    </div>
                                    {/* <ListItem
                                        divider
                                        key={`enumerations..value`}
                                        role={undefined}
                                        dense
                                        button
                                      >
                                        <ListItemIcon>
                                          <IconButton
                                            onClick={() =>
                                              arrayHelper.remove(idx)
                                            }
                                            color="secondary"
                                            aria-label="delete"
                                          >
                                            <RemoveCircleOutlineRoundedIcon fontSize="small" />
                                          </IconButton>
                                        </ListItemIcon>
                                        <ListItemText
                                          id={`enumerations..value`}
                                          primary={e["definition"]}
                                        />
                                      </ListItem> */}
                                  </div>
                                );
                              })}
                              {/* </List> */}
                            </div>
                          );
                        }}
                      </FieldArray>
                    </div>
                  </Collapse>
                </Paper>
              </FormControl>
            </div>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <AppTextField
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
          </Paper>
        </Form>
      )}
    </Formik>
  );
};



