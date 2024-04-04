import { useState, useEffect } from "react";
import { Alert, Snackbar, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import AddCheck from "./AddCheck";
import { CheckType } from "../types/Check";
import EditCheckForm from "./EditCheck";

const columns = [
  "Actions",
  "Client",
  "Check Amount",
  "Deposit Date",
  "Deposit Status",
  "Bank Name",
  "Check Number",
];

const URL = "http://localhost:8080/";

export default function Check() {
  const [data, setData] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Add state for tracking editing mode
  const [selectedCheck, setSelectedCheck] = useState<CheckType | null>(null); // Store the selected check for editing

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Get Checks
  useEffect(() => {
    axios
      .get(`${URL}check`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  // delete checks
  const deleteCheck = (id: string) => {
    axios
      .delete(`${URL}check/delete-check/${id}`)
      .then(() => {
        setData(data.filter((check: CheckType) => check._id !== id));
        setIsDeleted(true);
        handleOpen();
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  // Function to handle edit click
  const handleEditClick = (check: CheckType) => {
    setSelectedCheck(check);
    setIsEditing(true);
  };

  return (
    <div>
      {isDeleted && (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: "100%" }}>
            Check deleted successfully
          </Alert>
        </Snackbar>
      )}
      {!error ? (
        <div>
          <AddCheck />
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column}>{column}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((check: CheckType) => {
                const isoDateString = check.DepositDate;
                const isoDate = new Date(isoDateString);
                const year = isoDate.getFullYear();
                const month = String(isoDate.getMonth() + 1).padStart(2, "0");
                const day = String(isoDate.getDate()).padStart(2, "0");
                const formattedDate = `${year}/${month}/${day}`;
                return (
                  <TableRow key={check.CheckNumber}>
                    <TableCell>
                      <EditIcon style={{ cursor: "pointer" }} onClick={() => handleEditClick(check)} />
                      <DeleteIcon
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => deleteCheck(check._id)}
                      />
                    </TableCell>
                    <TableCell>{check.ClientName}</TableCell>
                    <TableCell>{check.CheckAmount}</TableCell>
                    <TableCell>{formattedDate}</TableCell>
                    <TableCell>{check.DepositStatus}</TableCell>
                    <TableCell>{check.BankName}</TableCell>
                    <TableCell>{check.CheckNumber}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {isEditing && selectedCheck && <EditCheckForm check={selectedCheck}  setIsEditing={setIsEditing} />}
        </div>
      ) : (
        <h1 style={{ color: "red" }}>Error getting Checks</h1>
      )}
    </div>
  );
}

