import { FormContext, FieldData, UPDATE_FIELD } from "./formReducer";
import { dateShort } from "@/lib/helpers";

export default function initialForm(data: FieldData, { state, dispatch }: FormContext): boolean {
  Object.entries(data).forEach(entry => {
    const [field, value] = entry;
    if (Object.prototype.hasOwnProperty.call(state, field)) {
      const payload = state[field].type === 'checkbox'
        ? { ...state[field], checked: value }
        : state[field].type === 'date-local'
          ? { ...state[field], value: value ? dateShort(value) : value }
          : state[field].type === 'file'
            ? { ...state[field], value: value, file: undefined}
            : { ...state[field], value: value };
      dispatch({
        type: UPDATE_FIELD,
        field: field,
        payload: payload,
      });
    }
  });
  return false;
}
