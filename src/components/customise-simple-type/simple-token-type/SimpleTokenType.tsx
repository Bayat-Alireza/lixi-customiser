import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListSubheader from "@material-ui/core/ListSubheader";
import Paper from "@material-ui/core/Paper";
import { FieldArray, Form, Formik } from "formik";
import React from "react";
import { tokenType } from "../../../models/customisationTypes";
import { LixiBase } from "../../../models/LixiBase";
import { AppCheckBox } from "../../formik-mterial-ui/AppCheckBox";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
import { useStyles } from "./simpleTokenTypeStyle";
import ListItemText from "@material-ui/core/ListItemText";
import IndeterminateCheckBoxTwoToneIcon from "@material-ui/icons/IndeterminateCheckBoxTwoTone";
import { ExcerptDocumentation } from "../../excerpt-documentation/ExcerptDocumentation";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { TokenTypeCustomiser } from "../../../models/TokenTypeCustomiser";
import { useAction } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypeSelector";
interface ISimpleTokenType {
  lixiItem: LixiBase | undefined;
  baseRestriction?: "xs:token";
}

export const SimpleTokenType: React.FC<ISimpleTokenType> = ({ lixiItem }) => {
  const classes = useStyles();
  const { updateCustomisation } = useAction();
  const { customization } = useTypedSelector((state) => state.customizer);

  const [initialValue, setInitialValue] = React.useState<tokenType>({
    tokens: [],
  });

  const enumerations = React.useMemo(() => {
    if (!lixiItem?.enumeration?.length) return;
    const result: string[] = [];
    lixiItem.enumeration.forEach((e: Element | undefined) => {
      if (e) {
        const enumItem = new LixiBase(e).path?.split(".").pop();
        if (!enumItem) return;
        result.push(enumItem);
      }
    });
    return result;
  }, [lixiItem?.enumeration]);

  const enumerationAddRemove = (el: string | undefined) => {
    console.log(initialValue);
    if (!el) return;
    const copyOfTokens = [...initialValue.tokens];
    if (copyOfTokens.includes(el)) {
      copyOfTokens.splice(copyOfTokens.indexOf(el), 1);
    } else {
      copyOfTokens.push(el);
    }
    setInitialValue((pre) => ({ ...pre, tokens: copyOfTokens.sort() }));
  };

  const toggle = () => {
    const copyToken = [...initialValue.tokens];
    if (copyToken.length) {
      setInitialValue((pre) => ({ ...pre, tokens: [] }));
      return;
    }
    if (enumerations?.length) {
      setInitialValue((pre) => ({ ...pre, tokens: [...enumerations] }));
    }
  };

  React.useEffect(() => {
    if (!lixiItem?.path) return;
    const newCustomisation = new TokenTypeCustomiser(
      customization,
      lixiItem.path
    );
    const instruction = newCustomisation.customisedObject();
    setInitialValue(instruction);
  }, [customization, lixiItem?.path]);

  return (
    <Formik
      initialValues={initialValue}
      enableReinitialize
      onSubmit={(values, { setSubmitting }) => {
        if (!lixiItem?.path) return;
        setSubmitting(true);
        const tokeCustomiser = new TokenTypeCustomiser(
          customization,
          lixiItem.path,
          values
        );
        tokeCustomiser.customise();
        updateCustomisation(tokeCustomiser.customisation);
        // setTimeout(() => {
        //   alert(JSON.stringify(values, null, 2));
        //   setSubmitting(false);
        // }, 400);
      }}
    >
      {({ values }) => (
        <Form>
          <Paper style={{ padding: "0.5rem" }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Paper>
                  <List dense className={classes.list}>
                    <ListSubheader
                      title="Click To Select All Items"
                      className={classes.subItemHeader}
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <ListItemIcon>
                        <AppCheckBox
                          name="allSelected"
                          checked={
                            values.tokens.length === enumerations?.length
                          }
                          value={
                            values.tokens.length === enumerations?.length
                              ? "all"
                              : ""
                          }
                          disableRipple
                          onClick={() => toggle()}
                          checkedIcon={
                            <DoneOutlinedIcon style={{ color: "green" }} />
                          }
                          icon={<CloseOutlinedIcon style={{ color: "red" }} />}
                          indeterminateIcon={
                            <IndeterminateCheckBoxTwoToneIcon color="primary" />
                          }
                          indeterminate={
                            initialValue.tokens.length > 0 &&
                            initialValue.tokens.length <
                              (enumerations?.length || 0)
                          }
                        />
                      </ListItemIcon>
                      <ListItemText
                        onClick={() => toggle()}
                        primary="Select All Enumerations"
                      />
                      <Button
                        style={{ alignItems: "flex-end" }}
                        variant="contained"
                        size="small"
                        color="primary"
                        type="submit"
                      >
                        save
                      </Button>
                    </ListSubheader>
                    <FieldArray
                      name="tokens"
                      render={(arrayHelper) => {
                        if (!enumerations?.length) return <></>;
                        return enumerations?.map((el: string | undefined) => {
                          if (!el) return <></>;
                          return (
                            <ListItem
                              className={classes.item}
                              divider
                              onClick={() => enumerationAddRemove(el)}
                              key={el}
                            >
                              <ListItemIcon>
                                <AppCheckBox
                                  name="tokens"
                                  checked={values?.tokens.includes(el)}
                                  disableRipple
                                  value={values?.tokens.includes(el) ? el : ""}
                                  checkedIcon={
                                    <DoneOutlinedIcon
                                      style={{ color: "green" }}
                                      fontSize="small"
                                    />
                                  }
                                  icon={
                                    <CloseOutlinedIcon
                                      fontSize="small"
                                      style={{ color: "red" }}
                                    />
                                  }
                                />
                              </ListItemIcon>
                              <ListItemText>{el}</ListItemText>
                            </ListItem>
                          );
                        });
                      }}
                    />
                  </List>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <ExcerptDocumentation />
              </Grid>
              <Grid item xs={12}>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    margin: "0.5rem",
                  }}
                ></Box>
              </Grid>
            </Grid>
          </Paper>
          {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
        </Form>
      )}
    </Formik>
  );
};

SimpleTokenType.defaultProps = {
  baseRestriction: "xs:token",
};
