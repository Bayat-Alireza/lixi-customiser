import React from "react";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import { useStyles } from "./breadCrumbsStyle";
import { useAction } from "../../hooks/useActions";
import IconButton from "@material-ui/core/IconButton";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import Paper from "@material-ui/core/Paper";

interface BreadCrumbsType {
  pathSections: string[] | undefined;
  iconClickHandler: () => void;
}

export const IconBreadcrumbs: React.FC<BreadCrumbsType> = (
  props: BreadCrumbsType
) => {
  const classes = useStyles();
  const { searchItem } = useAction();
  const handleClick = (
    event: React.MouseEvent<HTMLParagraphElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (!props.pathSections?.length) return;
    const pathArr = [...props.pathSections];
    const index = props.pathSections.indexOf(event.currentTarget.innerHTML);
    if (index === 0) {
      console.log("i'm here");
      searchItem("Package");
      return;
    }
    if (!index) return;
    for (let i = pathArr.length; i > index + 1; i--) {
      pathArr?.pop();
    }
    searchItem(pathArr?.join("."));
  };

  return (
    <Paper className={classes.root}>
      <Breadcrumbs
        separator={<ArrowForwardIosIcon className={classes.icon} />}
        aria-label="breadcrumb"
      >
        {props.pathSections?.map((section, idx) => {
          return (
            <Typography
              onClick={(
                e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
              ) => handleClick(e)}
              color="textSecondary"
              key={idx}
              className={classes.link}
            >
              {section}
            </Typography>
          );
        })}
        <IconButton
          onClick={props.iconClickHandler}
          aria-label="delete"
          className={classes.leafLink}
          size="medium"
        >
          <FindInPageIcon fontSize="inherit" />
        </IconButton>
      </Breadcrumbs>
    </Paper>
  );
};
