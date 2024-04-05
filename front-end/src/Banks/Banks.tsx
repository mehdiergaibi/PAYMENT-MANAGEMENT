import axios from "axios";
import { useEffect, useState } from "react";
import { BankType } from "../types/Banks";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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

const URL = "http://localhost:8080/";
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
function Banks() {
  const [data, setData] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState(null);
  const [openMessage, setOpenMessage] = useState(false);
  const [errorEdit, setErrorEdit] = useState(null);
  const [isErrorEdit, setIsErrorEdit] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const [isAddBank, setIsAddBank] = useState(false);
  const [added, setAdded] = useState(false);
  const [addErrors, setAddErrors] = useState(null);
  const [isAddErroe, setIsAddError] = useState(false);
  const initialBank: BankType = {
    name: "",
  };

  const [addBankData, setAddBankData] = useState(initialBank);
  const hadleClose = () => {
    setOpen(false);
  };
  const handleChange = (name: string, value: any) => {
    setAddBankData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {
    axios
      .get(`${URL}banks`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);
  const handelEdit = (bank: BankType) => {
    setSelectedBank(bank);
    setOpen(true);
  };
  const handleEdit = async () => {
    try {
      const url = `http://localhost:8080/banks/update-bank/${selectedBank._id}`;
      const response = await axios.patch<BankType>(url, selectedBank);

      setOpenMessage(true);
      setTimeout(() => location.reload(), 500);

      hadleClose();
      //console.log("after"+isOpen);
      //setTimeout(() => location.reload(), 3000); // Reload the page after 3 seconds
    } catch (error: any) {
      setIsErrorEdit(true);
      setErrorEdit(error.response?.data.message);
      //console.log(error);
    }
  };

  const deleteBank = (id: string) => {
    axios
      .delete(`${URL}banks/delete-bank/${id}`)
      .then(() => {
        setData(data.filter((bank: BankType) => bank._id !== id));
        setDeleted(true);
        //handleOpen();
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  const AddBank = async () => {
    try {
      const url = "http://localhost:8080/banks/add-bank";
      const response = await axios.post<BankType>(url, addBankData);
      setAddBankData(initialBank);
      setAdded(true);
      setIsAddBank(false);
      setOpenMessage(true);
      setTimeout(() => location.reload(), 500);
    } catch (error: any) {
      setAddErrors(error.response.data.message);
      setIsAddError(true)
    }
  };
  return (
    <div style={{ marginTop: "50px", marginBottom: "50px", marginLeft: "2px" }}>
      <Modal
        open={isAddBank}
        onClose={() => setIsAddBank(false)}
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
              Add Bank
            </Typography>
          </Container>
          <Container>
            <TextField
              type="text"
              id="outlined-basic"
              sx={{ width: "100%", marginBottom: 1 }}
              label="Bank"
              variant="outlined"
              name="name"
              onChange={(event) => handleChange("name", event.target.value)}
            />
          </Container>
          <Container>
            <Button
              sx={{ marginBottom: 1 }}
              variant="contained"
              disabled={!addBankData.name}
              onClick={AddBank}
            >
              Add
            </Button>
            <Button
              onClick={() => setIsAddBank(false)}
              sx={{ marginBottom: 1, marginLeft: 1 }}
              variant="outlined"
            >
              Cancel
            </Button>
          </Container>
        </Box>
      </Modal>
      <Snackbar
        open={added}
        autoHideDuration={3000}
        onClose={() => setAdded(false)}
      >
        <Alert
          onClose={() => setAdded(false)}
          severity={isAddErroe ? "error" : "success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {
            isAddErroe ? addErrors : "Bank added sucssufuly!!"
          }
          
        </Alert>
      </Snackbar>
      <Modal
        open={open}
        onClose={hadleClose}
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
              Edit Bank
            </Typography>
          </Container>
          <Container>
            <TextField
              type="text"
              id="outlined-basic"
              sx={{ width: "100%", marginBottom: 1 }}
              label="Bank"
              variant="outlined"
              name="bank"
              value={selectedBank?.name}
              onChange={(event) => handleChange("name", event.target.value)}
            />
          </Container>
          <Container>
            <Button
              sx={{ marginBottom: 1 }}
              variant="contained"
              disabled={!selectedBank?.name}
              onClick={handleEdit}
            >
              Save
            </Button>
            <Button
              onClick={hadleClose}
              sx={{ marginBottom: 1, marginLeft: 1 }}
              variant="outlined"
            >
              Cancel
            </Button>
          </Container>
        </Box>
      </Modal>
      {!error ? (
        <div style={{ maxWidth: "450px", margin: "auto" }}>
          <Button onClick={() => setIsAddBank(true)} variant="contained">
            Add Bank
          </Button>
          {data?.map((bank) => (
            <div
              key={bank.name}
              style={{
                display: "flex",
                marginTop: "10px",
                alignItems: "center",
              }}
            >
              <div>
                <EditIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => handelEdit(bank)}
                />
                <DeleteIcon
                  style={{
                    color: "red",
                    cursor: "pointer",
                    marginLeft: "10px",
                    marginRight: "20px",
                  }}
                  onClick={() => deleteBank(bank._id)}
                />
              </div>

              <h4>{bank.name}</h4>
            </div>
          ))}
        </div>
      ) : (
        <h1 style={{ color: "red" }}>Error geting Banks</h1>
      )}
      <Snackbar
        open={openMessage}
        autoHideDuration={3000}
        onClose={() => setOpenMessage(false)}
      >
        <Alert
          onClose={() => setOpenMessage(false)}
          severity={isErrorEdit ? "error" : "success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {isErrorEdit ? "Error on updatiog bank" : "bank updated successfully"}
        </Alert>
      </Snackbar>
      <Snackbar
        open={deleted}
        autoHideDuration={3000}
        onClose={() => setDeleted(false)}
      >
        <Alert
          onClose={() => setDeleted(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Bank deleted successfully
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Banks;
