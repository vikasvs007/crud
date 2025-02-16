import React from "react";
import {
  Box,
  useTheme,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Grid,
  Avatar,
  Chip,
} from "@mui/material";
import {
  Person as PersonIcon,
  AccessTime as TimeIcon,
} from "@mui/icons-material";
import Header from "components/Header";
import { useGetActiveUsersQuery } from "state/api";

const ActiveUsers = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetActiveUsersQuery();

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="ACTIVE USERS"
        subtitle="Monitor Currently Active Users"
        icon={
          <PersonIcon
            sx={{
              fontSize: "2rem",
              color: theme.palette.secondary[300],
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
            {data?.activeUsers?.map((user) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={user._id}>
                <Card
                  sx={{
                    backgroundColor: theme.palette.background.alt,
                    borderRadius: "0.55rem",
                    height: "100%",
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        mb: 2,
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: theme.palette.primary.main,
                          width: 48,
                          height: 48,
                        }}
                      >
                        {user.user_id?.name?.charAt(0) || "U"}
                      </Avatar>
                      <Box>
                        <Typography
                          variant="h5"
                          sx={{ color: theme.palette.secondary[100] }}
                        >
                          {user.user_id?.name || "Unknown User"}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: theme.palette.secondary[300] }}
                        >
                          {user.user_id?.email || "No email"}
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        mb: 1,
                      }}
                    >
                      <TimeIcon sx={{ color: theme.palette.secondary[300] }} />
                      <Typography
                        variant="body2"
                        sx={{ color: theme.palette.secondary[100] }}
                      >
                        Session Duration:{" "}
                        {Math.floor(user.session_duration / 60)} minutes
                      </Typography>
                    </Box>

                    <Chip
                      label="Active"
                      color="success"
                      size="small"
                      sx={{
                        mt: 1,
                        "& .MuiChip-label": {
                          color: theme.palette.secondary[100],
                        },
                      }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default ActiveUsers;
