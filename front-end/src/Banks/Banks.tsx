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
import SearchBank from "./SearchBank";
import BankCard from "./BankCard";
import DeleteConfirmation from "../DeleteComfirm";

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
  const [selectedBank, setSelectedBank] = useState<BankType | null>(null);
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
    setSelectedBank((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
      //console.log(selectedBank);
      setData((prevData) => {
        const updatedData = prevData.map((bank: BankType) =>
          bank._id === selectedBank?._id ? selectedBank : bank
        );
        return updatedData;
      });
      setOpenMessage(true);
      hadleClose();
      //console.log("after"+isOpen);
    } catch (error: any) {
      setIsErrorEdit(true);
      setErrorEdit(error.response?.data.message);
      //console.log(error);
    }
  };

  const [checkToDelete, setCheckToDelete] = useState<string | null>(null);
  const handleDeleteConfirmation = () => {
    if (checkToDelete) {
      deleteBank(checkToDelete);
    }
    setCheckToDelete(null); // Reset the checkToDelete state
  };
  const handleDeleteClick = (checkId: string) => {
    setCheckToDelete(checkId);
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
      const newBank = response.data; // New bank data received from the API response
      setData((prevData) => [...prevData, newBank]); // Update the state with the new bank data
      setAddBankData(initialBank);
      setAdded(true);
      setIsAddBank(false);
      setOpenMessage(true);
    } catch (error: any) {
      setAddErrors(error.response.data.message);
      setIsAddError(true);
    }
  };

  const [searchQuery, setSearchQuery] = useState("");

  const filterBanks = () => {
    return data.filter((check: BankType) => {
      const searchString = `${check.name} `;
      return searchString.toLowerCase().includes(searchQuery.toLowerCase());
    });
  };

  return (
    <div style={{ marginBottom: "50px", marginLeft: "2px" }}>
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
          {isAddErroe ? addErrors : "Bank added sucssufuly!!"}
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
              name="name"
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
        <div>
          <div style={{ display: "flex" }}>
            <Button
              onClick={() => setIsAddBank(true)}
              variant="contained"
              sx={{ marginTop: "10px", marginLeft: "15px" }}
            >
              Add Bank
            </Button>
            <SearchBank setSearchQuery={setSearchQuery} />
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              alignItems: "center",
              margin: "20px",
              justifyContent: "center",
            }}
          >
            {filterBanks().map((bank: BankType) => (
              <div key={bank.name}>
                {/* <h4>{bank.name}</h4> */}
                <BankCard
                  bank={bank.name}
                  content={
                    <div
                      style={{ position: "absolute", bottom: "0", right: "0" }}
                    >
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
                        onClick={() => handleDeleteClick(bank._id)}
                      />
                    </div>
                  }
                />
              </div>
            ))}
          </div>
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
      {checkToDelete && (
        <DeleteConfirmation
          open={!!checkToDelete}
          onClose={() => setCheckToDelete(null)}
          onConfirm={handleDeleteConfirmation} // Handle the deletion action
          page={"Bank"}
        />
      )}
    </div>
  );
}

export default Banks;
