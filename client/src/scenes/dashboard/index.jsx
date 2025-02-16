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

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

      <Box mt="20px">
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
      </Box>

      <Box mt="2rem">
        <Grid container spacing={2}>
          {/* Recent Orders */}
          <Grid item xs={12} md={6}>
            <Card sx={{ bgcolor: theme.palette.background.alt }}>
              <CardContent>
                <Typography variant="h6" color={theme.palette.secondary[100]} gutterBottom>
                  Recent Orders
                </Typography>
                {isLoadingOrders ? (
                  <CircularProgress />
                ) : (
                  <Box>
                    {recentOrders.map((order) => (
                      <Box
                        key={order._id}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: 2,
                          p: 1,
                          borderRadius: 1,
                          bgcolor: theme.palette.primary.light,
                        }}
                      >
                        <Box>
                          <Typography color={theme.palette.secondary[100]}>
                            {order.user_id?.name || "Unknown Customer"}
                          </Typography>
                          <Typography variant="caption" color={theme.palette.secondary[300]}>
                            {order.products.map(p => `${p.product_id?.name || 'Product'} (${p.quantity})`).join(', ')}
                          </Typography>
                        </Box>
                        <Box>
                          <Chip
                            label={order.status}
                            color={
                              order.status === "delivered"
                                ? "success"
                                : order.status === "shipped"
                                ? "primary"
                                : "warning"
                            }
                            size="small"
                          />
                          <Typography variant="caption" color={theme.palette.secondary[300]} sx={{ display: 'block' }}>
                            ${order.total_amount.toFixed(2)}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Enquiries */}
          <Grid item xs={12} md={6}>
            <Card sx={{ bgcolor: theme.palette.background.alt }}>
              <CardContent>
                <Typography variant="h6" color={theme.palette.secondary[100]} gutterBottom>
                  Recent Enquiries
                </Typography>
                {isLoadingEnquiries ? (
                  <CircularProgress />
                ) : (
                  <Box>
                    {recentEnquiries.map((enquiry) => (
                      <Box
                        key={enquiry._id}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: 2,
                          p: 1,
                          borderRadius: 1,
                          bgcolor: theme.palette.primary.light,
                        }}
                      >
                        <Box>
                          <Typography color={theme.palette.secondary[100]}>
                            {enquiry.user_id?.name || "Unknown User"}
                          </Typography>
                          <Typography
                            variant="caption"
                            color={theme.palette.secondary[300]}
                            sx={{
                              display: 'block',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              maxWidth: '300px'
                            }}
                          >
                            {enquiry.message}
                          </Typography>
                        </Box>
                        <Box>
                          <Chip
                            label={enquiry.status}
                            color={enquiry.status === "closed" ? "error" : "success"}
                            size="small"
                          />
                          <Typography variant="caption" color={theme.palette.secondary[300]} sx={{ display: 'block' }}>
                            {new Date(enquiry.created_at).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
