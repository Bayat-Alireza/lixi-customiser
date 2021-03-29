import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import RemoveCircleOutlineRoundedIcon from "@material-ui/icons/RemoveCircleOutlineRounded";
import React from "react";
import { useStyles } from "./stringToListBodyStyle";

interface IStringToListBody {
  idx: number;
  remove: (idx: number) => void;
  name: string;
  definition: string;
}

export const StringToListBody: React.FC<IStringToListBody> = ({
  idx,
  remove,
  name,
  definition,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.row}>
        <IconButton
          onClick={() => remove(idx)}
          color="secondary"
          aria-label="delete"
        >
          <RemoveCircleOutlineRoundedIcon fontSize="default" />
        </IconButton>

        <Typography variant="h5" component="h2">
          {name}
        </Typography>
      </div>

      <div>
        <Typography className={classes.definition} color="textSecondary">
          {definition}
        </Typography>
      </div>
      <Divider />
    </div>
  );
};
