import * as React from 'react';
import {
  Input as BaseInput,
  InputOwnerState,
  InputProps,
  FormControl,
} from '@mui/base';

const Input = React.forwardRef(function Input(
  props: InputProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) {




  return (
    <FormControl error={props?.error}>
      <BaseInput
        {...props}
        slotProps={{
          root: (state: InputOwnerState) => ({
            className: `hover:text-cyan-500 transition-colors ${state.focused ? 'outline-0 ring-2 ring-cyan-500' : ''}
          peer h-full w-full rounded-[7px] border border-blue-gray-200
                        border-t-transparent bg-transparent px-3 py-2.5 font-sans
                        text-sm font-normal text-blue-gray-700 outline outline-0
                        transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200
                        placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900
                        focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50
                        placeholder:opacity-0 focus:placeholder:opacity-100

          `,
          }),
        }}
        ref={ref}
      />
    </FormControl>
  );
});

export default React.memo(Input);
