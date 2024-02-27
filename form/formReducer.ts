import React, { Dispatch } from "react";
import { SxProps } from "@mui/system";
import { Theme, InputProps } from "@mui/material";

export const UPDATE_FIELD = "UPDATE_FIELD";
export const UPDATE_FORM = "UPDATE_FORM";


export interface FormField {
  value: string;
  type?: string;
  field: string;
  id?: string;
  label?: string;
  pattern?: RegExp | string;
  autoComplete?: string;
  error?: boolean;
  required?: boolean;
  checked?: boolean;
  disabled?: boolean;
  helperText?: string;
  blank?: boolean;
  multiline?: boolean;
  rows?: string;
  maxRows?: string;
  inputProps?: { [arbitrary: string]: any };
  inputRef?: React.Ref<any>;
  InputLabelProps?: { [arbitrary: string]: any };
  file?: File;
  margin?: 'dense' | 'normal' | 'none';
  variant?: "standard" | "filled" | "outlined" | undefined;
  sx?: SxProps<Theme>;
  fullWidth?: boolean;
  InputProps?: Partial<InputProps>;
  placeholder?: string;
  size?: 'small' | 'medium';
}

export interface FormState {
  [key: string]: FormField;
}

export interface FieldData {
  [key: string]: any;
}

export interface FormContext {
  state: FormState;
  dispatch: Dispatch<Action>;
}

type Action =
  | { type: typeof UPDATE_FIELD; field: string; payload?: FormField }
  | { type: typeof UPDATE_FORM; payload: FormState };

export default function formReducer(
  state: FormState,
  action: Action
): FormState {
  switch (action.type) {
    case UPDATE_FIELD:
      return {
        ...state,
        [action.field]: {
          ...state[action.field],
          ...action.payload
        }
      };
    case UPDATE_FORM:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
