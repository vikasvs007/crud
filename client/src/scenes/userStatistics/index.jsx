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
      field: "user_id",
      headerName: "User",
      flex: 1,
      renderCell: (params) => params.value?.name || "N/A",
    },
    {
      field: "pages_visited",
      headerName: "Pages Visited",
      flex: 1.5,
      renderCell: (params) => (
        <div>
          {params.value.map((page, index) => (
            <div key={index}>
              {page.page_name}: {page.visit_count} visits
            </div>
          ))}
        </div>
      ),
    },
    {
      field: "total_time_spent",
      headerName: "Total Time",
      flex: 1,
      renderCell: (params) => `${Math.round(params.value / 3600)} hrs`,
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
                  {data.statistics?.totalUsers || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: theme.palette.background.alt }}>
              <CardContent>
                <Typography variant="h6" color={theme.palette.secondary[100]}>
                  Total Page Views
                </Typography>
                <Typography variant="h4" color={theme.palette.secondary[200]}>
                  {data.statistics?.totalPageViews || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: theme.palette.background.alt }}>
              <CardContent>
                <Typography variant="h6" color={theme.palette.secondary[100]}>
                  Avg. Time Spent
                </Typography>
                <Typography variant="h4" color={theme.palette.secondary[200]}>
                  {Math.round((data.statistics?.avgTimeSpent || 0) / 60)} min
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: theme.palette.background.alt }}>
              <CardContent>
                <Typography variant="h6" color={theme.palette.secondary[100]}>
                  Most Visited Page
                </Typography>
                <Typography variant="h4" color={theme.palette.secondary[200]}>
                  {data.statistics?.mostVisitedPage || "N/A"}
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
              rows={(data?.userStatistics) || []}
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
