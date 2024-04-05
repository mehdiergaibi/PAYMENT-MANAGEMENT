import axios from "axios";
import { useEffect, useState } from "react";
import { ClientType } from "../types/Client";
import { Snackbar } from "@mui/base";
import {
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditClientForm from "./EditClientForm";
import AddClient from "./AddClient";
import SearchClient from "./SearchClient";

const columns = ["Actions", "Name", "Phone Number", "Address", "Note"];

const URL = "http://localhost:8080/";

function Clients() {
  const [data, setData] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Add state for tracking editing mode
  const [selectedCheck, setSelectedCheck] = useState<ClientType | null>(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Get Cients
  useEffect(() => {
    axios
      .get(`${URL}clients`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  // delete clients
  const deleteClient = (id: string) => {
    axios
      .delete(`${URL}clients/delete-client/${id}`)
      .then(() => {
        setData(data.filter((check: ClientType) => check._id !== id));
        setIsDeleted(true);
        handleOpen();
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  // Function to handle edit click
  const handleEditClick = (check: ClientType) => {
    setSelectedCheck(check);
    setIsEditing(true);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const filterClients = () => {
    return data.filter((client: ClientType) => {
      const searchString = `${client.name} ${client.address} ${client.phoneNumber} ${client.note} `;
      return searchString.toLowerCase().includes(searchQuery.toLowerCase());
    });
  };

  return (
    <div>
      <SearchClient setSearchQuery={setSearchQuery} />
      {!error ? (
        <div>
          <AddClient />
          <TableContainer component={Paper}>
            <Table
              sx={{ tablLayout: "fixed", whiteSpace: "nowrap", minWidth: 925 }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column}>{column}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filterClients().length == 0 ? (
                  <p style={{ color: "red" }}>Not Found</p>
                ) : (
                  filterClients().map((client: ClientType) => {
                    return (
                      <TableRow key={client._id}>
                        <TableCell>
                          <EditIcon
                            style={{ cursor: "pointer" }}
                            onClick={() => handleEditClick(client)}
                          />
                          <DeleteIcon
                            style={{ color: "red", cursor: "pointer" }}
                            onClick={() => deleteClient(client._id)}
                          />
                        </TableCell>
                        <TableCell>{client.name}</TableCell>
                        <TableCell>{client.phoneNumber}</TableCell>
                        <TableCell>{client.address}</TableCell>
                        <TableCell>{client.note}</TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {isEditing && selectedCheck && (
            <EditClientForm
              client={selectedCheck}
              setIsEditing={setIsEditing}
            />
          )}
        </div>
      ) : (
        <h1 style={{ color: "red" }}>Error getting Clients</h1>
      )}
      {isDeleted && (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Client deleted successfully
          </Alert>
        </Snackbar>
      )}
    </div>
  );
}

export default Clients;
