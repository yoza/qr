import { maxFileSize } from "@/constants/i18n";
import { FormState, FormField } from "./formReducer";


export default function getFormErrors(form: FormState): FormState {
  let haveErrors: FormState = {};

  const isCheckboxValid = (field: FormField) =>
    field.type === "checkbox" && field.required && !field.checked;

  const isNumberValid = (field: FormField) => field.type === "number" && !Number.isNaN(field.value);

  for (const key in form) {
    if (Object.prototype.hasOwnProperty.call(form, key)) {
      const field = form[key];
      const pattern = (field.type === "date-local" || field.type === "file" || field.type === "email")
        ? new RegExp(`^${field.pattern}$`, "g")
        : new RegExp(`^[${field.pattern}]+$`, "g");

      if (
        (field.required && !field.value && !isNumberValid(field)) ||
        isCheckboxValid(field) ||
        (field.value && field.type !== "checkbox" && field.type !== "file" && !pattern.exec(String(field.value))) ||
        (field.type === "file" && field.file?.type && !pattern.exec(field.file.type)) ||
        (field.file?.size && field.file.size > maxFileSize)
      ) {
        haveErrors = {
          ...haveErrors,
          [key]: {
            ...field,
            error: true
          }
        };
      }
    }
  }
  return haveErrors;
}
