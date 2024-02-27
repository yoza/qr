import { FormState } from "@/form/formReducer";

const defaultMaxLength = 50;
const defaultPattern = /\u0400-\u04FF+0-9a-zA-Z-'":«»а́\(\)\*\. /;
const textPattern = `\u0400-\u04FF\\w\\d-!?()/%:; _—=+#$@*.,“”'"«»<>а́\\r\\n`;
const simpleIDPattern = "0-9a-fA-F-";
const emailPattern = `[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}`;
export const imageTypePattern = `image/png|image/jpg|image/jpeg|image/webp`;


export const ingredientFields: FormState = {
  description: {
    id: "",
    value: "",
    field: "description",
    pattern: textPattern,
    variant: "filled",
    size: "small",
    error: false,
    helperText: "Write description",
    autoComplete: "",
    required: true,
    multiline: true,
    placeholder: "Description",
    rows: "1",
    inputProps: {
      maxLength: 5000,
    },
    type: "text"
  },
  name: {
    id: "",
    value: "",
    field: "name",
    label: "Name",
    pattern: defaultPattern,
    error: false,
    helperText: "Ingredient name",
    autoComplete: "",
    required: false,
    inputProps: {
      maxLength: defaultMaxLength,
    },
    type: "text"
  },
}

/*
export const ingredientList: FormState = {

} */

export const recipeFields: FormState = {
  id: {
    value: "",
    field: "id",
    label: "ID рецепта",
    pattern: simpleIDPattern,
    error: false,
    helperText: "Укажите ID рецепта",
    autoComplete: "",
    required: false,
    type: "text"
  },
  description: {
    value: "",
    field: "description",
    pattern: textPattern,
    variant: "filled",
    size: "small",
    error: false,
    helperText: "Write description",
    autoComplete: "",
    required: true,
    multiline: true,
    placeholder: "Description",
    rows: "1",
    inputProps: {
      maxLength: 5000,
    },
    type: "text"
  },
  name: {
    value: "",
    field: "name",
    label: "Name",
    pattern: defaultPattern,
    error: false,
    helperText: "Recipe name",
    autoComplete: "",
    required: false,
    inputProps: {
      maxLength: defaultMaxLength,
    },
    type: "text"
  },
}

export const searchFields: FormState = {
  search: {
    id: "",
    value: "",
    field: "search",
    pattern: textPattern,
    size: "small",
    error: false,
    helperText: "Search on recipes",
    autoComplete: "",
    required: false,
    placeholder: "Search…",
    inputProps: {
      maxLength: defaultMaxLength,
      'aria-label': 'search'
    },
    type: "text"
  },
}

export const userFields: FormState = {
  name: {
    id: "name",
    value: "",
    field: "name",
    label: "Name",
    pattern: defaultPattern,
    error: false,
    helperText: "User name",
    autoComplete: "",
    required: false,
    inputProps: {
      maxLength: defaultMaxLength,
    },
    type: "text"
  },
  email: {
    id: "email",
    value: "",
    field: "email",
    label: "Email",
    pattern: emailPattern,
    inputProps: {
      maxLength: defaultMaxLength,
    },
    error: false,
    required: true,
    helperText: "Укажите правильный email",
    autoComplete: "email",
    type: "email",
  },
  avatar: {
    id: "avatar",
    value: "",
    field: "avatar",
    type: "file",
    pattern: imageTypePattern,
    error: false,
    required: false,
    label: "Загрузить аватар",
    helperText: "Недопустимый формат или размер файла",
    inputProps: {
      multiple: false,
      accept: "image/*"
    },
    file: new File([""], "empty"),
  },
}

