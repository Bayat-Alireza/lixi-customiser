import Badge from "@material-ui/core/Badge";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { LixiBase } from "../../../models/LixiBase";
import { SubSchema } from "../../../redux/actions/customiser-actions";
import { Transactions } from "../lixi-item-transactions/Transactions";
import { useStyles } from "./labelDescriptionStyle";

interface ILabelDescription {
  lixiItem: LixiBase | undefined;
  localName: string | undefined;
  subSchema: SubSchema | undefined;
}

export const LabelDescription: React.FC<ILabelDescription> = ({
  lixiItem,
  localName,
  subSchema,
}) => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.itemLabelDescription}>
        <Badge
          color="primary"
          badgeContent={localName}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Typography color="primary" variant="h4">
            {lixiItem?.label}
          </Typography>
        </Badge>
      </div>

      <div style={{ maxWidth: "75ch", marginBottom: "1rem" }}>
        <Typography
          style={{ padding: "0.1rem 1rem" }}
          color="textPrimary"
          variant="body1"
        >
          {lixiItem?.documentation}
        </Typography>
        <Divider />
        <Transactions lixiItem={lixiItem} subSchema={subSchema} />
      </div>
    </div>
  );
};
