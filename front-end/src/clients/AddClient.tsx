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

function AddClient() {
  const initialClient: ClientType = {
    name: "",
    phoneNumber: "",
    address: "",
    note: "",
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [addClientData, setAddClientData] = useState<ClientType>(initialClient);
  const [addClientError, setAddClientError] = useState<string>("");
  const [openMessage, setOpenMessage] = useState(false);
  const [isError, setIsError] = useState(false);
  const [added, setAdded] = useState(false);

  const addClientHandler = async () => {
    try {
      const url = "http://localhost:8080/clients/add-client";
      const response = await axios.post<ClientType>(url, addClientData);
      //console.log(addCheckData);
      setAddClientData(initialClient);
      setAdded(true);
      handleClose();
      setOpenMessage(true);
      setTimeout(() => location.reload(), 500);
    } catch (error: any) {
      setIsError(true);
      setAddClientError(error.response.data.message);
      //console.log(addCheckError);
    }
  };
  const handleChange = (name: string, value: any) => {
    setAddClientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCloseMessage = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenMessage(false);
  };
  const handleCloseError = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setIsError(false);
  };
  return (
    <div>
      <Button sx={{ margin: 2 }} onClick={handleOpen} variant="contained">
        Add Client
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Container>
            <Typography
              sx={{ marginBottom: 2 }}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              Add Client
            </Typography>
          </Container>
          <Container>
            <TextField
              type="text"
              id="outlined-basic"
              sx={{ width: "100%", marginBottom: 1 }}
              label="Name"
              variant="outlined"
              name="name"
              onChange={(event) => handleChange("name", event.target.value)}
            />
          </Container>
          <Container>
            <TextField
              type="number"
              id="outlined-basic"
              sx={{ width: "100%", marginBottom: 1 }}
              label="Phone Number"
              inputProps={{ min: "1" }}
              variant="outlined"
              name="phoneNumber"
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
              inputProps={{ min: "1" }}
              variant="outlined"
              name="address"
              onChange={(event) => handleChange("address", event.target.value)}
            />
          </Container>
          <Container>
            <TextField
              type="text"
              id="outlined-basic"
              sx={{ width: "100%", marginBottom: 1 }}
              label="Note"
              inputProps={{ min: "1" }}
              variant="outlined"
              name="note"
              onChange={(event) => handleChange("note", event.target.value)}
            />
          </Container>
          <Container>
            <Button
              sx={{ marginBottom: 1 }}
              variant="contained"
              disabled={!(addClientData.name && addClientData.phoneNumber)}
              onClick={addClientHandler}
            >
              Add
            </Button>
            <Button
              sx={{ marginBottom: 1, marginLeft: 1 }}
              onClick={handleClose}
              variant="outlined"
            >
              cancel
            </Button>
          </Container>
        </Box>
      </Modal>
      {added ? (
        <Snackbar
          open={openMessage}
          autoHideDuration={3000}
          onClose={handleCloseMessage}
        >
          <Alert
            onClose={handleCloseMessage}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Check added sucssufuly!!
          </Alert>
        </Snackbar>
      ) : null}
      {isError ? (
        <Snackbar
          open={isError}
          autoHideDuration={3000}
          onClose={handleCloseError}
        >
          <Alert
            onClose={handleCloseError}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {addClientError}
          </Alert>
        </Snackbar>
      ) : null}
    </div>
  );
}

export default AddClient;
