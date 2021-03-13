import {
  Avatar,
  Badge,
  Box,
  Button,
  Checkbox,
  Chip,

  Divider,
  FormControlLabel,
  // FormGroup,
  List,
  ListItem,
  ListSubheader,
  // TextField,
  Typography
} from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import DoneIcon from "@material-ui/icons/Done";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
// import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
// import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import React, { Fragment, useEffect, useState } from "react";
import { useAction } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypeSelector";
import { Customiser } from "../../models/Customiser";
import { ElementCustomiser } from "../../models/ElementCustomiser";
import { LixiBase } from "../../models/LixiBase";
import { CustomiseAttribute } from "../customise-attribute/CustomiseAttribute";
import { CustomiseElement } from "../customise-element/CustomiseElement";
import { useStyles } from "./lixiItemStyle";
import Alert from '@material-ui/lab/Alert';


interface ItemType {
  item: Element | null | undefined;
}
export const LixiItem: React.FC<ItemType | undefined> = ({ item }) => {
  const classes = useStyles();


  const [openToCustomise, setOpenToCustomise] = useState<boolean>(false);
  const [alert,setAlert] = useState<string>('')
  const [lixiItem, setLixiItem] = useState<LixiBase>();
  const [exclude, setExclude] = useState(false);
  const { customization, subSchema } = useTypedSelector(
    (state) => state.customizer
  );
  const { excludeItem, includeItem,searchItem } = useAction();

  const itemType = React.useMemo(() => {
    return lixiItem?.element?.localName;
  }, [lixiItem]);

  useEffect(() => {
    if (item) {
      const ele: LixiBase = new LixiBase(item);
      setLixiItem(ele);
    }
  }, [item]);

  const onExclude = () => {
    const excluded = !exclude;
    setExclude(excluded);
    if (excluded && lixiItem?.path) {
      excludeItem(lixiItem?.path);
    } else if (lixiItem?.path) {
      includeItem(lixiItem?.path);
    }
  };

  useEffect(() => {
    if (exclude) return;
    if (lixiItem?.path) {
      const customiser = new Customiser(customization, lixiItem?.path);
      setExclude(!!customiser.ExcludedItem());
    }
  }, [customization, lixiItem?.path, exclude]);

  useEffect(()  =>  {
    if (!lixiItem?.element.localName || !lixiItem?.path || !customization)  return;
    const parentExcluded = ElementCustomiser.parentCustomised(lixiItem?.path,customization,lixiItem.element.localName)
    if (parentExcluded){
      setAlert(parentExcluded||'');;
    }
  },  [customization, lixiItem?.path,lixiItem?.element.localName]);;

  return (
    <Grid container spacing={2}>
      
      <Grid item xs={12}>
        <Paper style={{ marginTop: "0.5rem", padding: "0.5rem 0.5rem" }}>
          <Grid item xs={12}>
            <Paper>
              {!alert?<div className={classes.header}>
                {/* <FormGroup row> */}
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={
                        <DoneOutlinedIcon
                          style={{ color: "green" }}
                          fontSize="small"
                        />
                      }
                      checkedIcon={<CloseOutlinedIcon fontSize="small" />}
                      onChange={onExclude}
                      checked={exclude}
                      name="checkedI"
                    />
                  }
                  label={exclude ? "Excluded" : "Include"}
                />

                <Button
                  disabled={exclude}
                  onClick={() => setOpenToCustomise((pre) => !pre)}
                  startIcon={<SettingsOutlinedIcon />}
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  Customise
                </Button>
              </div>:<Alert variant="standard" severity="warning" action={
                        <Button className={classes.alert}  variant="contained" size="small" onClick={()=>searchItem(alert)}>
                         see parent
                        </Button>
                      }>
                This item excluded via its parent: {<em><strong>{alert.split(".").pop()}</strong></em>}
                        
                      </Alert>}
            </Paper>
          </Grid>
          {/* <Divider /> */}
          {/* <CssBaseline /> */}
          <div className={classes.itemLabelDescription}>
            <Badge
              color="primary"
              badgeContent={lixiItem?.element.localName}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Typography variant="h4">{lixiItem?.label}</Typography>
            </Badge>
            <div>
              {lixiItem?.transactions?.sort().map((t, idx) => {
                if (
                  subSchema?.transactionType &&
                  subSchema.transactionType === t
                ) {
                  return (
                    <Chip
                      key="active"
                      style={{ margin: "0 0.1rem" }}
                      avatar={<Avatar>{subSchema?.transactionType[0]}</Avatar>}
                      deleteIcon={<DoneIcon />}
                      size="small"
                      color="secondary"
                      variant="outlined"
                      clickable
                      label={t}
                    />
                  );
                }
                return (
                  <Chip
                    key={`${idx}_${t}`}
                    size="small"
                    color="primary"
                    variant="outlined"
                    label={t}
                  />
                );
              })}
            </div>
          </div>
          <div style={{ maxWidth: "75ch" }}>
            <Typography style={{ padding: "0.1rem 1rem" }} variant="body1">
              {lixiItem?.documentation}
            </Typography>
          </div>

          <Divider />
          <div className={classes.attributes}>
            {lixiItem?.element.getAttributeNames().map((att, idx) => {
              return (
                <Box
                  key={`${idx}_${att}`}
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    marginRight: "0.5rem",
                  }}
                >
                  <Typography color="primary" align="left" variant="body1">
                    {`-${att}: `}
                  </Typography>
                  <Typography color="secondary" align="left" variant="body2">
                    <em>{lixiItem?.element.getAttribute(att)}</em>
                  </Typography>
                </Box>
              );
            })}
            {lixiItem?.element.localName === "simpleType" ? (
              <div className={classes.references}>
                <Typography color="primary" align="left" variant="h6">
                  {`Base Restriction:`}
                </Typography>
                <Typography color="secondary" align="left" variant="body1">
                  {lixiItem?.baseRestriction}
                </Typography>
              </div>
            ) : undefined}
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
        <Collapse in={openToCustomise}>
          {itemType === "element" ? (
            <CustomiseElement lixiItem={lixiItem} />
          ) : undefined}
          {itemType === "attribute" ? <CustomiseAttribute /> : undefined}
        </Collapse>
      </Grid>
    </Grid>
  );
};
