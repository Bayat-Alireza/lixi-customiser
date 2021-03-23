import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useStyles } from "./navTapsStype";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box/Box";
import Typography from "@material-ui/core/Typography";
import { VerticalLinearStepper } from "../vertical-stepper/VerticalStepper";
import { ItemXMLViewer } from "../itemXMLViewer/ItemXMLViewer";
import { useTypedSelector } from "../../hooks/useTypeSelector";
import { SearchPath } from "../search/SearchPath";
import { LixiItem } from "../lixi-item/LixiItem";
import { Customiser } from "../../models/Customiser";
import { LixiBase } from "../../models/LixiBase";
import { CreateInstructionTab } from "./create-instruction/CreateInstruction";
// import TabPanel from "@material-ui/lab/TabPanel/TabPanel";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const NavTabs: React.FC = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [itemInstruction, setItemInstruction] = React.useState<Element>();
  const { customization, customisedItem } = useTypedSelector(
    (state) => state.customizer
  );
  const { data } = useTypedSelector((state) => state.item);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    console.log("data:", data);
    if (!data) return;
    const path = new LixiBase(data)?.path;
    if (path) {
      const newCustomiser = new Customiser(customization, path);
      const customisedItem = newCustomiser?.getCustomisedItem()?.parentElement;
      console.log("customisedItem", customisedItem);
      if (!customisedItem) return;
      setItemInstruction(customisedItem);
    }
  }, [customization, data]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
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
      </AppBar>
      <TabPanel value={value} index={0}>
        <Box>
          <VerticalLinearStepper />
        </Box>
      </TabPanel>
      
      <CreateInstructionTab value={value} index={1} />

      {/* <TabPanel value={value} index={1}>
        <SearchPath />
        {data ? <LixiItem item={data} /> : undefined}
        {<ItemXMLViewer itemXML={itemInstruction} />}
      </TabPanel> */}
      <TabPanel value={value} index={2}>
        {<ItemXMLViewer itemXML={customization} />}
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Three
      </TabPanel>
    </div>
  );
};
