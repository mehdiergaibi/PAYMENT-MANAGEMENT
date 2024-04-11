import { Button, Stack } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SortIcon from "@mui/icons-material/Sort";
import { useState } from "react";
import FiltringClients from "./FiltringClients";
import Filtering from "./Filtering";
import Sorting from "./Sorting";
import { CheckType } from "../types/Check";
import { ClientType } from "../types/Client";

function SortingAndFiltring({
  setData,
  data,
  clientData,
  setClient,
  compo,
}: {
  setData: Function;
  data: CheckType[];
  clientData: ClientType[];
  setClient: Function;
  compo: string;
}) {
  // state to manage opening/closing the filter and sort options
  const [openFilter, setOpenFilter] = useState(false);
  const [openSort, setOpenSort] = useState(false);

  // Function to toggle the filter options
  const toggleFilter = () => {
    setOpenFilter(!openFilter);
  };

  // Function to toggle the sort options
  const toggleSort = () => {
    setOpenSort(!openSort);
  };

  return (
    <div>
      <Stack
        direction="row"
        spacing={2}
        sx={{ marginLeft: "20px", marginBottom: "10px" }}
      >
        <Button
          variant="outlined"
          startIcon={<FilterAltIcon />}
          onClick={toggleFilter}
        >
          Filter
        </Button>
        {compo === "check" && (
          <Button
            variant="outlined"
            startIcon={<SortIcon />}
            onClick={toggleSort}
          >
            Sort
          </Button>
        )}
      </Stack>

      {/* Render the filtering component based on the compo prop */}
      {openFilter && compo === "client" && (
        <div>
          <FiltringClients
            clientData={clientData}
            setClient={setClient}
            closeFilter={setOpenFilter}
          />
        </div>
      )}
      {openFilter && compo === "check" && (
        <Filtering data={data} setData={setData} closeFilter={setOpenFilter} />
      )}

      {/* Render the sorting component if openSort state is true */}
      {openSort && (
        <Sorting closeSort={setOpenSort} data={data} setData={setData} />
      )}
    </div>
  );
}

export default SortingAndFiltring;
