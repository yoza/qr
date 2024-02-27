import React from "react";
import { useMenuButton } from "@mui/base";


const MenuButton = React.forwardRef(function MenuButton(
  props: React.PropsWithChildren<{}>,
  forwardedRef: React.ForwardedRef<HTMLButtonElement>,
) {
  const { getRootProps: getButtonProps } = useMenuButton({ rootRef: forwardedRef });

  return (
    <button type="button" {...props} {...getButtonProps()} className="button" />
  );
});

export default MenuButton;
