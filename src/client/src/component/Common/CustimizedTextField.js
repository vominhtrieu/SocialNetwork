import React from "react";
import { InputBase, TextField } from "@material-ui/core";

export default function CustimizedTextField({
  value,
  variant,
  autofocus,
  onChange,
  onSubmit,
}) {
  const changeText = (e) => {
    onChange(e.target.value);
  };
  const detectKey = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault();
        onSubmit();
    }
  };
  if (!variant || variant === "default")
    return (
      <InputBase
        value={value}
        placeholder="..."
        onChange={changeText}
        onKeyDown={detectKey}
        autoFocus={Boolean(autofocus)}
        multiline
        fullWidth
        rowsMax={3}
        spellCheck={false}
      />
    );
  else if (variant === "textField")
    return (
      <TextField
        value={value}
        placeholder="..."
        onChange={changeText}
        onKeyDown={detectKey}
        autoFocus={Boolean(autofocus)}
        multiline
        fullWidth
        rowsMax={3}
        spellCheck={false}
      />
    );
}
