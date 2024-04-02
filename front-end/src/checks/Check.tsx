import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import Table from "@mui/material/Table";
import { useState, useEffect } from "react";
import { CheckType } from "../types/Check";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCheck from "./AddCheck";
const colums = [
  "Actions",
  "Client",
  "Check Amount",
  "Deposite Date",
  "Deposite Status",
  "Bank Name",
  "Check Number",
];
const URL = "http://localhost:8080/";

export default function Check() {
  const [data, setData] = useState([]);
  const [error, setError] = useState<string | null>(null);

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
  return (
    <div>
      <AddCheck />
      <Table>
        <TableHead>
          <TableRow>
            {colums.map((colum) => {
              return <TableCell key={colum}>{colum}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((Check: CheckType) => {
            const isoDateString = Check.DepositDate;
            const isoDate = new Date(isoDateString);
            const year = isoDate.getFullYear();
            const month = String(isoDate.getMonth() + 1).padStart(2, "0");
            const day = String(isoDate.getDate()).padStart(2, "0");
            const formattedDate = `${year}/${month}/${day}`;
            return (
              <TableRow key={Check.CheckNumber}>
                <TableCell>
                  <EditIcon />
                  <DeleteIcon style={{ color: "red" }} />
                </TableCell>
                <TableCell>{Check.ClientName}</TableCell>
                <TableCell>{Check.CheckAmount}</TableCell>
                <TableCell>{formattedDate}</TableCell>
                <TableCell>{Check.DepositStatus}</TableCell>
                <TableCell>{Check.BankName}</TableCell>
                <TableCell>{Check.CheckNumber}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
