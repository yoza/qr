import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { FormControl, Button } from "@mui/base";
import { FormContext, FormField, UPDATE_FIELD } from "@/form/formReducer";


interface AvatarFormField extends FormField {
  name?: string;
}

interface FieldProps {
  context: React.Context<FormContext>;
  props: AvatarFormField;
}

export default function AvatarField({
  context,
  props,
}: FieldProps): React.JSX.Element {
  const { dispatch } = useContext(context);
  const [file, setFile] = useState<File>();
  const [preview, setPreview] = useState("");

  const handleChange = ({
    currentTarget: { files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (files && files.length) {
      const file = Array.from(files)[0]
      setFile(() => file);
      setPreview(() => URL.createObjectURL(file));
      dispatch({
        type: UPDATE_FIELD,
        field: props.field,
        payload: { ...props, value: file.name, file: file }
      });
    }
  }

  useEffect(() => {
    if (props && !props.file?.size && props.value) {
      setPreview(() => `${props.value}`);
    } else if (file) {
      setPreview(() => URL.createObjectURL(file));
    } else {
      setPreview("");
    }
  }, [props, file]);

  return (
    <React.Fragment>
      <div /* style={!preview ? { visibility: "hidden" } : { width: "auto" }} */>
        <FormControl
          // component="fieldset"
          // sx={props.error ? { ...formControl, border: `1px solid ${customPalette.errorColor}` } : { ...formControl }}
          error={props.error}
        >
          <input
            id={props.id}
            onChange={handleChange}
            required={props.required}
            multiple={props.inputProps?.multiple || false}
            accept={props.inputProps?.accept || "image/*"}
            type={props.type || "file"}
            name={props.name}
            hidden
          />
          {preview && (
            <>
              <Button className="overflow-hidden border-white border-2 border-solid rounded-full">
                <label htmlFor={props.id}>
                  <Image
                    src={preview}
                    alt=""
                    title={props.label}
                    width={48}
                    height={48}
                    quality={100}
                    className="object-cover w-12 h-12 text-center indent-[10000px] cursor-pointer"
                  />
                </label>
              </Button>
              <div hidden>
                {file && file.size && `${Number(file.size)}`}
              </div>
            </>
          )}
        </FormControl>
        {props.error && (
          <p className="mx-3.5 text-red-600">
            {props.helperText} {file && file.type && `(${file.type})`}
          </p>
        )}
      </div>
    </React.Fragment>
  );
}

