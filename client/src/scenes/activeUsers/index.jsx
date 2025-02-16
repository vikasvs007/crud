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
import { useGetActiveUsersQuery } from "state/api";

const ActiveUsers = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetActiveUsersQuery();

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "user_id",
      headerName: "User",
      flex: 1,
      renderCell: (params) => params.value?.name || "N/A",
    },
    {
      field: "session_duration",
      headerName: "Session Duration",
      flex: 1,
      renderCell: (params) => `${Math.round(params.value / 60)} mins`,
    },
    {
      field: "Location",
      headerName: "Location",
      flex: 1,
    },
    {
      field: "created_at",
      headerName: "Started At",
      flex: 1,
      renderCell: (params) => new Date(params.value).toLocaleString(),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="ACTIVE USERS" subtitle="Monitor Real-time User Activity" />
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
              rows={(data?.activeUsers) || []}
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

export default ActiveUsers;
