import axios from "axios";
import { useEffect, useState } from "react";
import { ClientType } from "../types/Client";
import { Snackbar } from "@mui/material";
import {
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditClientForm from "./EditClientForm";
import AddClient from "./AddClient";
import SearchClient from "./SearchClient";
import DeleteConfirmation from "../DeleteComfirm";

const columns = ["Full Name", "Phone Number", "Address", "Note", "Actions"];

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
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [checkToDelete, setCheckToDelete] = useState<string | null>(null);
  const handleDeleteConfirmation = () => {
    if (checkToDelete) {
      deleteClient(checkToDelete);
    }
    setCheckToDelete(null); // Reset the checkToDelete state
  };
  const handleDeleteClick = (checkId: string) => {
    setCheckToDelete(checkId);
  };

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
      const searchString = `${client.firstName} ${client.lastName} ${client.address} ${client.phoneNumber} ${client.note} `;
      return searchString.toLowerCase().includes(searchQuery.toLowerCase());
    });
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <AddClient data={setData} />
        <div style={{ marginBottom: 5 }}>
          <SearchClient setSearchQuery={setSearchQuery} />
        </div>
      </div>
      {!error ? (
        <div>
          <TableContainer component={Paper}>
            <Table
              stickyHeader
              sx={{ tablLayout: "fixed", whiteSpace: "nowrap", minWidth: 925 }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column} sx={{ backgroundColor: "#E0E0E0" }}>
                      {column}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filterClients().length == 0 ? (
                  <p style={{ color: "red" }}>Nothing to show</p>
                ) : (
                  filterClients()
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((client: ClientType) => {
                      return (
                        <TableRow hover key={client._id}>
                          <TableCell>{client.firstName} {client.lastName}</TableCell>
                          <TableCell>{client.phoneNumber}</TableCell>
                          <TableCell>{client.address}</TableCell>
                          <TableCell>{client.note}</TableCell>
                          <TableCell>
                            <EditIcon
                              style={{ cursor: "pointer" }}
                              onClick={() => handleEditClick(client)}
                            />
                            <DeleteIcon
                              style={{ color: "red", cursor: "pointer" }}
                              onClick={() => handleDeleteClick(client._id)}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })
                )}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 100]}
              component="div"
              count={filterClients().length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
          {isEditing && selectedCheck && (
            <EditClientForm
              client={selectedCheck}
              setIsEditing={setIsEditing}
              data={setData}
            />
          )}
        </div>
      ) : (
        <h1 style={{ color: "red" }}>Error getting Clients</h1>
      )}
      {isDeleted && (
        <Snackbar
          open={isDeleted}
          autoHideDuration={3000}
          onClose={handleClose}
        >
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
      {checkToDelete && (
        <DeleteConfirmation
          open={!!checkToDelete}
          onClose={() => setCheckToDelete(null)}
          onConfirm={handleDeleteConfirmation} // Handle the deletion action
          page={"Client"}
        />
      )}
    </div>
  );
}

export default Clients;
