import React from "react";
import {
  Box,
  useTheme,
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import {
  Public as GlobeIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  Computer as DeviceIcon,
} from "@mui/icons-material";
import Header from "components/Header";
import { useGetVisitorsQuery } from "state/api";

const Visitors = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetVisitorsQuery();

  return (
    <Box m="1.5rem 2.5rem">
      <Header 
        title="VISITORS" 
        subtitle="Track Website Visitors"
        icon={
          <GlobeIcon 
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
            {data?.visitors?.map((visitor) => (
              <Grid item xs={12} sm={6} md={4} key={visitor._id}>
                <Card
                  sx={{
                    backgroundColor: theme.palette.background.alt,
                    borderRadius: "0.55rem",
                    height: "100%",
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                      <GlobeIcon 
                        sx={{ 
                          color: theme.palette.primary.main,
                          fontSize: '2rem'
                        }} 
                      />
                      <Typography 
                        variant="h6"
                        sx={{ color: theme.palette.secondary[100] }}
                      >
                        {visitor.ip_address}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <LocationIcon sx={{ color: theme.palette.secondary[300] }} />
                      <Typography 
                        variant="body2"
                        sx={{ color: theme.palette.secondary[100] }}
                      >
                        {visitor.location?.country || "Unknown Location"}
                        {visitor.location?.city && `, ${visitor.location.city}`}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <DeviceIcon sx={{ color: theme.palette.secondary[300] }} />
                      <Typography 
                        variant="body2"
                        sx={{ color: theme.palette.secondary[100] }}
                      >
                        {visitor.device_info || "Unknown Device"}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
                      <TimeIcon sx={{ color: theme.palette.secondary[300] }} />
                      <Typography 
                        variant="caption"
                        sx={{ color: theme.palette.secondary[300] }}
                      >
                        Visited: {new Date(visitor.created_at).toLocaleString()}
                      </Typography>
                    </Box>

                    <Box sx={{ mt: 2 }}>
                      <Chip
                        label={visitor.visit_count > 1 ? "Returning Visitor" : "New Visitor"}
                        color={visitor.visit_count > 1 ? "success" : "primary"}
                        size="small"
                        sx={{ mr: 1 }}
                      />
                      {visitor.visit_count > 1 && (
                        <Chip
                          label={`${visitor.visit_count} visits`}
                          color="default"
                          size="small"
                        />
                      )}
                    </Box>
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

export default Visitors;
