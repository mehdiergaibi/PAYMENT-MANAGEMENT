import { useEffect, useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import { CheckType } from "../types/Check";
import { ClientType } from "../types/Client";
import { BankType } from "../types/Banks";
import LayersClearIcon from '@mui/icons-material/LayersClear';
const URL = "http://localhost:8080/";
const depositStatusOptions = ["Pending", "Deposited", "Not Deposited"];

function Filtering({ closeFilter, setData }: any) {
  const [clients, setClients] = useState<ClientType[]>([]);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [banks, setBanks] = useState<BankType[]>([]);
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [initialData, setInitialData] = useState<CheckType[]>([]);

  useEffect(() => {
    axios
      .get(`${URL}clients`)
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
      });

    axios
      .get(`${URL}banks`)
      .then((response) => {
        setBanks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching banks:", error);
      });

    axios
      .get(`${URL}check`)
      .then((response) => {
        setData(response.data);
        setInitialData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching checks:", error);
      });
  }, []);

  useEffect(() => {
    const filteredData = initialData.filter((item) => {
      const clientMatch = !selectedClient || item.ClientName === selectedClient;
      const bankMatch = !selectedBank || item.BankName === selectedBank;
      const statusMatch =
        !selectedStatus || item.DepositStatus === selectedStatus;
      return clientMatch && bankMatch && statusMatch;
    });

    setData(filteredData);
  }, [selectedClient, selectedBank, selectedStatus]);

  const clearFilters = () => {
    setData(initialData); // Reset data to initial state
    setSelectedClient(null);
    setSelectedBank(null);
    setSelectedStatus(null);
    //closeFilter(false);
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        margin: "10px",
      }}
    >
      <Autocomplete
        disablePortal
        options={clients.map(
          (client) => `${client.firstName} ${client.lastName}`
        )}
        value={selectedClient}
        onChange={(event, newValue) => setSelectedClient(newValue)}
        renderInput={(params) => (
          <TextField {...params} label="Client" sx={{ minWidth: "300px" }} />
        )}
      />
      <Autocomplete
        disablePortal
        options={banks.map((bank) => bank.name)}
        value={selectedBank}
        onChange={(event, newValue) => setSelectedBank(newValue)}
        renderInput={(params) => (
          <TextField {...params} label="Bank" sx={{ minWidth: "300px" }} />
        )}
      />
      <Autocomplete
        disablePortal
        options={depositStatusOptions}
        value={selectedStatus}
        onChange={(event, newValue) => setSelectedStatus(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Deposit Status"
            sx={{ minWidth: "300px" }}
          />
        )}
      />
      <Button
        variant="outlined"
        endIcon={<LayersClearIcon />}
        sx={{ cursor: "pointer" }}
        onClick={clearFilters}
      >
        Clear
      </Button>
      <Button
        variant="outlined"
        endIcon={<CloseIcon />}
        sx={{ cursor: "pointer" }}
        onClick={() => closeFilter(false)}
      >
        close
      </Button>
    </div>
  );
}

export default Filtering;
