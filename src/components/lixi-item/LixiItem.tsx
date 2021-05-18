import {
  Button,
  Divider,
  List,
  ListItem,
  ListSubheader,
  Typography
} from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import React, { Fragment, useEffect, useState } from "react";
import { useAction } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypeSelector";
import { Customiser } from "../../models/Customiser";
import { ElementCustomiser } from "../../models/ElementCustomiser";
import { LixiBase } from "../../models/LixiBase";
import { CustomiseElement } from "../customise-element/CustomiseElement";
import { useStyles } from "./lixiItemStyle";
import Alert from '@material-ui/lab/Alert';
import { IntegerTypeAttribute } from "../customise-attribute/integer-type-attribute/IntegerTypeAttribute";
import { SwitchAttributeType } from "./AttributeSwitchType";
import { StringTypeAttribute } from "../customise-attribute/string-type-attribute/StringTypeAttribute";
import { ItemAttributes } from "./lixi-item-attributes/ItemAttributes";
import { LabelDescription } from "./lixi-item-label-description/LabelDescription";
import { ListTypeAttribute } from "../customise-attribute/list-type-attribute/ListTypeAttribute";
import { SimpleTokenType } from "../customise-simple-type/simple-token-type/SimpleTokenType";
import { SwitchSimpleType } from "./SimpleTypeSwitchType";


interface ItemType {
  item: Element | null | undefined;
}
export const LixiItem: React.FC<ItemType | undefined> = ({ item }) => {
  const classes = useStyles();

  const [openToCustomise, setOpenToCustomise] = useState<boolean>(false);
  const [alert, setAlert] = useState<{ included: boolean, path: string, customised?: boolean }>();
  const [lixiItem, setLixiItem] = useState<LixiBase>();
  const [exclude, setExclude] = useState(false);
  const { customization, subSchema } = useTypedSelector(
    (state) => state.customizer
  );
  const { searchItem } = useAction();

  const localName = React.useMemo(() => {
    return lixiItem?.element?.localName;
  }, [lixiItem]);

  const type = React.useMemo(() => {
    return lixiItem?.element?.getAttribute("type") || "";
  }, [lixiItem]);
  const baseRestriction = React.useMemo(() => {
    return lixiItem?.baseRestriction || "";
  }, [lixiItem]);



  useEffect(() => {
    if (item) {
      const ele: LixiBase = new LixiBase(item);
      setLixiItem(ele);
      return
    }

  }, [item, customization]);

  useEffect(() => {
    if (lixiItem?.path === "Package") {
      setOpenToCustomise(true)
    }
  }, [lixiItem?.path])

  useEffect(() => {
    if (exclude) return;
    if (lixiItem?.path) {
      const customiser = new Customiser(customization, lixiItem?.path);
      setExclude(!!customiser.ExcludedItem());
    }
  }, [customization, lixiItem?.path, exclude]);

  useEffect(() => {
    if (!lixiItem?.element.localName || !lixiItem?.path || !customization)
      return;
    const parentCustomised = ElementCustomiser.parentCustomised(
      lixiItem?.path,
      customization,
      lixiItem.element.localName
    );

    if (parentCustomised) {
      setAlert(parentCustomised);
    }
  }, [customization, lixiItem?.path, lixiItem?.element.localName]);

  useEffect(() => {
    if (!exclude && (!alert || alert?.included)) {
      setOpenToCustomise(true)
    }
    return () => {
      setOpenToCustomise(false)
    }
  }, [alert, exclude, alert?.included])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper style={{ marginTop: "0.5rem", padding: "0rem 0rem 0.5rem" }}>
          <Grid item xs={12}>
            <Paper>
              {!alert || alert?.included ? (
                <div className={classes.header}>
                  {
                    exclude
                      ? "- Excluded"
                      : "---"
                  }
                  <Button
                    disabled={exclude}
                    style={{ height: "max-content", width: "min-content" }}
                    onClick={() => setOpenToCustomise((pre) => !pre)}
                    startIcon={<SettingsOutlinedIcon />}
                    variant="contained"
                    color="primary"
                    size="small"
                  >
                    Customise
                  </Button>
                </div>
              ) : (
                <Alert
                  variant="standard"
                  severity="warning"
                  action={
                    <Button
                      className={classes.alert}
                      variant="contained"
                      size="small"
                      onClick={() => searchItem(alert?.path || "")}
                    >
                      see parent
                    </Button>
                  }
                >
                  This item specifically not included via its parent/ancestors:{" "}
                  {
                    <em>
                      <strong>{alert?.path.split(".").pop()}</strong>
                    </em>
                  }
                </Alert>
              )}
            </Paper>
          </Grid>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignContent: "center",
            }}
          >
            <LabelDescription
              lixiItem={lixiItem}
              localName={item?.localName}
              subSchema={subSchema}
            />
            <ItemAttributes lixiItem={lixiItem} type={type} />
          </div>

          {lixiItem?.references ? (
            <div>
              <Divider />
              <List dense subheader={<ListSubheader>References</ListSubheader>}>
                <Divider />
                {lixiItem.references.map((r, idx) => {
                  return (
                    <Fragment key={`${idx}_${r}`}>
                      <ListItem component="li">
                        <Typography variant="body1">{r}</Typography>
                      </ListItem>
                    </Fragment>
                  );
                })}
              </List>
            </div>
          ) : undefined}
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Collapse in={!exclude && openToCustomise}>
          {localName === "element" ? (
            <CustomiseElement lixiItem={lixiItem} />
          ) : undefined}

          {localName === "attribute" ? (
            <SwitchAttributeType switchType={type}>
              <IntegerTypeAttribute lixiItem={lixiItem} />
              <StringTypeAttribute lixiItem={lixiItem} />
              <ListTypeAttribute lixiItem={lixiItem} />
            </SwitchAttributeType>
          ) : null}

          {localName === "simpleType" ? (
            <SwitchSimpleType switchBase={baseRestriction}>
              <div></div>
              <SimpleTokenType lixiItem={lixiItem} />
            </SwitchSimpleType>
          ) : null}
        </Collapse>
      </Grid>
    </Grid>
  );
};
