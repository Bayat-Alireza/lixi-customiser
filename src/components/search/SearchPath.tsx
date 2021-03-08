import { CircularProgress, Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useEffect, useState } from "react";
import { useAction } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypeSelector";
import { LixiBase } from "../../models/LixiBase";
import { XmlUtil } from "../../util/nameSpaces";
import { IconBreadcrumbs } from "../breadCrumbs/breadCrumbsComponent";
import { ListboxComponent } from "./listBoxComponent";
import { useStyles } from "./searchPathStyle";

export const SearchPath: React.FC = () => {
  const classes = useStyles();
  const { searchItem } = useAction();
  // const [path, setPath] = useState<string>();
  const [options, setOptions] = useState<string[] | null>([]);
  const [showSearchBox, setShowSearchBox] = useState<boolean>(true);
  const { loading, schema } = useTypedSelector((state) => state.schema);
  const { data } = useTypedSelector((state) => state.item);
  const { subSchema } = useTypedSelector((state) => state.customizer);
  const _loading = loading || options?.length === 0;

  const path = React.useMemo(() => {
    if (!data) return;
    const newItem = new LixiBase(data);
    return newItem?.path;
  }, [data]);
  useEffect(() => {
    const lixiItems = (): Promise<string[]> => {
      return new Promise((resolves, rejects) => {
        if (!schema) return;
        const xmlUtile = new XmlUtil(schema);
        if (subSchema?.transactionType) {
          const allPath = xmlUtile.getPathOfAllItemsInATransaction(
            subSchema.transactionType
          );
          resolves(allPath);
        }
      });
    };

    (async () => {
      setOptions([]);
      setOptions(await lixiItems());
    })();
  }, [subSchema?.transactionType, schema]);

  const onSubmit = (
    event: React.ChangeEvent<{}> | React.FormEvent<HTMLFormElement>,
    searchText: string | null
  ) => {
    event.preventDefault();

    if (searchText) {
      searchItem(searchText);
      setShowSearchBox(false);
    }
  };

  return (
    <div>
      <div>
        {showSearchBox ? (
          <Slide
            direction="down"
            in={showSearchBox}
            mountOnEnter
            unmountOnExit
            {...(showSearchBox ? { timeout: 500 } : {})}
          >
            <Paper className={classes.root}>
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
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
                renderOption={(option) => (
                  <Typography noWrap>{option}</Typography>
                )}
              />
            </Paper>
          </Slide>
        ) : (
          <IconBreadcrumbs
            iconClickHandler={() => setShowSearchBox(true)}
            pathSections={path?.split(".")}
          />
        )}
      </div>
    </div>
  );
};
