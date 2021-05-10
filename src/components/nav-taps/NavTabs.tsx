import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useStyles } from "./navTabsStyle";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box/Box";
import Typography from "@material-ui/core/Typography";
import { VerticalLinearStepper } from "../vertical-stepper/VerticalStepper";
import { ItemXMLViewer } from "../itemXMLViewer/ItemXMLViewer";
import { useTypedSelector } from "../../hooks/useTypeSelector";
// import { SearchPath } from "../search/SearchPath";
// import { LixiItem } from "../lixi-item/LixiItem";
// import { Customiser } from "../../models/Customiser";
// import { LixiBase } from "../../models/LixiBase";
import { CreateInstructionTab } from "./create-instruction/CreateInstruction";
import Toolbar from "@material-ui/core/Toolbar";
import { TabPanel } from "./NavTabPanel";
// import { SubSchemaMenu } from "../sub-schema-menu/SubSchemaMenu";
import { SelectTransactionDialog } from "../select-transaction-dialog/SelectTransactionDialog";

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const NavTabs: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  // const [itemInstruction, setItemInstruction] = React.useState<Element>();
  const { customization, subSchema } = useTypedSelector(
    (state) => state.customizer
  );
  const { schema } = useTypedSelector((state) => state.schema);
  // const { data } = useTypedSelector((state) => state.item);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    if (!subSchema?.transactionType && schema && !open) {
      setOpen(true);
    }
  }, [schema, subSchema?.transactionType, open]);

  // React.useEffect(() => {
  //   console.log("data:", data);
  //   if (!data) return;
  //   const path = new LixiBase(data)?.path;
  //   if (path) {
  //     const newCustomiser = new Customiser(customization, path);
  //     const customisedItem = newCustomiser?.getCustomisedItem()?.parentElement;
  //     console.log("customisedItem", customisedItem);
  //     if (!customisedItem) return;
  //     setItemInstruction(customisedItem);
  //   }
  // }, [customization, data]);

  return (
    <div className={classes.root}>
      <SelectTransactionDialog open={open} handleClose={handleClose} />
      <AppBar className={classes.appBar} position="sticky">
        <Toolbar>
          {subSchema?.transactionType ? (
            <Typography
              onClick={() => setOpen(true)}
              noWrap
              variant="h6"
              style={{ flexGrow: 1, cursor: "pointer" }}
            >
              <em>{`${subSchema?.transactionType} - ${subSchema?.transactionVersion}`}</em>
            </Typography>
          ) : (
            <Typography
              onClick={() => setOpen(true)}
              noWrap
              color="secondary"
              variant="h6"
              style={{ flexGrow: 1, cursor: "pointer" }}
            >
              Transaction?
            </Typography>
          )}

          <Tabs
            centered
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Instruction set up" {...a11yProps(0)} />
            <Tab label="Create Instruction" {...a11yProps(1)} />
            <Tab label="View Instruction" {...a11yProps(2)} />
          </Tabs>
        </Toolbar>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Box>
          <VerticalLinearStepper />
        </Box>
      </TabPanel>

      <CreateInstructionTab value={value} index={1} />

      <TabPanel value={value} index={2}>
        {<ItemXMLViewer itemXML={customization} />}
      </TabPanel>
    </div>
  );
};
