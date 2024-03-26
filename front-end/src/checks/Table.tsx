import { useMemo, useState } from "react";
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  // createRow,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
  useMaterialReactTable,
} from "material-react-table";
import axios from "axios";

import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { banks, depositeStatus } from "./DataTest";
import { type Check } from "../types/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Example = () => {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});

  const columns = useMemo<MRT_ColumnDef<Check>[]>(
    () => [
      {
        accessorKey: "_id",
        header: "Id",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "CheckNumber",
        header: "Check Number",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.CheckNumber,
          helperText: validationErrors?.CheckNumber,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              CheckNumber: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: "CheckAmount",
        header: "Check Amount",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.CheckAmount,
          helperText: validationErrors?.CheckAmount,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              CheckAmount: undefined,
            }),
        },
      },
      {
        accessorKey: "DepositDate",
        header: "Deposit Date",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.DepositDate,
          helperText: validationErrors?.DepositDate,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              DepositDate: undefined,
            }),
        },
      },
      {
        accessorKey: "BankName",
        header: "Bank Name",
        editVariant: "select",
        editSelectOptions: banks,
        muiEditTextFieldProps: {
          required: true,
          select: true,
          error: !!validationErrors?.BankName,
          helperText: validationErrors?.BankName,
        },
      },
      {
        accessorKey: "ClientName",
        header: "Client Name",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.ClientName,
          helperText: validationErrors?.ClientName,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              ClientName: undefined,
            }),
        },
      },
      {
        accessorKey: "DepositStatus",
        header: "Deposit Status",
        editVariant: "select",
        editSelectOptions: depositeStatus,
        muiEditTextFieldProps: {
          required: true,
          select: true,
          error: !!validationErrors?.DepositStatus,
          helperText: validationErrors?.DepositStatus,
        },
      },
    ],
    [validationErrors]
  );

  //call CREATE hook
  const { mutateAsync: createUser, isPending: isCreatingUser } =
    useCreateUser();
  //call READ hook
  const {
    data: fetchedUsers = [],
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = useGetUsers();
  //call UPDATE hook
  const { mutateAsync: updateUser, isPending: isUpdatingUser } =
    useUpdateUser();
  //call DELETE hook
  const { mutateAsync: deleteUser, isPending: isDeletingUser } =
    useDeleteUser();

  //CREATE action
  const handleCreateUser: MRT_TableOptions<Check>["onCreatingRowSave"] =
    async ({ values, table }) => {
      const newValidationErrors = validateUser(values);
      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors);
        return;
      }
      setValidationErrors({});
      await createUser(values);
      table.setCreatingRow(null); //exit creating mode
    };
  //UPDATE action
  const handleSaveUser: MRT_TableOptions<Check>["onEditingRowSave"] = async ({
    values,
    table,
  }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateUser(values);
    table.setEditingRow(null); //exit editing mode
  };

  //DELETE action
  const openDeleteConfirmModal = (row: MRT_Row<Check>) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(row.original._id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedUsers,
    createDisplayMode: "modal", //default ('row', and 'custom' are also available)
    editDisplayMode: "modal", //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row._id,
    muiToolbarAlertBannerProps: isLoadingUsersError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: "500px",
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUser,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveUser,
    //optionally customize modal content
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Create New User</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),

    //optionally customize modal content
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Edit User</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true); //simplest way to open the create row modal with no default values
          //or you can pass in a row object to set default values with the `createRow` helper function
          // table.setCreatingRow(
          //   createRow(table, {
          //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
          //   }),
          // );
        }}
      >
        Create New User
      </Button>
    ),
    state: {
      isLoading: isLoadingUsers,
      isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
      showAlertBanner: isLoadingUsersError,
      showProgressBars: isFetchingUsers,
    },
  });

  return <MaterialReactTable table={table} />;
};

