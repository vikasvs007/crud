import React from "react";
import {
  Box,
  Card,
  CardContent,
  useTheme,
  Typography,
  Grid,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import { useGetUserStatisticsQuery } from "state/api";

const UserStatistics = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetUserStatisticsQuery();

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "loginCount",
      headerName: "Login Count",
      flex: 1,
    },
    {
      field: "totalSessionTime",
      headerName: "Total Session Time",
      flex: 1,
      renderCell: (params) => `${Math.round(params.value / 3600)} hrs`,
    },
    {
      field: "lastLogin",
      headerName: "Last Login",
      flex: 1,
      renderCell: (params) => new Date(params.value).toLocaleString(),
    },
    {
      field: "averageSessionDuration",
      headerName: "Avg Session",
      flex: 1,
      renderCell: (params) => `${Math.round(params.value / 60)} mins`,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="USER STATISTICS" subtitle="Analyze User Behavior" />
      
      {data && !isLoading && (
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: theme.palette.background.alt }}>
              <CardContent>
                <Typography variant="h6" color={theme.palette.secondary[100]}>
                  Total Users
                </Typography>
                <Typography variant="h4" color={theme.palette.secondary[200]}>
                  {data.totalUsers || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: theme.palette.background.alt }}>
              <CardContent>
                <Typography variant="h6" color={theme.palette.secondary[100]}>
                  Active Today
                </Typography>
                <Typography variant="h4" color={theme.palette.secondary[200]}>
                  {data.activeToday || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: theme.palette.background.alt }}>
              <CardContent>
                <Typography variant="h6" color={theme.palette.secondary[100]}>
                  Avg. Session Time
                </Typography>
                <Typography variant="h4" color={theme.palette.secondary[200]}>
                  {Math.round((data.avgSessionTime || 0) / 60)} min
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: theme.palette.background.alt }}>
              <CardContent>
                <Typography variant="h6" color={theme.palette.secondary[100]}>
                  New Users (Today)
                </Typography>
                <Typography variant="h4" color={theme.palette.secondary[200]}>
                  {data.newUsersToday || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

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
              rows={data?.statistics || []}
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

export default UserStatistics;
