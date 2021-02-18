import {
  Avatar,
  Badge,
  Box,
  Button,
  Checkbox,
  Chip,
  CssBaseline,
  Divider,
  FormControlLabel,
  FormGroup,
  List,
  ListItem,
  ListSubheader,
  Typography,
} from "@material-ui/core";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import React, { Fragment, useEffect, useState } from "react";
import { useAction } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypeSelector";
import { Customiser } from "../../models/Customiser";
import { LixiBase } from "../../models/LixiBase";
import { useStyles } from "./lixiItemStyle";
import DoneIcon from "@material-ui/icons/Done";

interface ItemType {
  item: Element | null | undefined;
}
export const LixiItem: React.FC<ItemType | undefined> = ({ item }) => {
  const classes = useStyles();
  const [lixiItem, setLixiItem] = useState<LixiBase>();
  const [exclude, setExclude] = useState(false);
  const { customization, subSchema } = useTypedSelector(
    (state) => state.customizer
  );
  const { excludeItem, includeItem } = useAction();

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
    const path = lixiItem?.path;
    const customiser = new Customiser(customization);
    if (path) {
      setExclude(!!customiser.ExcludedItem(path));
    }
  }, [customization, lixiItem?.path, exclude]);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                icon={<DeleteOutlinedIcon fontSize="small" />}
                checkedIcon={<DeleteTwoToneIcon fontSize="small" />}
                onChange={onExclude}
                checked={exclude}
                name="checkedI"
              />
            }
            label={exclude ? "Excluded" : "Exclude"}
          />
          <Button
            disabled={exclude}
            startIcon={<SettingsOutlinedIcon />}
            variant="contained"
            color="primary"
          >
            Customize
          </Button>
        </FormGroup>
      </div>
      <Divider />
      <CssBaseline />
      <div className={classes.itemLabelDescriptin}>
        <Badge
          color="primary"
          badgeContent={lixiItem?.element.localName.toUpperCase()}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Typography variant="h4">{lixiItem?.label}</Typography>
        </Badge>
        <div>
          {lixiItem?.transactions?.sort().map((t) => {
            if (subSchema.transactionType && subSchema.transactionType === t) {
              return (
                <Chip
                  style={{ margin: "0 0.1rem" }}
                  avatar={<Avatar>{subSchema.transactionType[0]}</Avatar>}
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
              <Chip size="small" color="primary" variant="outlined" label={t} />
            );
          })}
        </div>
        {/* <Chip
          avatar={<Avatar>T</Avatar>}
          color="primary"
          variant="outlined"
          label={lixiItem?.transactions?.sort().join(" ")}
        /> */}
      </div>
      <Typography style={{ padding: "0.1rem 1rem" }} variant="body1">
        {lixiItem?.documentation}
      </Typography>
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
              <Typography color="primary" align="left" variant="h6">
                {`${att}: `}
              </Typography>
              <Typography color="secondary" align="left" variant="body1">
                {lixiItem?.element.getAttribute(att)}
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
      <Divider />

      {lixiItem?.references ? (
        <div>
          <List dense subheader={<ListSubheader>References</ListSubheader>}>
            <Divider />
            {lixiItem.references.map((r, idx) => {
              return (
                <Fragment key={`${idx}_${r}`}>
                  <ListItem component="nav">
                    <Typography variant="body1">{r}</Typography>
                  </ListItem>
                </Fragment>
              );
            })}
          </List>
        </div>
      ) : undefined}
    </div>
  );
};
