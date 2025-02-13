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
import { useGetVisitorsQuery } from "state/api";

const Visitors = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetVisitorsQuery();

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "ipAddress",
      headerName: "IP Address",
      flex: 1,
    },
    {
      field: "userAgent",
      headerName: "User Agent",
      flex: 2,
    },
    {
      field: "pageVisited",
      headerName: "Page Visited",
      flex: 1,
    },
    {
      field: "visitDuration",
      headerName: "Visit Duration",
      flex: 1,
      renderCell: (params) => `${Math.round(params.value / 60)} mins`,
    },
    {
      field: "visitedAt",
      headerName: "Visited At",
      flex: 1,
      renderCell: (params) => new Date(params.value).toLocaleString(),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="VISITORS" subtitle="Track Website Visitors" />
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

export default Visitors;
