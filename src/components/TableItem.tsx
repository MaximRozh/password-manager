import {
  TableRow,
  TableCell,
  IconButton,
  Input,
  Stack,
  Link,
} from "@mui/material";
import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { PasswordItemsI } from "../types/PasswordItemsType";

interface TableItemProp {
  item: PasswordItemsI;
  deletePasswordItem: (id: number | null) => void;
  editHandler: (item: PasswordItemsI) => void;
}

const TableItem: React.FC<TableItemProp> = ({
  item,
  deletePasswordItem,
  editHandler,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        <Link href={item?.link}> {item?.passwordName}</Link>
      </TableCell>

      <TableCell align="right">
        <Input
          value={item?.passwordValue}
          type={showPassword ? "text" : "password"}
          disableUnderline
          inputProps={{
            readOnly: true,
          }}
        />
        <IconButton onClick={handleShowPassword}>
          {showPassword ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </TableCell>
      <TableCell align="right">
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={1}
        >
          <IconButton aria-label="edit" onClick={() => editHandler(item)}>
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => deletePasswordItem(item.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      </TableCell>
    </TableRow>
  );
};

export default TableItem;
