import * as React from 'react';
import {
  Button as BaseButton,
  ButtonOwnerState,
  ButtonProps,
} from '@mui/base';


const Button = React.forwardRef(function Button(
  props: ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const { className, ...other } = props;
  return (
    <BaseButton
      {...other}
      slotProps={{
        root: (state: ButtonOwnerState) => ({
          className: `active:scale-[0.99] transition leading-normal transition-colors ${state.focusVisible ? 'shadow-[0_0_0_4px_#ddd6fe]' : ''} ${className}`,
        }),
      }}
      ref={ref}
    />
  );
});

export default React.memo(Button);
