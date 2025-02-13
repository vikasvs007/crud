import React from "react";
import {
  Box,
  Card,
  CardContent,
  useTheme,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import { useGetNotificationsQuery } from "state/api";

const Notifications = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetNotificationsQuery();

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
    },
    {
      field: "message",
      headerName: "Message",
      flex: 2,
    },
    {
      field: "type",
      headerName: "Type",
      flex: 0.7,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.7,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
      renderCell: (params) => new Date(params.value).toLocaleString(),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="NOTIFICATIONS" subtitle="Manage System Notifications" />
      <Box mt="40px" height="75vh">
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
    </Box>
  );
};

export default Notifications;
