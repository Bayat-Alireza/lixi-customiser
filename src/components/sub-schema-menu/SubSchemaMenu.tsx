import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import React, { useMemo } from "react";
import { useAction } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypeSelector";
import { SubSchema } from "../../redux/actions/customiser-actions";
import { useStyles } from "./subSchemaMenuStyle";


interface SubSchemaMenuProps {
  transactionList: SubSchema[];
}

export const SubSchemaMenu: React.FC<SubSchemaMenuProps> = ({
  transactionList,
}) => {
  const classes = useStyles();
  const { customizeSubSchema,  resetCustomization,  resetItem } = useAction();
  const { subSchema } = useTypedSelector((state) => state.customizer);
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
    resetCustomization();
    resetItem();
    setAnchorEl(null);
  };

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
