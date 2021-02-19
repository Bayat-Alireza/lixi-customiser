import { CircularProgress, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useEffect, useState } from "react";
import { useAction } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypeSelector";
import { parsedXml, XmlUtil } from "../../util/nameSpaces";
import { SubSchemaMenu } from "../sub-schema-menu/SubSchemaMenu";
import { ListboxComponent } from "./listBoxComponent";
import { useStyles } from "./searchPathStyle";
import {UploadFile} from "../upload-file/UploadFile"

export const SearchPath: React.FC = () => {
  const classes = useStyles();
  const { searchItem } = useAction();
  const [options, setOptions] = useState<string[] | null>([]);
  const { data, error, loading } = useTypedSelector((state) => state.item);
  const { transactionType } = useTypedSelector(
    (state) => state.customizer.subSchema
  );
  const _loading = loading || options?.length === 0;

  useEffect(() => {
    const lixiItems = (): Promise<string[]> => {
      return new Promise((resolves, rejects) => {
        const xmlUtile = new XmlUtil(parsedXml);
        if (transactionType) {
          const allPath = xmlUtile.getPathOfAllItemsInATransaction(
            transactionType
          );
          resolves(allPath);
        }
      });
    };

    (async () => {
      setOptions([])
      setOptions(await lixiItems());
    })();
  }, [transactionType]);

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
    
      <div >
        <div style={
          {
            alignItems:"center",
            display:"flex",
            justifyContent:"space-between",
            marginTop:"1rem",
            padding:"0.2rem 0.5rem",
            height:"max-content",
            // width:"max-content",
            backgroundColor:"#fffde7"
        }
          }>
         <UploadFile saveFace={(file:any)=>console.log((file))}/>
        </div>
        <div className={classes.root}>
        <Autocomplete
          id="virtualize-demo"
          onChange={(event, option) => onSubmit(event, option)}
          disableListWrap
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
                    <SubSchemaMenu />
                   
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
