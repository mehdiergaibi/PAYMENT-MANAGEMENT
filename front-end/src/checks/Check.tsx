// Check.js
import React, { useState, useEffect } from "react";
import {
  Alert,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import AddCheck from "./AddCheck";
import { CheckType } from "../types/Check";
import EditCheckForm from "./EditCheck";
import SearchCheck from "./Search";
import Chip from "@mui/material/Chip";
import DeleteConfirmation from "../DeleteComfirm";
import LinearProgress from "@mui/material/LinearProgress";
import SortingAndFiltring from "../fiteringAndSorting/SortingAndFiltring";

const columns = [
  "Client",
  "Check Amount",
  "Deposit Date",
  "Deposit Status",
  "Bank Name",
  "Check Number",
  "Actions",
];

const URL = "http://localhost:8080/";

export default function Check() {
  const [data, setData] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCheck, setSelectedCheck] = useState<CheckType | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = React.useState(0);

  const [isDeleting, setIsDeleting] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // total
  const [totalCheckAmount, setTotalCheckAmont] = useState(0);

  const [checkToDelete, setCheckToDelete] = useState<string | null>(null);

  const handleDeleteClick = (checkId: string) => {
    setCheckToDelete(checkId);
  };

  const handleDeleteConfirmation = () => {
    if (checkToDelete) {
      deleteCheck(checkToDelete);
    }
    setCheckToDelete(null); // Reset the checkToDelete state
  };

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

  // Function to filter checks based on search query
  const filterChecks = () => {
    return data.filter((check: CheckType) => {
      const searchString = `${check.ClientName} ${check.CheckAmount} ${check.DepositDate} ${check.DepositStatus} ${check.BankName} ${check.CheckNumber}`;
      return searchString.toLowerCase().includes(searchQuery.toLowerCase());
    });
  };

  useEffect(() => {
    const totalAmount = data.reduce(
      (total, check: CheckType) => total + Number(check.CheckAmount),
      0
    );
    setTotalCheckAmont(totalAmount);
  }, [data]);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <div>
      {isDeleted && (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Check deleted successfully
          </Alert>
        </Snackbar>
      )}
      {!error ? (
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Stack direction="row" spacing={2}>
                <AddCheck data={setData} />
                <div style={{ display: "flex", alignItems: "center" }}>
                  <SearchCheck setSearchQuery={setSearchQuery} />
                </div>
              </Stack>
            </div>
            <div style={{marginRight:"10px"}}>
              <SortingAndFiltring
                setData={setData}
                data={data}
                compo={"check"}
              />
            </div>
          </div>

          <TableContainer component={Paper}>
            <Table
              stickyHeader
              sx={{ tablLayout: "fixed", whiteSpace: "nowrap", minWidth: 925 }}
              aria-label="sticky table"
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
                {filterChecks().length == 0 ? (
                  <h3>Nothing to show</h3>
                ) : (
                  filterChecks()
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((check: CheckType) => {
                      // set total amount

                      const isoDateString = check.DepositDate;
                      const isoDate = new Date(isoDateString);
                      const year = isoDate.getFullYear();
                      const month = String(isoDate.getMonth() + 1).padStart(
                        2,
                        "0"
                      );
                      const day = String(isoDate.getDate()).padStart(2, "0");
                      const formattedDate = `${year}/${month}/${day}`;
                      return (
                        <TableRow hover key={check.CheckNumber}>
                          <TableCell>{check.ClientName}</TableCell>
                          <TableCell>
                            {Number(check.CheckAmount).toLocaleString("en-US")}
                          </TableCell>
                          <TableCell>{formattedDate}</TableCell>
                          <TableCell>
                            {(() => {
                              let chipColor: string = "";
                              if (check.DepositStatus === "Pending") {
                                chipColor = "warning";
                              } else if (check.DepositStatus === "Deposited") {
                                chipColor = "success";
                              } else {
                                chipColor = "error";
                              }
                              return (
                                <Chip
                                  label={check.DepositStatus}
                                  color={chipColor}
                                />
                              );
                            })()}
                          </TableCell>
                          <TableCell>{check.BankName}</TableCell>
                          <TableCell>{check.CheckNumber}</TableCell>
                          <TableCell>
                            <EditIcon
                              style={{ cursor: "pointer" }}
                              onClick={() => handleEditClick(check)}
                            />
                            <DeleteIcon
                              style={{ color: "red", cursor: "pointer" }}
                              onClick={() => handleDeleteClick(check._id)}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })
                )}
                <TableRow>
                  <TableCell
                    align="right"
                    style={{
                      fontWeight: "bold",
                      fontSize: "18px",
                    }}
                  >
                    Total:
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      fontWeight: "bold",
                      fontSize: "18px",
                    }}
                  >
                    {Number(totalCheckAmount).toLocaleString("en-US")} Dhs
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 100]}
              component="div"
              count={filterChecks().length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
          {isEditing && selectedCheck && (
            <EditCheckForm
              check={selectedCheck}
              setIsEditing={setIsEditing}
              data={setData}
            />
          )}
          {checkToDelete && (
            <DeleteConfirmation
              open={!!checkToDelete}
              onClose={() => setCheckToDelete(null)}
              onConfirm={handleDeleteConfirmation} // Handle the deletion action
              page={"Check"}
            />
          )}
        </div>
      ) : (
        /*  <h1 style={{ color: "red" }}>Error getting Checks</h1> */
        <div>
          <LinearProgress sx={{ marginTop: "20px" }} />
        </div>
      )}
    </div>
  );
}
