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
import { type Client } from "../types/Client";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Client = () => {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});

  const columns = useMemo<MRT_ColumnDef<Client>[]>(
    () => [
      {
        accessorKey: "_id",
        header: "Id",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "name",
        header: "name",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.name,
          helperText: validationErrors?.name,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              name: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: "phoneNumber",
        header: "phoneNumber",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.phoneNumber,
          helperText: validationErrors?.phoneNumber,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              phoneNumber: undefined,
            }),
        },
      },
      {
        accessorKey: "address",
        header: "address",
        muiEditTextFieldProps: {
          required: false,
          error: !!validationErrors?.address,
          helperText: validationErrors?.address,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              address: undefined,
            }),
        },
      },
      {
        accessorKey: "note",
        header: "note",
        muiEditTextFieldProps: {
          required: false,
          error: !!validationErrors?.note,
          helperText: validationErrors?.note,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              note: undefined,
            }),
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
  const handleCreateUser: MRT_TableOptions<Client>["onCreatingRowSave"] =
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
  const handleSaveUser: MRT_TableOptions<Client>["onEditingRowSave"] = async ({
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
  const openDeleteConfirmModal = (row: MRT_Row<Client>) => {
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
        <DialogTitle variant="h3">New Client</DialogTitle>
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
        <DialogTitle variant="h3">Edit Client</DialogTitle>
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
        New Client
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
    mutationFn: async (user: Client) => {
      //console.log(user);
      const createUser = {
        name: user.name,
        phoneNumber: user.phoneNumber,
        address: user.address,
        note: user.note,
      };
      try {
        // Send HTTP POST request to your API endpoint with user data
        const response = await axios.post(
          "http://localhost:8080/clients/add-client",
          createUser
        );
        // Return the created user data
        return <>{response.data}</>;
      } catch (error) {
        console.log(error);
        throw new Error("Failed to create client");
      }
    },
    onMutate: (newUserInfo: Client) => {
      queryClient.setQueryData<Client[]>(
        ["users"],
        (prevUsers: Client[] | undefined) => [
          ...(prevUsers || []),
          newUserInfo, // Use existing ID optimistically
        ]
      );
    },
  });
}

//READ hook (get users from api)
function useGetUsers() {
  return useQuery<Client[]>({
    queryKey: ["users"],
    queryFn: async () => {
      /* await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve(fakeData); */ // to get data from file
      try {
        // get users form real api
        const response = await axios.get<Client[]>(
          "http://localhost:8080/clients"
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
    mutationFn: async (user: Client) => {
      //send api update request here
      //console.log(user);
      try {
        const response = await axios.patch<Client[]>(
          `http://localhost:8080/clients/update-client/${user._id}`,
          user
        ); // Using axios.patch instead of axios.put
        return response.data; // Assuming your backend returns updated user data
      } catch (error) {
        throw new Error("Failed to update user"); // Throw error response data for handling in the mutation
      }
    },
    //client side optimistic update
    onMutate: (newUserInfo: Client) => {
      queryClient.setQueryData(["users"], (prevUsers: any) =>
        prevUsers?.map((prevUser: Client) =>
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
          `http://localhost:8080/clients/delete-client/${userId}`
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
        prevUsers?.filter((user: Client) => user._id !== userId)
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}
const queryClient = new QueryClient();

const ClientTable = () => (
  //Put this with your other react-query providers near root of your app
  <QueryClientProvider client={queryClient}>
    <Client />
  </QueryClientProvider>
);

const validateRequired = (value: string) => !!value.length;

function validateUser(user: Client) {
  return {
    name: !validateRequired(user.name) ? "Client name is Required" : "",
    phoneNumber: !validateRequired(user.phoneNumber)
      ? "Client phone number is Required"
      : "",
  };
}
export default ClientTable;
