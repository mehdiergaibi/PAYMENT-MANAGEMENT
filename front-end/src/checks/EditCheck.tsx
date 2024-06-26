import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Alert, Autocomplete, Container, Snackbar } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { CheckType } from "../types/Check";
import axios from "axios";
import { ClientType } from "../types/Client";
import dayjs from "dayjs";

// Array of deposit status options
const depositStatus = ["Pending", "Deposited", "Not Deposited"];

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

const EditCheckForm = ({
  check,
  setIsEditing,
  data,
}: {
  check: CheckType;
  setIsEditing: Function;
}) => {
  // State to hold the edited check data
  const [editCheckData, setEditCheckData] = useState<CheckType>(check);

  // State to hold the list of clients
  const [clients, setClients] = useState<ClientType[]>([]);

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

  // Function to fetch clients data
  const getClients = async () => {
    try {
      const url = "http://localhost:8080/clients";
      const response = await axios.get<ClientType[]>(url);
      setClients(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClients();
  }, []);

  const [getBanks, setGetBanks] = useState([]);
  const URL = "http://localhost:8080/";
  // get banks
  useEffect(() => {
    axios
      .get(`${URL}banks`)
      .then((response) => {
        setGetBanks(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  // Function to handle input changes
  const handleChange = (name: string, value: any) => {
    setEditCheckData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //console.log("before"+isOpen);

  // Function to handle edit check operation
  const handleEdit = async () => {
    try {
      const url = `http://localhost:8080/check/update-check/${editCheckData._id}`;
      const response = await axios.patch<CheckType>(url, editCheckData);

      setIsOpen(true);
      console.log(isOpen);

      data((prevData) => {
        const updatedData = prevData.map((check: CheckType) =>
          check._id === editCheckData._id ? editCheckData : check
        );
        return updatedData;
      });
      handleClose();
      //handleClose();
      //console.log("after"+isOpen);
      //setTimeout(() => location.reload(), 3000); // Reload the page after 3 seconds
    } catch (error: any) {
      setIsError(true);
      //setAddCheckError(error.response?.data.message);
      console.log(error);
    }
  };

  // Formatting DepositDate
  const isoDateString = check.DepositDate;
  const isoDate = new Date(isoDateString);
  const year = isoDate.getFullYear();
  const month = String(isoDate.getMonth() + 1).padStart(2, "0");
  const day = String(isoDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}/${month}/${day}`;

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
              Edit Check
            </Typography>
          </Container>
          {/* Autocomplete for selecting client */}
          <Container>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              value={editCheckData.ClientName}
              options={clients.map((client) => `${client.firstName} ${client.lastName}`)}
              sx={{ width: "100%", marginBottom: 1 }}
              renderInput={(params) => (
                <TextField {...params} label="Clients" />
              )}
              onChange={(event, value) => handleChange("ClientName", value)}
            />
          </Container>
          {/* Text field for check amount */}
          <Container>
            <TextField
              type="number"
              id="outlined-basic"
              sx={{ width: "100%", marginBottom: 1 }}
              label="Check amount"
              variant="outlined"
              name="CheckAmount"
              value={editCheckData.CheckAmount}
              onChange={(event) =>
                handleChange("CheckAmount", event.target.value)
              }
            />
          </Container>
          {/* Date picker for deposit date */}
          <Container>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disablePast
                sx={{ width: "100%", marginBottom: 1 }}
                format="YYYY-MM-DD"
                defaultValue={dayjs(formattedDate)}
                onChange={(date) => handleChange("DepositDate", date)}
              />
            </LocalizationProvider>
          </Container>
          {/* Autocomplete for deposit status */}
          <Container>
            <Autocomplete
              disablePortal
              value={editCheckData.DepositStatus}
              options={depositStatus}
              sx={{ width: "100%", marginBottom: 1 }}
              renderInput={(params) => (
                <TextField {...params} label="Deposit Status" />
              )}
              onChange={(event, value) => handleChange("DepositStatus", value)}
            />
          </Container>
          {/* Autocomplete for bank selection */}
          <Container>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              value={editCheckData.BankName}
              options={getBanks.map((bank) => bank.name)}
              sx={{ width: "100%", marginBottom: 1 }}
              onChange={(event, value) => handleChange("BankName", value)}
              renderInput={(params) => <TextField {...params} label="Bank" />}
            />
          </Container>
          {/* Text field for check number */}
          <Container>
            <TextField
              sx={{ width: "100%", marginBottom: 2 }}
              type="number"
              id="outlined-basic"
              label="Check number"
              variant="outlined"
              name="CheckNumber"
              value={editCheckData.CheckNumber}
              onChange={(event) =>
                handleChange("CheckNumber", event.target.value)
              }
            />
          </Container>
          {/* Save and cancel buttons */}
          <Container>
            <Button
              sx={{ marginBottom: 1 }}
              variant="contained"
              disabled={
                !(
                  editCheckData.ClientName &&
                  editCheckData.CheckAmount &&
                  editCheckData.DepositDate &&
                  editCheckData.DepositStatus &&
                  editCheckData.CheckNumber
                )
              }
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
      {/* Snackbar for displaying success message */}
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
          Check updated successfully
        </Alert>
      </Snackbar>
    </div>
  );
};

export default EditCheckForm;
