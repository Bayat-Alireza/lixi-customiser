import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useAction } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypeSelector";
import { Customiser } from "../../../models/Customiser";
import { LixiBase } from "../../../models/LixiBase";
import { ItemXMLViewer } from "../../itemXMLViewer/ItemXMLViewer";
import { LixiItem } from "../../lixi-item/LixiItem";
import { SearchPath } from "../../search/SearchPath";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

export const CreateInstructionTab: React.FC<TabPanelProps> = (
  props: TabPanelProps
) => {
  const { children, value, index, ...other } = props;
  const { data } = useTypedSelector((state) => state.item);

  const [itemInstruction, setItemInstruction] = React.useState<Element>();
  const { customization } = useTypedSelector((state) => state.customizer);

  React.useEffect(() => {
    if (!data) return;
    const path = new LixiBase(data)?.path;
    if (path) {
      const newCustomiser = new Customiser(customization, path);
      const customisedItem = newCustomiser?.getCustomisedItem()?.parentElement;
      if (!customisedItem) {
        setItemInstruction(undefined);
        return;
      }
      setItemInstruction(customisedItem);
    }
  }, [customization, data]);

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
          <Typography component="div">
            <SearchPath />
            <Collapse key="lixiItem" in={!!data}>
              {data ? <LixiItem item={data} /> : undefined}
            </Collapse>
            <Collapse key="lixiItemXML" in={!!itemInstruction}>
              {<ItemXMLViewer role="view" itemXML={itemInstruction} />}
            </Collapse>
          </Typography>
        </Box>
      )}
    </div>
  );
};
