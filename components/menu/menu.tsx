import * as React from 'react';
import { useMenu, MenuProvider } from '@mui/base/useMenu';
import { Popper } from '@mui/base/Popper';


const Menu = React.forwardRef(function Menu(
  props: React.ComponentPropsWithoutRef<'ul'>,
  ref: React.Ref<HTMLUListElement>
) {
  const { children, className, ...other } = props;

  const { open, triggerElement, contextValue, getListboxProps } = useMenu({
    listboxRef: ref
  });

  return (
    <Popper open={open} anchorEl={triggerElement} className={`${className}`} placement="bottom-end">
      <ul className="py-2 bg-slate-100 border-1-gray-200 text-gray-900 rounded overflow-visible outline-0 shadow-md" {...other} {...getListboxProps()}>
        <MenuProvider value={contextValue}>{children}</MenuProvider>
      </ul>
    </Popper>
  );
});

export default Menu;
