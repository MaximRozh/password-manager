import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { PasswordItemsI } from "../types/PasswordItemsType";

const initialValues: PasswordItemsI = {
  passwordName: "",
  passwordValue: "",
  link: "",
  id: null,
};

interface AddPasswordProp {
  onClose: () => void;
  onSubmit: (value: PasswordItemsI) => void;
  editMode: PasswordItemsI | null;
}

const AddPassword: React.FC<AddPasswordProp> = ({
  onClose,
  onSubmit,
  editMode,
}) => {
  const [values, setValues] = useState(editMode || initialValues);
  const [showPassword, setShowPassword] = useState(false);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let passwordItem: PasswordItemsI | undefined;
    if (editMode) {
      passwordItem = { ...values };
    } else {
      passwordItem = { ...values, id: new Date().getTime() };
    }
    onSubmit(passwordItem);
    setValues(initialValues);
    onClose();
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <form onSubmit={submitHandler}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          marginBottom: "10px",
        }}
      >
        <TextField
          fullWidth
          placeholder="Password Name"
          name="passwordName"
          label="Password Name"
          required
          onChange={handleChangeInput}
          value={values.passwordName}
        />
        <TextField
          fullWidth
          placeholder="Your Password"
          name="passwordValue"
          label="Password"
          required
          type={showPassword ? "text" : "password"}
          onChange={handleChangeInput}
          value={values.passwordValue}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          placeholder="https://"
          name="link"
          label="Link"
          onChange={handleChangeInput}
          value={values.link}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button variant="contained" type="submit">
          Submit
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </Box>
    </form>
  );
};

export default AddPassword;
