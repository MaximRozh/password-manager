import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

interface ModalProps {
  onClose: () => void;
  open: boolean;
  title: string;
  children: React.ReactChild;
}

const BasicModal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: 500,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          {title || "title"}
        </Typography>
        {children}
      </Box>
    </Modal>
  );
};

export default BasicModal;
