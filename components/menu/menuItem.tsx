import React from "react";
import { useMenuItem } from "@mui/base";
import clsx from "clsx";


const MenuItem = React.forwardRef(function MenuItem(
  props: React.ComponentPropsWithoutRef<'li'>,
  ref: React.Ref<any>,
) {
  const { children, onClick, className, ...other } = props;
  const { getRootProps, disabled, focusVisible } = useMenuItem({ rootRef: ref });
  const classes = {
    'focus-visible': focusVisible,
    disabled,
  };

  return (
    <li
      {...other}
      {...getRootProps({ onClick: onClick ?? (() => { }) })}
      className={
        clsx(
          'list-none cursor-default select-none',
          classes, className
        )
      }
    >
      {children}
    </li>
  );
});

export default MenuItem;
