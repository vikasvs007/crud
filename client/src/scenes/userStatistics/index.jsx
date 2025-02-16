import React from "react";
import {
  Box,
  useTheme,
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import {
  TrendingUp as TrendingUpIcon,
  Group as GroupIcon,
  Timeline as TimelineIcon,
  QueryStats as StatsIcon,
  PersonAdd as NewUserIcon,
  AccessTime as TimeIcon,
} from "@mui/icons-material";
import Header from "components/Header";
import { useGetUserStatisticsQuery } from "state/api";

const StatCard = ({ title, value, icon, description, color }) => {
  const theme = useTheme();
  
  return (
    <Card
      sx={{
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
        height: "100%",
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          {icon}
          <Typography 
            variant="h6"
            sx={{ color: theme.palette.secondary[100] }}
          >
            {title}
          </Typography>
        </Box>

        <Typography 
          variant="h4"
          sx={{ 
            color: color || theme.palette.primary.main,
            mb: 1
          }}
        >
          {value}
        </Typography>

        {description && (
          <Typography 
            variant="body2"
            sx={{ color: theme.palette.secondary[300] }}
          >
            {description}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

const UserStatistics = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetUserStatisticsQuery();

  return (
    <Box m="1.5rem 2.5rem">
      <Header 
        title="USER STATISTICS" 
        subtitle="Track User Growth and Activity"
        icon={
          <StatsIcon 
            sx={{ 
              fontSize: '2rem',
              color: theme.palette.secondary[300]
            }} 
          />
        }
      />
      
      <Box mt="40px">
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard
                title="Total Users"
                value={data?.totalUsers || 0}
                icon={
                  <GroupIcon 
                    sx={{ 
                      color: theme.palette.primary.main,
                      fontSize: '2rem'
                    }}
                  />
                }
                description="Total registered users"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <StatCard
                title="New Users (Today)"
                value={data?.newUsersToday || 0}
                icon={
                  <NewUserIcon 
                    sx={{ 
                      color: theme.palette.success.main,
                      fontSize: '2rem'
                    }}
                  />
                }
                color={theme.palette.success.main}
                description="Users registered in the last 24 hours"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <StatCard
                title="Active Users"
                value={data?.activeUsers || 0}
                icon={
                  <TimelineIcon 
                    sx={{ 
                      color: theme.palette.warning.main,
                      fontSize: '2rem'
                    }}
                  />
                }
                color={theme.palette.warning.main}
                description="Users active in the last hour"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <StatCard
                title="User Growth"
                value={`${data?.userGrowth || 0}%`}
                icon={
                  <TrendingUpIcon 
                    sx={{ 
                      color: theme.palette.info.main,
                      fontSize: '2rem'
                    }}
                  />
                }
                color={theme.palette.info.main}
                description="User growth rate this month"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <StatCard
                title="Average Session"
                value={`${Math.round((data?.avgSessionDuration || 0) / 60)} mins`}
                icon={
                  <TimeIcon 
                    sx={{ 
                      color: theme.palette.secondary[300],
                      fontSize: '2rem'
                    }}
                  />
                }
                description="Average user session duration"
              />
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default UserStatistics;
