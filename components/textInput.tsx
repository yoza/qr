import React, { useEffect, useContext, useState } from 'react';
import { FormContext, FormField, UPDATE_FIELD } from "@/form/formReducer";
import { sanitize } from "@/lib/helpers";
import { HelperText, Label } from '@/components/control';
import {
  Input as BaseInput,
  InputOwnerState,
  FormControl,
} from '@mui/base';


interface TextFieldProps {
  context: React.Context<FormContext>;
  props: FormField;

}

const TextInput = React.forwardRef(function Input(
  { context,
    props,
  }: TextFieldProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const { dispatch } = useContext(context);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (props && (props.value !== null || props.type === "number")) {
      setValue(props.value)
    }
  }, [props]);

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: UPDATE_FIELD,
      field: props.field,
      payload: { ...props, value: event.target.value, error: false }
    });
    setValue(event.target.value);
  }

  function onFocus() {
    dispatch({
      type: UPDATE_FIELD,
      field: props.field,
      payload: { ...props, error: false },
    });
  }

  const handleBlur = (field: string) => (
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    const sanitizedValue = props.pattern
      ? sanitize(event.target.value, props.pattern, props.inputProps && props.inputProps.maxLength)
      : event.target.value;
    setValue(sanitizedValue);
    dispatch({
      type: UPDATE_FIELD,
      field,
      payload: { ...props, value: sanitizedValue },
    });
  };

  const additionalProps = {
    value,
    onChange,
    onFocus,
    onBlur: handleBlur(props?.field),
  };

  // eslint-disable-next-line no-unused-vars
  const { rows, maxRows, multiline, error, required, helperText, ...other } = props;

  return (
    <FormControl required={required}
      className="relative"
      error={error}>
      <Label className='block'>{other?.label}</Label>
      <BaseInput
        {...other}
        {...additionalProps}
        slotProps={{
          input: (state: InputOwnerState) => ({
            className:
              `min-w-96 text-sm font-sans font-normal leading-5 px-3 py-2 rounded-lg
               shadow-md shadow-slate-100 dark:shadow-slate-900 focus:shadow-outline-purple dark:focus:shadow-outline-purple
               focus:shadow-lg border border-solid bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-300 focus-visible:outline-0
               ${state.error ? 'border-error' : 'border-slate-300 hover:border-purple-500 dark:hover:border-purple-500 focus:border-purple-500 dark:focus:border-purple-500 dark:border-slate-600'}
               `,
          }),
        }}
        ref={ref}
      />
      <HelperText className='text-sm' {...{ children: helperText }} />
    </FormControl>
  );
});


export default React.memo(TextInput);
