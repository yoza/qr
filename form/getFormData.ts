import { FormState, FieldData } from "./formReducer";

export default function getFormData(form: FormState): FieldData {
  let data: FieldData = {};
  for (const key in form) {
    if (Object.prototype.hasOwnProperty.call(form, key)) {
      const field = form[key];
      if (field.value || field.type === 'checkbox') {
        data = {
          ...data,
          [key]: field.type !== 'checkbox' ? field.type !== "file" ? field.value : field.file : field.checked
        };
      }
    }
  }
  return data;
}
