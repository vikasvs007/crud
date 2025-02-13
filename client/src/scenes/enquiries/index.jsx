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
import { useGetEnquiriesQuery, useCreateEnquiryMutation } from "state/api";

const Enquiries = () => {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [newEnquiry, setNewEnquiry] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    status: "new",
  });

  const { data, isLoading } = useGetEnquiriesQuery();
  const [createEnquiry] = useCreateEnquiryMutation();

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "subject",
      headerName: "Subject",
      flex: 1,
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

  const handleCreateEnquiry = async () => {
    try {
      await createEnquiry(newEnquiry).unwrap();
      setOpenDialog(false);
      setNewEnquiry({
        name: "",
        email: "",
        subject: "",
        message: "",
        status: "new",
      });
    } catch (error) {
      console.error("Failed to create enquiry:", error);
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="ENQUIRIES" subtitle="Manage Customer Enquiries" />
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
            Create New Enquiry
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

      {/* Create Enquiry Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Create New Enquiry</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={newEnquiry.name}
            onChange={(e) =>
              setNewEnquiry({ ...newEnquiry, name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={newEnquiry.email}
            onChange={(e) =>
              setNewEnquiry({ ...newEnquiry, email: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Subject"
            fullWidth
            value={newEnquiry.subject}
            onChange={(e) =>
              setNewEnquiry({ ...newEnquiry, subject: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Message"
            fullWidth
            multiline
            rows={4}
            value={newEnquiry.message}
            onChange={(e) =>
              setNewEnquiry({ ...newEnquiry, message: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateEnquiry} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Enquiries;
