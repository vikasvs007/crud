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
      field: "ip_address",
      headerName: "IP Address",
      flex: 1,
    },
    {
      field: "location",
      headerName: "Location",
      flex: 1.5,
      renderCell: (params) => 
        `${params.value.city}, ${params.value.country}`,
    },
    {
      field: "visit_count",
      headerName: "Visit Count",
      flex: 0.7,
    },
    {
      field: "last_visited_at",
      headerName: "Last Visit",
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
              rows={(data?.visitors) || []}
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
