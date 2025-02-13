import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  useTheme,
  Button,
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Chip,
} from "@mui/material";
import {
  DataGrid,
  GridToolbar,
} from "@mui/x-data-grid";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import Header from "components/Header";
import { useGetOrdersQuery, useCreateOrderMutation } from "state/api";

const Orders = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetOrdersQuery();
  const [createOrder] = useCreateOrderMutation();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [formData, setFormData] = useState({
    customerName: "",
    productName: "",
    quantity: "",
    totalAmount: "",
    status: "pending",
  });

  const handleOpenDialog = (order = null) => {
    if (order) {
      setFormData({
        customerName: order.customerName,
        productName: order.productName,
        quantity: order.quantity,
        totalAmount: order.totalAmount,
        status: order.status,
      });
      setSelectedOrder(order);
    } else {
      setFormData({
        customerName: "",
        productName: "",
        quantity: "",
        totalAmount: "",
        status: "pending",
      });
      setSelectedOrder(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedOrder(null);
    setFormData({
      customerName: "",
      productName: "",
      quantity: "",
      totalAmount: "",
      status: "pending",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await createOrder(formData).unwrap();
      handleCloseDialog();
    } catch (error) {
      console.error("Failed to create order:", error);
    }
  };

  const columns = [
    {
      field: "customerName",
      headerName: "Customer Name",
      flex: 1,
      renderCell: (params) => (
        <Typography sx={{ color: "#fff" }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "productName",
      headerName: "Product",
      flex: 1,
      renderCell: (params) => (
        <Typography sx={{ color: "#fff" }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 0.5,
      renderCell: (params) => (
        <Typography sx={{ color: "#fff" }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      flex: 1,
      renderCell: (params) => (
        <Typography sx={{ color: "#fff" }}>
          ${Number(params.value).toFixed(2)}
        </Typography>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.8,
      renderCell: (params) => {
        const getStatusColor = (status) => {
          switch (status.toLowerCase()) {
            case "completed":
              return theme.palette.success.main;
            case "processing":
              return theme.palette.warning.main;
            case "pending":
              return theme.palette.info.main;
            case "shipped":
              return theme.palette.primary.main;
            default:
              return theme.palette.grey[500];
          }
        };

        return (
          <Chip
            label={params.value}
            sx={{
              backgroundColor: getStatusColor(params.value),
              color: "#fff",
              fontWeight: "bold",
            }}
          />
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.7,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton
            onClick={() => handleOpenDialog(params.row)}
            sx={{ color: theme.palette.secondary[300] }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => console.log("Delete", params.row._id)}
            sx={{ color: theme.palette.error.main }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="ORDERS" subtitle="List of all orders" />
      
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{
            backgroundColor: theme.palette.secondary[300],
            color: theme.palette.background.alt,
            "&:hover": {
              backgroundColor: theme.palette.secondary[100],
            },
          }}
        >
          Add Order
        </Button>
      </Box>

      <Card
        sx={{
          backgroundImage: "none",
          backgroundColor: theme.palette.background.alt,
          borderRadius: "0.55rem",
        }}
      >
        <CardContent>
          {isLoading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="60vh"
            >
              <CircularProgress />
            </Box>
          ) : (
            <Box
              height="75vh"
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                  backgroundColor: theme.palette.primary[500],
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: theme.palette.primary[600],
                  color: "#fff",
                  borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: theme.palette.primary[500],
                },
                "& .MuiDataGrid-footerContainer": {
                  backgroundColor: theme.palette.primary[600],
                  color: "#fff",
                  borderTop: "none",
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color: "#fff !important",
                },
                "& .MuiDataGrid-row": {
                  "&:nth-of-type(2n)": {
                    backgroundColor: theme.palette.primary[400],
                  },
                },
              }}
            >
              <DataGrid
                loading={isLoading || !data}
                getRowId={(row) => row._id}
                rows={data || []}
                columns={columns}
                components={{
                  Toolbar: GridToolbar,
                }}
              />
            </Box>
          )}
        </CardContent>
      </Card>

      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
          },
        }}
      >
        <DialogTitle>
          {selectedOrder ? "Edit Order" : "Create New Order"}
        </DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              minWidth: "400px",
              mt: 2,
            }}
          >
            <TextField
              name="customerName"
              label="Customer Name"
              value={formData.customerName}
              onChange={handleInputChange}
              fullWidth
              sx={{
                "& label": { color: theme.palette.secondary[300] },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: theme.palette.secondary[300],
                  },
                },
              }}
            />
            <TextField
              name="productName"
              label="Product Name"
              value={formData.productName}
              onChange={handleInputChange}
              fullWidth
              sx={{
                "& label": { color: theme.palette.secondary[300] },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: theme.palette.secondary[300],
                  },
                },
              }}
            />
            <TextField
              name="quantity"
              label="Quantity"
              type="number"
              value={formData.quantity}
              onChange={handleInputChange}
              fullWidth
              sx={{
                "& label": { color: theme.palette.secondary[300] },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: theme.palette.secondary[300],
                  },
                },
              }}
            />
            <TextField
              name="totalAmount"
              label="Total Amount"
              type="number"
              value={formData.totalAmount}
              onChange={handleInputChange}
              fullWidth
              sx={{
                "& label": { color: theme.palette.secondary[300] },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: theme.palette.secondary[300],
                  },
                },
              }}
            />
            <TextField
              name="status"
              label="Status"
              select
              value={formData.status}
              onChange={handleInputChange}
              fullWidth
              sx={{
                "& label": { color: theme.palette.secondary[300] },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: theme.palette.secondary[300],
                  },
                },
              }}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: "1.25rem" }}>
          <Button onClick={handleCloseDialog} color="error">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              backgroundColor: theme.palette.secondary[300],
              color: theme.palette.background.alt,
              "&:hover": {
                backgroundColor: theme.palette.secondary[100],
              },
            }}
          >
            {selectedOrder ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Orders;
