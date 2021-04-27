import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useAction } from "../../../hooks/useActions";
import { LixiBase } from "../../../models/LixiBase";
import { useStyles } from "./attributesTransactionsStyle";

interface IAttributeTransaction {
  lixiItem: LixiBase | undefined;
  type: string | undefined;
}

export const ItemAttributes: React.FC<IAttributeTransaction> = ({
  lixiItem,
  type,
}) => {
  const classes = useStyles();
  const { searchItem } = useAction();
  return (
    <div className={classes.container}>
      <div className={classes.attributes}>
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableBody>
              {lixiItem?.element.getAttributeNames().map((att, idx) => {
                return (
                  <TableRow key={att}>
                    <TableCell size="small" align="right">
                      <Typography
                        color="textSecondary"
                        align="right"
                        variant="body1"
                      >
                        {`${att}:`}
                      </Typography>
                    </TableCell>
                    <TableCell size="small" align="center">
                      <Typography
                        className={
                          att === "type"
                            ? classes.typeAttribute
                            : classes.otherAttribute
                        }
                        color="textPrimary"
                        align="left"
                        variant="body2"
                        onClick={() =>
                          att === "type" && type ? searchItem(type) : undefined
                        }
                      >
                        <strong>{lixiItem?.element.getAttribute(att)}</strong>
                      </Typography>
                      <Typography variant="caption" color="secondary">
                        <em>
                          {att === "type" && /^[a-zA-Z]+List$/.test(type || "")
                            ? "Customisable"
                            : null}
                        </em>
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
              {lixiItem?.baseRestriction ? (
                <TableRow key={lixiItem?.baseRestriction}>
                  <TableCell size="small" align="right">
                    <Typography
                      color="textSecondary"
                      align="right"
                      variant="body1"
                    >
                      base:
                    </Typography>
                  </TableCell>
                  <TableCell size="small" align="center">
                    <Typography
                      className={classes.otherAttribute}
                      color="textPrimary"
                      align="left"
                      variant="body2"
                    >
                      <strong>{lixiItem?.baseRestriction}</strong>
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
