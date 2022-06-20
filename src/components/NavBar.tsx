import React from "react";
import {
  AppBar,
  Avatar,
  Button,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/StateContext";

const NavBar: React.FC = () => {
  const { user, logout } = useStateContext();

  return (
    <AppBar position="static" color="inherit">
      <Toolbar
        sx={{
          justifyContent: "space-between",
        }}
      >
        {user ? (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "5px",
                flexWrap: "wrap",
              }}
            >
              <Avatar
                alt={user?.firstName}
                //   src={user.profileObj.imageUrl}
              >
                {user?.firstName.charAt(0)}
              </Avatar>
              <Typography variant="h6">{`${user?.firstName} ${user?.lastName}`}</Typography>
            </Box>
            <Button variant="contained" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <Button
            component={Link}
            to="/login"
            variant="contained"
            color="primary"
          >
            Sign in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
