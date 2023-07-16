import { FormControl, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { handleAmountChange } from "../redux/actions";

// Generic component for TextField component (can be based on label props)
const TextFieldComp = () => {
  // value state to store textfield component categories values
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  // Function to handle textfield category value
  const handleChange = (e) => {
    setValue(e.target.value);
    dispatch(handleAmountChange(e.target.value));
  };

  const isError = value.length ? value > 50 : false;
  const errorMessage = value.length
    ? value > 50
      ? "Amount of Questions must be less than or equal to 50."
      : ""
    : "";
  return (
    <Box mt={6} width="100%">
      <FormControl fullWidth size="small">
        <TextField
          error={isError}
          value={value}
          onChange={handleChange}
          variant="outlined"
          id="outlined-error-helper-text"
          label="Amount of Questions"
          type="number"
          size="small"
          helperText={errorMessage}
        />
      </FormControl>
    </Box>
  );
};

export default TextFieldComp;
