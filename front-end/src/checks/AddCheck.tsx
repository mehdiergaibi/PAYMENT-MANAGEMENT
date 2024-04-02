import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Alert, Autocomplete, Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { CheckType } from "../types/Check";
import Snackbar from "@mui/material/Snackbar";


const banks = [
  "AL AKHDAR BANK",
  "AL BARID BANK",
  "ARAB BANK",
  "ATTIJARIWAFA BANK",
  "BANK AL YOUSR",
  "BANK ASSAFA",
  "BANK OF AFRICA",
  "BANQUE CENTRALE POPULAIRE",
  "BMCI",
  "BTI BANK",
  "CDG CAPITAL",
  "CFG BANK",
  "CIH BANK",
  "CITIBANK MAGHREB",
  "CREDIT AGRICOLE DU MAROC",
  "CREDIT DU MAROC",
  "DAR EL AMANE",
  "SOCIÉTÉ GÉNÉRALE MAROC",
  "UMNIA BANK",
];

const depositStatus = ["Pending", "Deposited", "Not Deposited"];

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

const AddCheck = () => {
  const initialCheck: CheckType = {
    ClientName: "",
    CheckAmount: "",
    DepositDate: "",
    DepositStatus: "",
    BankName: "",
    CheckNumber: "",
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [addCheckData, setAddCheckData] = useState<CheckType>(initialCheck);
  const [addCheckError, setAddCheckError] = useState<string>("");
  const [openMessage, setOpenMessage] = useState(false);
  const [isError, setIsError] = useState(false);
  const [added, setAdded] = useState(false);

  const [clients, setClients] = useState([]);

  const getClients = async () => {
    try {
      const url = "http://localhost:8080/clients";
      const response = await axios.get(url);
      const clientArray = response.data;
      setClients(clientArray);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClients();
  }, []);

  const addCheckHandler = async () => {
    try {
      const url = "http://localhost:8080/check/add-check";
      const response = await axios.post<CheckType>(url, addCheckData);
      setAddCheckData(initialCheck);
      setAdded(true);
      handleClose();
      setOpenMessage(true);
    } catch (error) {
      setIsError(true);
      setAddCheckError(error.response.data.message);
      //console.log(addCheckError);
    }
  };

  const handleChange = (name: string, value: any) => {
    setAddCheckData((prevData) => ({
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
      <Button onClick={handleOpen} variant="contained">
        Add Check
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Container>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Check
            </Typography>
          </Container>

          <Container>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={clients.map((client) => client.name)}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Clients" />
              )}
              onChange={(event, value) => handleChange("ClientName", value)}
            />
          </Container>

          <Container>
            <TextField
              type="number"
              id="outlined-basic"
              label="Check amount"
              variant="outlined"
              name="CheckAmount"
              onChange={(event) =>
                handleChange("CheckAmount", event.target.value)
              }
            />
          </Container>

          <Container>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                format="YYYY-MM-DD"
                onChange={(date) => handleChange("DepositDate", date)}
              />
            </LocalizationProvider>
          </Container>

          <Container>
            <Autocomplete
              disablePortal
              onChange={(event, value) => handleChange("DepositStatus", value)}
              id="combo-box-demo"
              value={addCheckData.DepositStatus}
              options={depositStatus}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Deposit Status" />
              )}
            />
          </Container>
          <Container>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={banks}
              sx={{ width: 300 }}
              onChange={(event, value) => handleChange("BankName", value)}
              renderInput={(params) => <TextField {...params} label="banks" />}
            />
          </Container>
          <Container>
            <TextField
              type="number"
              id="outlined-basic"
              label="Check number"
              variant="outlined"
              name="CheckNumber"
              onChange={(event) =>
                handleChange("CheckNumber", event.target.value)
              }
            />
          </Container>

          <Container>
            <Button
              variant="contained"
              disabled={
                !Object.values(addCheckData).every((value) => value !== "")
              }
              onClick={addCheckHandler}
            >
              Add
            </Button>
            <Button onClick={handleClose} variant="outlined">
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
            {addCheckError}
          </Alert>
        </Snackbar>
      ) : null}
    </div>
  );
};

export default AddCheck;
