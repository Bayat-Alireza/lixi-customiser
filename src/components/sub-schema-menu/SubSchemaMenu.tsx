import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import React, { useEffect, useMemo, useState } from "react";
import { useAction } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypeSelector";
import { SubSchema } from "../../redux/actions/customiser-actions";
import { XmlUtil } from "../../util/nameSpaces";
import { useStyles } from "./subSchemaMenuStyle";




export const SubSchemaMenu: React.FC = () => {
  const classes = useStyles();
  const { customizeSubSchema } = useAction();
  const { subSchema } = useTypedSelector((state) => state.customizer);
  const { schema } = useTypedSelector((state) => state.schema);
  const [transactionList, setTransactionList] = useState<SubSchema[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const sortedTransactionList = useMemo(
    () =>
      transactionList?.sort((a, b) => {
        if (a && b && a.transactionType && b.transactionType) {
          return a?.transactionType > b?.transactionType ? 1 : -1;
        }
        return 0;
      }),
    [transactionList]
  );

  const handleClose = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const s = e.currentTarget.innerText.split(" ");
    const subSchema: SubSchema = {
      transactionType: s[0],
      transactionVersion: s[1],
    };
    customizeSubSchema(subSchema);
    setAnchorEl(null);
  };
  useEffect(() => {
    const transaction = (): Promise<
      {
        transactionType: string;
        transactionVersion: string;
      }[]
    > => {
      return new Promise((resolves, rejects) => {
        if (!schema) {
          setTransactionList([]);
          return;
        }
        const xmlUtile = new XmlUtil(schema);
        const transactions = xmlUtile.getTransactions();
        resolves(transactions);
      });
    };

    (async () => {
      setTransactionList(await transaction());
    })();
  }, [schema]);

  return (
    <>
      <Button
        className={classes.menuButton}
        color="primary"
        // disableRipple
        aria-controls="simple-menu"
        fullWidth
        aria-haspopup="true"
        onClick={handleClick}
        variant="contained"
        disabled={transactionList.length ? false : true}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {subSchema?.transactionType && subSchema?.transactionVersion
          ? `${subSchema.transactionType} ${subSchema.transactionVersion}`
          : "Transaction"}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {sortedTransactionList.map(
          ({ transactionType, transactionVersion }) => {
            return (
              <MenuItem
                id={`${transactionType}_${transactionVersion}`}
                key={`${transactionType}_${transactionVersion}`}
                onClick={handleClose}
              >{`${transactionType} ${transactionVersion}`}</MenuItem>
            );
          }
        )}
      </Menu>
    </>
  );
};
