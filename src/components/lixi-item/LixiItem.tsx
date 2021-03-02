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
  // FormGroup,
  List,
  ListItem,
  ListSubheader,
  // TextField,
  Typography,
} from "@material-ui/core";
// import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
// import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import React, { Fragment, useEffect, useState } from "react";
import { useAction } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypeSelector";
import { Customiser } from "../../models/Customiser";
import { LixiBase } from "../../models/LixiBase";
import { useStyles } from "./lixiItemStyle";
import DoneIcon from "@material-ui/icons/Done";
// import { ItemXMLViewer } from "../itemXMLViewer/ItemXMLViewer";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ListItemText from "@material-ui/core/ListItemText";
// import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
// import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
// import DoneAllOutlinedIcon from '@material-ui/icons/DoneAllOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined';
// import IconButton from "@material-ui/core/IconButton";
import { CustomiseElement } from "../customise-element/CustomiseElement";
import Collapse from "@material-ui/core/Collapse";

interface ItemType {
  item: Element | null | undefined;
}
export const LixiItem: React.FC<ItemType | undefined> = ({ item }) => {
  const classes = useStyles();
  const [openToCustomise,setOpenToCustomise] = useState<boolean>(false)
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
    <Grid container spacing={2}>

    <Grid item xs={12}>
    <Paper style={{marginTop:"0.5rem", padding:"0.5rem 0.5rem"}} >
      <div className={classes.header}>
        {/* <FormGroup row> */}
          <FormControlLabel
            control={
              <Checkbox
                icon={<DoneOutlinedIcon style={{color:"green"}} fontSize="small" />}
                checkedIcon={<CloseOutlinedIcon fontSize="small" />}
                onChange={onExclude}
                checked={exclude}
                name="checkedI"
              />
            }
            label={exclude ? "Excluded" : "Include"}
          />
        {/* <IconButton color="primary" disabled={exclude} aria-label="customise"  size="small">
          <SettingsOutlinedIcon fontSize="large" />
        </IconButton> */}
          <Button
            disabled={exclude}
            onClick={()=> setOpenToCustomise((pre)=>!pre)}
            startIcon={<SettingsOutlinedIcon />}
            variant="contained"
            color="primary"
            size="small"
          >
            Customise
          </Button>
        {/* </FormGroup> */}
      </div>
      <Divider />
      <CssBaseline />
      <div className={classes.itemLabelDescription}>
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
          {lixiItem?.transactions?.sort().map((t, idx) => {
            if (subSchema?.transactionType && subSchema.transactionType === t) {
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
      <div style={{maxWidth:"75ch"}}>
        {/* <TextField 
        variant="standard" 
        label="Documentation"  
        fullWidth multiline 
        rows={2} 
        value={lixiItem?.documentation}
        /> */}
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
    <Grid item xs={12} >
    <Collapse in={openToCustomise}>
    
    <CustomiseElement lixiItem={lixiItem}/>
    </Collapse>
    
      </Grid>
    </Grid>
  );
};
