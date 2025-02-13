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
  CircularProgress,
  Chip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import {
  useGetProductsQuery,
  useGetOrdersQuery,
  useGetEnquiriesQuery,
  useGetUserStatisticsQuery,
  useGetActiveUsersQuery,
  useGetVisitorsQuery,
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
  
  const { data: products, isLoading: isLoadingProducts } = useGetProductsQuery();
  const { data: orders, isLoading: isLoadingOrders } = useGetOrdersQuery();
  const { data: enquiries, isLoading: isLoadingEnquiries } = useGetEnquiriesQuery();
  const { data: userStats, isLoading: isLoadingStats } = useGetUserStatisticsQuery();
  const { data: activeUsers } = useGetActiveUsersQuery();
  const { data: visitors } = useGetVisitorsQuery();

  const recentOrders = orders?.slice(-5).reverse() || [];
  const recentEnquiries = enquiries?.slice(-5).reverse() || [];

  const dashboardStats = [
    {
      title: "Total Products",
      value: products?.length || 0,
      icon: <PointOfSale sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />,
      description: "Total products in inventory",
    },
    {
      title: "Total Orders",
      value: orders?.length || 0,
      icon: <Traffic sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />,
      description: "Total orders received",
    },
    {
      title: "Active Users",
      value: activeUsers?.count || 0,
      icon: <PersonAdd sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />,
      description: "Users active today",
    },
    {
      title: "Total Visitors",
      value: visitors?.count || 0,
      icon: <QueryBuilder sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />,
      description: "Visitors this month",
    },
  ];

  const orderColumns = [
    {
      field: "customerName",
      headerName: "Customer",
      flex: 1,
      renderCell: (params) => (
        <Typography sx={{ color: theme.palette.secondary[100] }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "productName",
      headerName: "Product",
      flex: 1,
      renderCell: (params) => (
        <Typography sx={{ color: theme.palette.secondary[100] }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.8,
      renderCell: (params) => {
        const getStatusColor = (status) => {
          switch (status.toLowerCase()) {
            case "completed":
              return theme.palette.success.main;
            case "processing":
              return theme.palette.warning.main;
            case "pending":
              return theme.palette.info.main;
            default:
              return theme.palette.grey[500];
          }
        };

        return (
          <Chip
            label={params.value}
            sx={{
              backgroundColor: getStatusColor(params.value),
              color: "#fff",
            }}
          />
        );
      },
    },
  ];

  const enquiryColumns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: (params) => (
        <Typography sx={{ color: theme.palette.secondary[100] }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "subject",
      headerName: "Subject",
      flex: 1,
      renderCell: (params) => (
        <Typography 
          sx={{ 
            color: theme.palette.secondary[100],
            whiteSpace: "nowrap",
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
      renderCell: (params) => {
        const getStatusColor = (status) => {
          switch (status.toLowerCase()) {
            case "resolved":
              return theme.palette.success.main;
            case "in progress":
              return theme.palette.warning.main;
            case "new":
              return theme.palette.info.main;
            default:
              return theme.palette.grey[500];
          }
        };

        return (
          <Chip
            label={params.value}
            sx={{
              backgroundColor: getStatusColor(params.value),
              color: "#fff",
            }}
          />
        );
      },
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
              description={stat.description}
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
        >
          <Card 
            sx={{ 
              height: "100%",
              backgroundColor: theme.palette.background.alt,
              backgroundImage: "none",
              borderRadius: "0.55rem",
            }}
          >
            <CardContent>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: theme.palette.secondary[100],
                  mb: 2
                }}
              >
                Recent Orders
              </Typography>
              {isLoadingOrders ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                  <CircularProgress />
                </Box>
              ) : (
                <Box
                  sx={{
                    height: "300px",
                    "& .MuiDataGrid-root": {
                      border: "none",
                      backgroundColor: theme.palette.background.alt,
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
                      backgroundColor: theme.palette.background.alt,
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
                    rows={recentOrders}
                    columns={orderColumns}
                    pageSize={5}
                    getRowId={(row) => row._id}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                    hideFooter
                  />
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>

        {/* Recent Enquiries */}
        <Box
          gridColumn="span 6"
          gridRow="span 2"
        >
          <Card 
            sx={{ 
              height: "100%",
              backgroundColor: theme.palette.background.alt,
              backgroundImage: "none",
              borderRadius: "0.55rem",
            }}
          >
            <CardContent>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: theme.palette.secondary[100],
                  mb: 2
                }}
              >
                Recent Enquiries
              </Typography>
              {isLoadingEnquiries ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                  <CircularProgress />
                </Box>
              ) : (
                <Box
                  sx={{
                    height: "300px",
                    "& .MuiDataGrid-root": {
                      border: "none",
                      backgroundColor: theme.palette.background.alt,
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
                      backgroundColor: theme.palette.background.alt,
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
                    rows={recentEnquiries}
                    columns={enquiryColumns}
                    pageSize={5}
                    getRowId={(row) => row._id}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                    hideFooter
                  />
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
