import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  useTheme,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import { useGetOrdersQuery, useCreateOrderMutation } from "state/api";

const Orders = () => {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [newOrder, setNewOrder] = useState({
    customerName: "",
    productId: "",
    quantity: "",
    status: "pending",
  });

  const { data, isLoading } = useGetOrdersQuery();
  const [createOrder] = useCreateOrderMutation();

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "customerName",
      headerName: "Customer Name",
      flex: 1,
    },
    {
      field: "productId",
      headerName: "Product ID",
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 0.5,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.8,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
      renderCell: (params) => new Date(params.value).toLocaleString(),
    },
  ];

  const handleCreateOrder = async () => {
    try {
      await createOrder(newOrder).unwrap();
      setOpenDialog(false);
      setNewOrder({
        customerName: "",
        productId: "",
        quantity: "",
        status: "pending",
      });
    } catch (error) {
      console.error("Failed to create order:", error);
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="ORDERS" subtitle="List of Orders" />
      <Box mt="40px" height="75vh">
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button
            variant="contained"
            onClick={() => setOpenDialog(true)}
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            Create New Order
          </Button>
        </Box>
        <Card
          sx={{
            height: "100%",
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.primary.light,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <CardContent>
            <DataGrid
              loading={isLoading || !data}
              getRowId={(row) => row._id}
              rows={data || []}
              columns={columns}
              pageSize={20}
              rowsPerPageOptions={[20, 50, 100]}
            />
          </CardContent>
        </Card>
      </Box>

      {/* Create Order Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Create New Order</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Customer Name"
            fullWidth
            value={newOrder.customerName}
            onChange={(e) =>
              setNewOrder({ ...newOrder, customerName: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Product ID"
            fullWidth
            value={newOrder.productId}
            onChange={(e) =>
              setNewOrder({ ...newOrder, productId: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Quantity"
            type="number"
            fullWidth
            value={newOrder.quantity}
            onChange={(e) =>
              setNewOrder({ ...newOrder, quantity: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateOrder} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Orders;
