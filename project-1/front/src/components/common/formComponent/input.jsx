import React from "react";
import { Field, ErrorMessage } from "formik";

const input = ({ className, name, defaultValue, disabled, ...rest }) => {
  return (
    <>
      <Field
        type="text"
        name={name}
        maxLength={255}
        className={className}
        autoComplete="new-password"
        disabled={disabled}
        {...rest}
      />
    </>
  );
};

export default input;