//CREATE hook (post new user to api)
function useCreateUser() {
  const queryClient = useQueryClient();
  // it neeeeeeeeeeeds userid and client id hahahah
  return useMutation({
    mutationFn: async (user: Check) => {
      console.log(user);
      const createUser = {
        BankName: user.BankName,
        CheckAmount: user.CheckAmount,
        CheckNumber: user.CheckNumber,
        ClientName: user.ClientName,
        DepositDate: user.DepositDate,
        DepositStatus: user.DepositStatus,
      };
      try {
        // Send HTTP POST request to your API endpoint with user data
        const response = await axios.post(
          "http://localhost:8080/check/add-check",
          createUser
        );
        // Return the created user data
        return (
          <>
            {response.data}
          </>
        );
      } catch (error) {
        console.log(error);
        throw new Error("Failed to create user");
      }
    },
    onMutate: (newUserInfo: Check) => {
      queryClient.setQueryData<Check[]>(
        ["users"],
        (prevUsers: Check[] | undefined) => [
          ...(prevUsers || []),
          newUserInfo, // Use existing ID optimistically
        ]
      );
    },
  });
}

//READ hook (get users from api)
function useGetUsers() {
  return useQuery<Check[]>({
    queryKey: ["users"],
    queryFn: async () => {
      /* await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve(fakeData); */ // to get data from file
      try {
        // get users form real api
        const response = await axios.get<Check[]>(
          "http://localhost:8080/check"
        );
        //console.log(response.data);
        return response.data;
      } catch (error) {
        throw new Error("Failed to fetch users");
      }
    },
    refetchOnWindowFocus: false,
  });
}

//UPDATE hook (put user in api)
function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user: Check) => {
      //send api update request here
      //console.log(user);
      try {
        const response = await axios.patch<Check[]>(
          `http://localhost:8080/check/update-check/${user._id}`,
          user
        ); // Using axios.patch instead of axios.put
        return response.data; // Assuming your backend returns updated user data
      } catch (error) {
        throw new Error("Failed to update user"); // Throw error response data for handling in the mutation
      }
    },
    //client side optimistic update
    onMutate: (newUserInfo: Check) => {
      queryClient.setQueryData(["users"], (prevUsers: any) =>
        prevUsers?.map((prevUser: Check) =>
          prevUser._id === newUserInfo._id ? newUserInfo : prevUser
        )
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

//DELETE hook (delete user in api)
function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId: string) => {
      //send api update request here
      /* await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve(); */
      try {
        // Make DELETE request to API endpoint to delete user
        await axios.delete(
          `http://localhost:8080/check/delete-check/${userId}`
        );

        // Simulate delay for demonstration purposes
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return Promise.resolve();
      } catch (error) {
        // Handle error
        return Promise.reject(error);
      }
    },
    //client side optimistic update
    onMutate: (userId: string) => {
      queryClient.setQueryData(["users"], (prevUsers: any) =>
        prevUsers?.filter((user: Check) => user._id !== userId)
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}
const queryClient = new QueryClient();

const ExampleWithProviders = () => (
  //Put this with your other react-query providers near root of your app
  <QueryClientProvider client={queryClient}>
    <Example />
  </QueryClientProvider>
);

const validateRequired = (value: string) => !!value.length;
/* const validateEmail = (email: string) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ); */

function validateUser(user: Check) {
  return {
    CheckNumber: !validateRequired(user.CheckNumber)
      ? "check number is Required"
      : "",
    CheckAmount: !validateRequired(user.CheckAmount)
      ? "Check amount is Required"
      : "",
    DepositDate: !validateRequired(user.DepositDate)
      ? "Deposite date is Required"
      : "",
    BankName: !validateRequired(user.BankName) ? "Bank name is Required" : "",
    ClientName: !validateRequired(user.ClientName)
      ? "Cient name is Required"
      : "",
    DepositStatus: !validateRequired(user.DepositStatus)
      ? "Deposite status is Required"
      : "",
    /*     email: !validateEmail(user.email) ? "Incorrect Email Format" : "",
     */
  };
}
export default ExampleWithProviders;
