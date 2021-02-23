import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import React, { useEffect, useMemo, useState } from "react";
import { useAction } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypeSelector";
import { SubSchema } from "../../redux/actions/customiser-actions";
import { 
  // parsedXml,
   XmlUtil } from "../../util/nameSpaces";
// import { useStyles } from "./subSchemaMenuStyle";

export const SubSchemaMenu: React.FC = () => {
  // const classes = useStyles();
  const { 
    customizeSubSchema,
    // resetCustomizeSubSchema 
  }= useAction();
  const { transactionVersion, transactionType } = useTypedSelector(
    (state) => state.customizer.subSchema
  )|| {transactionType:"",transactionVersion:""};
  const { schema } = useTypedSelector((state) => state.schema);
  // const [transaction, setTransaction] = useState<string | undefined>(undefined);
  const [transactionList, setTransactionList] = useState<
    {
      transactionType: string;
      transactionVersion: string;
    }[]
  >([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const sortedTransactionList = useMemo(() => transactionList?.sort((a,b)=>(a.transactionType>b.transactionType)?1:-1),[transactionList])

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
          setTransactionList([])
          // resetCustomizeSubSchema();
          return
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


  useEffect(()=>{

  })
  return (
    <>
      <Button
        // className={classes.menuButton}
        color="primary"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        variant="outlined"
        disabled={transactionList.length ? false : true}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {transactionType && transactionVersion
          ? `${transactionType} ${transactionVersion}`
          : "Transaction"}
      </Button>
      <Menu
        
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {sortedTransactionList.map(({ transactionType, transactionVersion }) => {
          return (
            <MenuItem
              id={`${transactionType}_${transactionVersion}`}
              key={`${transactionType}_${transactionVersion}`}
              onClick={handleClose}
            >{`${transactionType} ${transactionVersion}`}</MenuItem>
          );
        })}
      </Menu>
    </>
  );
};
