import React, { useEffect } from "react";
import { Container } from "@mui/material";
import NavBar from "../components/NavBar";
import CustomizedTables from "../components/Tab";
import { useStateContext } from "../context/StateContext";

const Main: React.FC = () => {
  const { getUser, user } = useStateContext();

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, getUser]);

  return (
    <>
      <NavBar />
      <Container
        maxWidth="md"
        sx={{
          marginTop: "120px",
        }}
      >
        <CustomizedTables />
      </Container>
    </>
  );
};

export default Main;
