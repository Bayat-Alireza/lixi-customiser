import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import React from "react";
import { LixiBase } from "../../../models/LixiBase";
import { SubSchema } from "../../../redux/actions/customiser-actions";
import { useStyles } from "./transactionsStyle";

interface ITransactions {
  lixiItem: LixiBase | undefined;
  subSchema: SubSchema | undefined;
}

export const Transactions: React.FC<ITransactions> = ({
  lixiItem,
  subSchema,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.transactions}>
      {subSchema &&
        lixiItem?.transactions?.sort().map((t, idx) => {
          if (subSchema?.transactionType && subSchema.transactionType !== t) {
            return (
              <span style={{ paddingInline: "0.1rem" }} key={t}>
                <Chip
                  size="small"
                  color="primary"
                  variant="outlined"
                  // clickable
                  label={t}
                />
              </span>
            );
          } else {
            return (
              <span style={{ paddingInline: "0.1rem" }} key={t}>
                <Chip
                  size="small"
                  color="primary"
                  variant="default"
                  // clickable
                  label={t}
                  avatar={<Avatar>{t[0]}</Avatar>}
                />
              </span>
            );
          }
        })}
    </div>
  );
};
