import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SearchInput from "./SearchInput";
import { Button } from "@mui/material";
import TableItem from "./TableItem";
import BasicModal from "./BasicModal";
import AddPassword from "./AddPassword";
import { useStateContext } from "../context/StateContext";
import { PasswordItemsI } from "../types/PasswordItemsType";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    // width: "100%",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const CustomizedTables: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState<PasswordItemsI | null>(null);
  const { addPassword, user, deletePasswordItem, editPassword } =
    useStateContext();

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(user?.passwordsItems);
  }, [user?.passwordsItems]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lowercasedValue = e.target.value.toLowerCase().trim();

    if (lowercasedValue === "") setData(user?.passwordsItems);

    if (lowercasedValue) {
      const filteredData = user?.passwordsItems.filter((item: PasswordItemsI) =>
        item.passwordName.toLowerCase().includes(lowercasedValue)
      );
      setData(filteredData);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditMode(null);
  };
  const openModal = () => {
    setShowModal(true);
  };

  const submitHandler = (value: PasswordItemsI) => {
    if (editMode) {
      editPassword(value);
    } else {
      addPassword(value);
    }
  };
  const editHandler = (item: PasswordItemsI) => {
    openModal();
    setEditMode(item);
  };
  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          overflowX: "auto",
          marginRight: "auto",
          marginLeft: "auto",
          height: "auto",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell
                sx={{
                  width: "170px",
                }}
              >
                <SearchInput onSearch={handleSearch} />
              </StyledTableCell>
              <StyledTableCell>
                <Button
                  variant="contained"
                  sx={{ width: "115px", padding: "5px", textTransform: "none" }}
                  onClick={openModal}
                >
                  Add Password
                </Button>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row: any) => (
              <TableItem
                key={row.passwordName + row.id}
                item={row}
                deletePasswordItem={deletePasswordItem}
                editHandler={editHandler}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <BasicModal open={showModal} title="Add Password" onClose={closeModal}>
        <AddPassword
          onClose={closeModal}
          onSubmit={submitHandler}
          editMode={editMode}
        />
      </BasicModal>
    </>
  );
};

export default CustomizedTables;
