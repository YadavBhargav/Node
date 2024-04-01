import React from "react";
import { Field, ErrorMessage } from "formik";
import FormErrorMessage from "../alerts/FormErrorMessage";

const input = ({
  className,
  name,
  defaultValue,
  disabled,
  displayError = true,
  ...rest
}) => {
  return (
    <>
      <Field
        type="text"
        name={name}
        maxLength={255}
        className={`${"block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md"} ${className}`}
        autoComplete="new-password"
        disabled={disabled}
        {...rest}
      />
      {!defaultValue && displayError === true && (
        <ErrorMessage name={name} component={FormErrorMessage} />
      )}
    </>
  );
};

export default input;
