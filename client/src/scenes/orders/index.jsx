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
      field: "user_id",
      headerName: "Customer",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <Typography sx={{ color: theme.palette.secondary[100] }}>
            {params.value?.name || "N/A"}
          </Typography>
          <Typography variant="caption" sx={{ color: theme.palette.secondary[300] }}>
            {params.value?.email || ""}
          </Typography>
        </Box>
      ),
    },
    {
      field: "products",
      headerName: "Products",
      flex: 2,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {params.value.map((product, index) => (
            <Chip
              key={index}
              label={`${product.product_id?.name || product.name || 'Product'} (Qty: ${product.quantity})`}
              variant="outlined"
              sx={{ 
                borderColor: theme.palette.secondary[300],
                color: theme.palette.secondary[100]
              }}
            />
          ))}
        </Box>
      ),
    },
    {
      field: "total_amount",
      headerName: "Total Amount",
      flex: 1,
      renderCell: (params) => (
        <Typography sx={{ color: theme.palette.secondary[100] }}>
          ${params.value.toFixed(2)}
        </Typography>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.8,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={
            params.value === "delivered"
              ? "success"
              : params.value === "shipped"
              ? "primary"
              : "warning"
          }
          sx={{ width: 90 }}
        />
      ),
    },
    {
      field: "created_at",
      headerName: "Order Date",
      flex: 1,
      renderCell: (params) => (
        <Typography sx={{ color: theme.palette.secondary[100] }}>
          {new Date(params.value).toLocaleString()}
        </Typography>
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
              <DataGrid
                loading={isLoading || !data}
                getRowId={(row) => row._id}
                rows={data || []}
                columns={columns}
                pageSize={20}
                rowsPerPageOptions={[20, 50, 100]}
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
