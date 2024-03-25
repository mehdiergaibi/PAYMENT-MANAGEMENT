/* import React, { useEffect, useState } from "react"


export const dataCheck = ([]) => {
  const [checks, setChecks] = useState([])

  const fetchCheckData = () => {
    fetch("http://localhost:8080/")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setChecks(data)
      })
  }


  useEffect(() => {
    fetchCheckData()
  }, [])
  return [checks, setChecks];
} 

 */

/* export type Check = {
  _id: string;
  CheckNumber: string;
  CheckAmount: string;
  DepositDate: string;
  BankName: string;
  ClientName: string;
  DepositStatus: string;
}; */
/* export const checks: Check[] = [
  {
    id: "1",
    CheckNumber: "1001",
    CheckAmount: "500.25",
    DepositDate: "2024-03-15",
    BankName: "ABC Bank",
    ClientName: "John Doe",
    DepositStatus: "Pending",
  },
  {
    id: "2",
    CheckNumber: "1001",
    CheckAmount: "750.50",
    DepositDate: "2024-03-16",
    BankName: "XYZ Bank",
    ClientName: "Jane Smith",
    DepositStatus: "Deposited",
  },
  {
    id: "3",
    CheckNumber: "1001",
    CheckAmount: "1000.75",
    DepositDate: "2024-03-17",
    BankName: "DEF Bank",
    ClientName: "Alice Johnson",
    DepositStatus: "Cleared",
  },
  {
    id: "4",
    CheckNumber: "1001",
    CheckAmount: "1200.00",
    DepositDate: "2024-03-18",
    BankName: "GHI Bank",
    ClientName: "Bob Brown",
    DepositStatus: "Pending",
  },
  {
    id: "5",
    CheckNumber: "1001",
    CheckAmount: "850.80",
    DepositDate: "2024-03-19",
    BankName: "JKL Bank",
    ClientName: "Emily Davis",
    DepositStatus: "Deposited",
  },
  {
    id: "6",

    CheckNumber: "1001",
    CheckAmount: "950.00",
    DepositDate: "2024-03-20",
    BankName: "MNO Bank",
    ClientName: "Michael Wilson",
    DepositStatus: "Cleared",
  },
  {
    id: "7",
    CheckNumber: "1001",
    CheckAmount: "600.30",
    DepositDate: "2024-03-21",
    BankName: "PQR Bank",
    ClientName: "Sarah Lee",
    DepositStatus: "Pending",
  },
  {
    id: "8",
    CheckNumber: "1001",
    CheckAmount: "1100.90",
    DepositDate: "2024-03-22",
    BankName: "STU Bank",
    ClientName: "David Martinez",
    DepositStatus: "Deposited",
  },
  {
    id: "9",
    CheckNumber: "1001",
    CheckAmount: "950.75",
    DepositDate: "2024-03-23",
    BankName: "VWX Bank",
    ClientName: "Olivia Taylor",
    DepositStatus: "Cleared",
  },
  {
    id: "10",
    CheckNumber: "1001",
    CheckAmount: "1300.40",
    DepositDate: "2024-03-24",
    BankName: "YZA Bank",
    ClientName: "Daniel Anderson",
    DepositStatus: "Pending",
  },
  {
    id: "11",
    CheckNumber: "1001",
    CheckAmount: "780.60",
    DepositDate: "2024-03-25",
    BankName: "BCD Bank",
    ClientName: "Sophia Garcia",
    DepositStatus: "Deposited",
  },
  {
    id: "12",
    CheckNumber: "1001",
    CheckAmount: "550.25",
    DepositDate: "2024-03-26",
    BankName: "EFG Bank",
    ClientName: "William Clark",
    DepositStatus: "Cleared",
  },
  // Add more objects as needed
]; */

export const banks = [
  "AL AKHDAR BANK",
  "AL BARID BANK",
  "ARAB BANK",
  "ATTIJARIWAFA BANK",
  "BANK AL YOUSR",
  "BANK ASSAFA",
  "BANK OF AFRICA",
  "BANQUE CENTRALE POPULAIRE",
  "BMCI",
  "BTI BANK",
  "CDG CAPITAL",
  "CFG BANK",
  "CIH BANK",
  "CITIBANK MAGHREB",
  "CREDIT AGRICOLE DU MAROC",
  "CREDIT DU MAROC",
  "DAR EL AMANE",
  "SOCIÉTÉ GÉNÉRALE MAROC",
  "UMNIA BANK",
];
export const depositeStatus = ["deposited", "pending", "not deposited"];
