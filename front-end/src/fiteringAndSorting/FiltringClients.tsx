import { useEffect, useState } from "react";
import { ClientType } from "../types/Client";
import { Autocomplete, Button, TextField } from "@mui/material";
import LayersClearIcon from "@mui/icons-material/LayersClear";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
const URL = "http://localhost:8080/";

function FiltringClients({
  closeFilter,
  setClient,
  clientData,
}: {
  closeFilter: Function;
  setClient: Function;
  clientData: ClientType[];
}) {
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [selectedPhone, setSelectedPhone] = useState<string | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [allClients, setAllClients] = useState<ClientType[]>([])
  useEffect( () => {
    axios
    .get(`${URL}clients`)
    .then((response) => {
      setAllClients(response.data);
    })
    .catch((error) => {
      console.error("Error fetching clients:", error);
    });
  }, [] )

  useEffect(() => {
    const filteredData = clientData.filter((item) => {
      const clientMatch =
        !selectedClient ||
        `${item.firstName} ${item.lastName}` === selectedClient;
      const phoneMatch = !selectedPhone || item.phoneNumber === selectedPhone;
      const addressMatch = !selectedAddress || item.address === selectedAddress;
      const noteMatch = !selectedNote || item.note === selectedNote;
      return clientMatch && phoneMatch && addressMatch && noteMatch;
    });

    setClient(filteredData);
  }, [selectedClient, selectedPhone, selectedAddress, selectedNote]);

  const clearFilters = () => {
    setClient(allClients); // Reset clientData to initial state
    setSelectedClient(null);
    setSelectedAddress(null);
    setSelectedPhone(null);
    setSelectedNote(null);
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
        options={allClients.map(
          (client) => `${client.firstName} ${client.lastName}`
        )}
        value={selectedClient}
        onChange={(event, newValue) => setSelectedClient(newValue)}
        renderInput={(params) => (
          <TextField {...params} label="Name" sx={{ minWidth: "300px" }} />
        )}
      />
      <Autocomplete
        disablePortal
        options={allClients.map((client) => client.phoneNumber)}
        value={selectedPhone}
        onChange={(event, newValue) => setSelectedPhone(newValue)}
        renderInput={(params) => (
          <TextField {...params} label="Phone Number" sx={{ minWidth: "300px" }} />
        )}
      />
      <Autocomplete
        disablePortal
        options={allClients.map((client) => client.address)}
        value={selectedAddress}
        onChange={(event, newValue) => setSelectedAddress(newValue)}
        renderInput={(params) => (
          <TextField {...params} label="Address" sx={{ minWidth: "300px" }} />
        )}
      />
      <Autocomplete
        disablePortal
        options={allClients.map((client) => client.note)}
        value={selectedNote}
        onChange={(event, newValue) => setSelectedNote(newValue)}
        renderInput={(params) => (
          <TextField {...params} label="Note" sx={{ minWidth: "300px" }} />
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
        Close
      </Button>
    </div>
  );
}

export default FiltringClients;
