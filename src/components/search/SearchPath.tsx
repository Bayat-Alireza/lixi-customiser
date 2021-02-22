import { CircularProgress, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useEffect, useState } from "react";
import { useAction } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypeSelector";
import { 
  // parsedXml, 
  XmlUtil } from "../../util/nameSpaces";
import { ListboxComponent } from "./listBoxComponent";
import { useStyles } from "./searchPathStyle";

export const SearchPath: React.FC = () => {
  const classes = useStyles();
  // const [selectedItem,setSelectedItem]=useState<string|undefined>()
  const { searchItem } = useAction();
  const [options, setOptions] = useState<string[] | null>([]);
  // const { data, error, loading } = useTypedSelector((state) => state.item);
  const { loading,  schema } = useTypedSelector((state) => state.schema);
  const { transactionType } = useTypedSelector(
    (state) => state.customizer.subSchema
  ) || {transactionType:""};
  const _loading = loading || options?.length === 0;

  useEffect(() => {
    const lixiItems = (): Promise<string[]> => {
      return new Promise((resolves, rejects) => {
        if (!schema) return;;;
        const xmlUtile = new XmlUtil(schema);
        if (transactionType) {
          const allPath = xmlUtile.getPathOfAllItemsInATransaction(
            transactionType
          );
          resolves(allPath);
        }
      });
    };

    (async () => {
      setOptions([]);
      setOptions(await lixiItems());
    })();
  }, [transactionType, schema]);

  const onSubmit = (
    event: React.ChangeEvent<{}> | React.FormEvent<HTMLFormElement>,
    searchText: string | null
  ) => {
    event.preventDefault();
    
    if (searchText) {
      searchItem(searchText);
    }
  };

  
  return (
    <div>
      <div className={classes.root}>
        <Autocomplete
          id="virtualize-demo"
          onChange={(event, option) => onSubmit(event, option)}
          disableListWrap
          // value={selectedItem}
          classes={classes}
          autoComplete={true}
          includeInputInList
          loading={_loading}
          ListboxComponent={
            ListboxComponent as React.ComponentType<
              React.HTMLAttributes<HTMLElement>
            >
          }
          options={options || []}
          renderInput={(params) => (
            <TextField
              {...params}
              style={{ alignItems: "center" }}
              variant="outlined"
              label="LIXI Item Path"
              InputProps={{
                ...params.InputProps,
                fullWidth: true,
                endAdornment: (
                  <React.Fragment>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
          renderOption={(option) => <Typography noWrap>{option}</Typography>}
        />
      </div>
    </div>
  );
};
