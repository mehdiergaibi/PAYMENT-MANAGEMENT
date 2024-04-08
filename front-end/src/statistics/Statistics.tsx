import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import axios from "axios";
import { useEffect, useState } from "react";
import { CheckType } from "../types/Check";

const size = {
  width: 600,
  height: 350,
};
const URL = "http://localhost:8080/";

function Statistics() {
  const [dataStatus, setDataStatus] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${URL}check`)
      .then((response) => {
        const theDataStatus = response.data.map(
          (status: CheckType) => status.DepositStatus
        );
        setDataStatus(theDataStatus);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  const countPending = dataStatus.filter(
    (pending) => pending === "Pending"
  ).length;
  const countDeposited = dataStatus.filter(
    (deposited) => deposited === "Deposited"
  ).length;
  const countNotDeposited = dataStatus.filter(
    (noteDeposited) => noteDeposited === "Not Deposited"
  ).length;

  const data = [
    { value: countPending, label: "Pending" },
    { value: countDeposited, label: "Deposited" },
    { value: countNotDeposited, label: "Not Deposited" },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        marginTop: "20px",
      }}
    >
      <PieChart
        series={[
          {
            arcLabel: (item) => `${item.label} (${item.value})`,
            arcLabelMinAngle: 45,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            data,
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: "white",
            fontWeight: "bold",
            cursor:"pointer"
          },
        }}
        {...size}
      />
    </div>
  );
}

export default Statistics;
