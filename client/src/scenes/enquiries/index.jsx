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
  Email as EmailIcon,
  Phone as PhoneIcon,
} from "@mui/icons-material";
import Header from "components/Header";
import { useGetEnquiriesQuery, useCreateEnquiryMutation } from "state/api";

const Enquiries = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetEnquiriesQuery();
  const [createEnquiry] = useCreateEnquiryMutation();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    status: "new",
  });

  const handleOpenDialog = (enquiry = null) => {
    if (enquiry) {
      setFormData({
        name: enquiry.name,
        email: enquiry.email,
        phone: enquiry.phone,
        subject: enquiry.subject,
        message: enquiry.message,
        status: enquiry.status,
      });
      setSelectedEnquiry(enquiry);
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        status: "new",
      });
      setSelectedEnquiry(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedEnquiry(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      status: "new",
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
      await createEnquiry(formData).unwrap();
      handleCloseDialog();
    } catch (error) {
      console.error("Failed to create enquiry:", error);
    }
  };

  const columns = [
    {
      field: "user_id",
      headerName: "User Details",
      flex: 1.5,
      renderCell: (params) => {
        const email = params.value?.email || params.row.email || "";
        const phone = params.value?.phone || params.row.phone || "";
        return (
          <Box>
            <Typography 
              sx={{ 
                color: theme.palette.secondary[100],
                fontSize: '1rem',
                fontWeight: 'bold',
                mb: 0.5
              }}
            >
              {params.value?.name || params.row.name || "Unknown User"}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              {email && (
                <Box 
                  component="a" 
                  href={`mailto:${email}`}
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    color: theme.palette.secondary[300],
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    '&:hover': {
                      textDecoration: 'underline',
                      color: theme.palette.primary.main
                    }
                  }}
                >
                  <EmailIcon sx={{ fontSize: 18, mr: 0.5 }} />
                  <Typography sx={{ fontSize: '0.9rem' }}>{email}</Typography>
                </Box>
              )}
              {email && phone && (
                <Typography 
                  sx={{ 
                    color: theme.palette.secondary[300],
                    fontSize: '0.9rem',
                    fontWeight: 'bold'
                  }}
                >
                  •
                </Typography>
              )}
              {phone && (
                <Box 
                  component="a" 
                  href={`tel:${phone}`}
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    color: theme.palette.secondary[300],
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    '&:hover': {
                      textDecoration: 'underline',
                      color: theme.palette.primary.main
                    }
                  }}
                >
                  <PhoneIcon sx={{ fontSize: 18, mr: 0.5 }} />
                  <Typography sx={{ fontSize: '0.9rem' }}>{phone}</Typography>
                </Box>
              )}
            </Box>
          </Box>
        );
      },
    },
    {
      field: "message",
      headerName: "Message",
      flex: 2,
      renderCell: (params) => (
        <Typography 
          sx={{ 
            color: theme.palette.secondary[100],
            whiteSpace: "pre-wrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {params.value}
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
          color={params.value === "closed" ? "error" : "success"}
          sx={{ width: 80 }}
        />
      ),
    },
    {
      field: "created_at",
      headerName: "Created At",
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
      <Header title="ENQUIRIES" subtitle="Manage customer enquiries" />
      
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
          Add Enquiry
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
                pageSize={20}
                rowsPerPageOptions={[20, 50, 100]}
                components={{
                  Toolbar: GridToolbar,
                }}
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
              />
            </Box>
          )}
        </CardContent>
      </Card>

      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
          },
        }}
      >
        <DialogTitle>
          {selectedEnquiry ? "Edit Enquiry" : "Create New Enquiry"}
        </DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              mt: 2,
            }}
          >
            <TextField
              name="name"
              label="Name"
              value={formData.name}
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
              name="email"
              label="Email"
              type="email"
              value={formData.email}
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
              name="phone"
              label="Phone"
              value={formData.phone}
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
              name="subject"
              label="Subject"
              value={formData.subject}
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
              name="message"
              label="Message"
              value={formData.message}
              onChange={handleInputChange}
              multiline
              rows={4}
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
              <MenuItem value="new">New</MenuItem>
              <MenuItem value="in progress">In Progress</MenuItem>
              <MenuItem value="resolved">Resolved</MenuItem>
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
            {selectedEnquiry ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Enquiries;
