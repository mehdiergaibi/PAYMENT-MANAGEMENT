import React, { useState } from "react";
import { ClientType } from "../types/Client";
import axios from "axios";
import {
    Alert,
  Box,
  Button,
  Container,
  Modal,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

// Modal style
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function EditClientForm({
  client,
  setIsEditing,
  data
}: {
  client: ClientType;
  setIsEditing: Function;
}) {
  // State to hold the edited check data
  const [editCheckData, setEditCheckData] = useState<ClientType>(client);
  // State to manage Snackbar visibility
  const [isOpen, setIsOpen] = useState(false);
  // State to hold error message
  const [addCheckError, setAddCheckError] = useState<string>("");

  // State to indicate if there is an error
  const [isError, setIsError] = useState(false);

  // Function to handle modal close
  const handleClose = () => {
    setIsEditing(false);
  };

  // Function to handle Snackbar close
  const handleCloseSnackbar = () => {
    setIsOpen(false);
  };
  // Function to handle input changes
  const handleChange = (name: string, value: any) => {
    setEditCheckData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // Function to handle edit check operation
  const handleEdit = async () => {
    try {
      const url = `http://localhost:8080/clients/update-client/${editCheckData._id}`;
      const response = await axios.patch<ClientType>(url, editCheckData);

      setIsOpen(true);
      console.log(isOpen);
      data((prevData) => {
        const updatedData = prevData.map((bank: ClientType) =>
          bank._id === editCheckData?._id ? editCheckData : bank
        );
        return updatedData;
      });

      handleClose();
      //console.log("after"+isOpen);
      //setTimeout(() => location.reload(), 3000); // Reload the page after 3 seconds
    } catch (error: any) {
      setIsError(true);
      //setAddCheckError(error.response?.data.message);
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        open={true} // Always open for editing
        onClose={handleClose} // Close modal when editing is canceled
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Container>
            <Typography
              sx={{ width: "100%", marginBottom: 1 }}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              Edit Client
            </Typography>
          </Container>
          <Container>
            <TextField
              type="text"
              id="outlined-basic"
              sx={{ width: "100%", marginBottom: 1 }}
              label="First Name"
              variant="outlined"
              name="firstName"
              value={editCheckData.firstName}
              onChange={(event) => handleChange("firstName", event.target.value)}
            />
          </Container>
          <Container>
            <TextField
              type="text"
              id="outlined-basic"
              sx={{ width: "100%", marginBottom: 1 }}
              label="Last Name"
              variant="outlined"
              name="lastName"
              value={editCheckData.lastName}
              onChange={(event) => handleChange("lastName", event.target.value)}
            />
          </Container>
          <Container>
            <TextField
              type="number"
              id="outlined-basic"
              sx={{ width: "100%", marginBottom: 1 }}
              label="Phone Number"
              variant="outlined"
              name="phoneNumber"
              value={editCheckData.phoneNumber}
              onChange={(event) =>
                handleChange("phoneNumber", event.target.value)
              }
            />
          </Container>
          <Container>
            <TextField
              type="text"
              id="outlined-basic"
              sx={{ width: "100%", marginBottom: 1 }}
              label="Address"
              variant="outlined"
              name="address"
              value={editCheckData.address}
              onChange={(event) => handleChange("address", event.target.value)}
            />
          </Container>
          <Container>
            <TextField
              type="text"
              id="outlined-basic"
              sx={{ width: "100%", marginBottom: 1 }}
              label="Note"
              variant="outlined"
              name="note"
              value={editCheckData.note}
              onChange={(event) => handleChange("note", event.target.value)}
            />
          </Container>
          <Container>
            <Button
              sx={{ marginBottom: 1 }}
              variant="contained"
              disabled={!(editCheckData.firstName && editCheckData.lastName && editCheckData.phoneNumber)}
              onClick={handleEdit}
            >
              Save
            </Button>
            <Button
              onClick={handleClose}
              sx={{ marginBottom: 1, marginLeft: 1 }}
              variant="outlined"
            >
              Cancel
            </Button>
          </Container>
        </Box>
      </Modal>
      <Snackbar
        open={isOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Client updated successfully
        </Alert>
      </Snackbar>
    </div>
  );
}

export default EditClientForm;
