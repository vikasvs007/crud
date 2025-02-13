import React from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import {
  useGetProductsQuery,
  useGetOrdersQuery,
  useGetEnquiriesQuery,
  useGetUserStatisticsQuery,
} from "state/api";
import StatBox from "components/StatBox";
import {
  PointOfSale,
  PersonAdd,
  Traffic,
  QueryBuilder,
} from "@mui/icons-material";

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  
  const { data: products } = useGetProductsQuery();
  const { data: orders } = useGetOrdersQuery();
  const { data: enquiries } = useGetEnquiriesQuery();
  const { data: userStats } = useGetUserStatisticsQuery();

  const recentOrders = orders?.slice(0, 5) || [];
  const recentEnquiries = enquiries?.slice(0, 5) || [];

  const dashboardStats = [
    {
      title: "Total Products",
      value: products?.length || 0,
      icon: <PointOfSale sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />,
    },
    {
      title: "Total Orders",
      value: orders?.length || 0,
      icon: <Traffic sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />,
    },
    {
      title: "Active Users",
      value: userStats?.activeToday || 0,
      icon: <PersonAdd sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />,
    },
    {
      title: "Avg Session Time",
      value: userStats?.avgSessionTime ? `${Math.round(userStats.avgSessionTime / 60)}m` : "0m",
      icon: <QueryBuilder sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />,
    },
  ];

  const orderColumns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "customerName",
      headerName: "Customer",
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

  const enquiryColumns = [
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
      field: "subject",
      headerName: "Subject",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.8,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

      <Grid container spacing={2}>
        {dashboardStats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <StatBox
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              description="Since last month"
            />
          </Grid>
        ))}
      </Grid>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* Recent Orders */}
        <Box
          gridColumn="span 6"
          gridRow="span 2"
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
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
                Recent Orders
              </Typography>
              <DataGrid
                rows={recentOrders}
                columns={orderColumns}
                pageSize={5}
                getRowId={(row) => row._id}
                rowsPerPageOptions={[5]}
              />
            </CardContent>
          </Card>
        </Box>

        {/* Recent Enquiries */}
        <Box
          gridColumn="span 6"
          gridRow="span 2"
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
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
                Recent Enquiries
              </Typography>
              <DataGrid
                rows={recentEnquiries}
                columns={enquiryColumns}
                pageSize={5}
                getRowId={(row) => row._id}
                rowsPerPageOptions={[5]}
              />
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
