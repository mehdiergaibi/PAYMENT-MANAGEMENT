import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CheckType } from "../types/Check";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
function Sorting({
  closeSort,
  setData,
  data,
}: {
  closeSort: Function;
  setData: Function;
  data: CheckType[];
}) {
  // Function to sort checks by amount
  const sortChecksByAmount = () => {
    // Check if currently sorted by amount in descending order
    const sortedDesc = data
      .slice(0)
      .sort((a, b) => Number(b.CheckAmount) - Number(a.CheckAmount));
    const isSortedDesc = JSON.stringify(data) === JSON.stringify(sortedDesc);

    if (isSortedDesc) {
      // If currently sorted by amount in descending order, sort in ascending order
      setData([
        ...data
          .slice(0)
          .sort((a, b) => Number(a.CheckAmount) - Number(b.CheckAmount)),
      ]);
    } else {
      // If not sorted by amount or sorted in ascending order, sort in descending order
      setData([
        ...data
          .slice(0)
          .sort((a, b) => Number(b.CheckAmount) - Number(a.CheckAmount)),
      ]);
    }
  };

  // Function to sort checks by date
  const sortChecksByDate = () => {
    // Check if currently sorted by date in descending order
    const sortedDesc = data
      .slice(0)
      .sort(
        (a, b) =>
          new Date(b.DepositDate).getTime() - new Date(a.DepositDate).getTime()
      );
    const isSortedDesc = JSON.stringify(data) === JSON.stringify(sortedDesc);

    if (isSortedDesc) {
      // If currently sorted by date in descending order, sort in ascending order
      setData([
        ...data
          .slice(0)
          .sort(
            (a, b) =>
              new Date(a.DepositDate).getTime() -
              new Date(b.DepositDate).getTime()
          ),
      ]);
    } else {
      // If not sorted by date or sorted in ascending order, sort in descending order
      setData([
        ...data
          .slice(0)
          .sort(
            (a, b) =>
              new Date(b.DepositDate).getTime() -
              new Date(a.DepositDate).getTime()
          ),
      ]);
    }
  };

  return (
    <div style={{ marginLeft: "10px", marginBottom: "10px", display:"flex", justifyContent:"center" }}>
      <Button
        endIcon={
          JSON.stringify(data) ===
          JSON.stringify(
            data
              .slice(0)
              .sort((a, b) => Number(a.CheckAmount) - Number(b.CheckAmount))
          ) ? (
            <KeyboardArrowDownIcon />
          ) : (
            <KeyboardArrowUpIcon />
          )
        }
        variant="contained"
        onClick={sortChecksByAmount}
        sx={{ cursor: "pointer", marginRight: "10px" }}
      >
        Sort by Amount
      </Button>
      <Button
        endIcon={
          JSON.stringify(data) ===
          JSON.stringify(
            data
              .slice(0)
              .sort(
                (a, b) =>
                  new Date(a.DepositDate).getTime() -
                  new Date(b.DepositDate).getTime()
              )
          ) ? (
            <KeyboardArrowDownIcon />
          ) : (
            <KeyboardArrowUpIcon />
          )
        }
        variant="contained"
        onClick={sortChecksByDate}
        sx={{ cursor: "pointer" }}
      >
        Sort by Date
      </Button>
      <Button
        variant="outlined"
        endIcon={<CloseIcon />}
        sx={{ cursor: "pointer", marginLeft: "10px" }}
        onClick={() => closeSort(false)}
      >
        Close
      </Button>
    </div>
  );
}

export default Sorting;
