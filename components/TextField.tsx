import React, { useContext, useEffect, useState, memo } from "react";
import { FormContext, FormField, UPDATE_FIELD } from "@/form/formReducer";
import { sanitize } from "@/lib/helpers";
import MuiTextField from "@mui/material/TextField";


interface TextFieldProps {
  context: React.Context<FormContext>;
  props: FormField;
}

function TextField({
  context,
  props,
}: TextFieldProps): React.JSX.Element {
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
    helperText: props.error ? props.helperText : "",
    value,
    onChange,
    onFocus,
    onBlur: handleBlur(props?.field),
  };

  return <MuiTextField {...props} {...additionalProps} />;
}

export default memo(TextField);
