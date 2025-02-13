import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Chip,
  Divider,
  Stack,
} from "@mui/material";
import {
  Inventory2Outlined,
  LocalOfferOutlined,
  StarBorderOutlined,
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material";
import Header from "components/Header";
import { useGetProductsQuery } from "state/api";

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount || 0);
};

const formatNumber = (number) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number || 0);
};

const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stat,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.75rem",
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: theme.shadows[4],
        },
      }}
    >
      <CardContent>
        <Box mb={2}>
          <Chip
            label={category || "Uncategorized"}
            size="small"
            sx={{
              backgroundColor: theme.palette.secondary[700],
              color: theme.palette.background.alt,
              fontWeight: "600",
            }}
          />
        </Box>
        
        <Typography 
          variant="h5" 
          component="div" 
          sx={{ 
            mb: 1,
            fontWeight: "600",
            color: theme.palette.secondary[100],
          }}
        >
          {name}
        </Typography>

        <Stack 
          direction="row" 
          spacing={2} 
          alignItems="center" 
          mb={2}
        >
          <Typography 
            variant="h6" 
            color={theme.palette.secondary[400]}
            sx={{ 
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <LocalOfferOutlined fontSize="small" />
            {formatCurrency(price)}
          </Typography>

          <Box sx={{ 
            display: "flex", 
            alignItems: "center",
            gap: "0.5rem",
          }}>
            <StarBorderOutlined sx={{ color: theme.palette.secondary[400] }} />
            <Rating 
              value={Number(rating || 0)} 
              readOnly 
              precision={0.5}
              sx={{ color: theme.palette.secondary[300] }}
            />
          </Box>
        </Stack>

        <Typography 
          variant="body2" 
          color={theme.palette.secondary[200]}
          sx={{ 
            minHeight: "3em",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {description}
        </Typography>
      </CardContent>

      <Divider sx={{ opacity: 0.2 }} />

      <CardActions>
        <Button
          variant="text"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
          sx={{
            color: theme.palette.secondary[300],
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
          }}
        >
          {isExpanded ? "Show Less" : "Show More"}
          {isExpanded ? <ExpandLess /> : <ExpandMore />}
        </Button>
      </CardActions>

      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Stack spacing={2}>
            <Box>
              <Typography 
                variant="caption" 
                color={theme.palette.secondary[400]}
                sx={{ display: "block", mb: 0.5 }}
              >
                Product ID
              </Typography>
              <Typography 
                variant="body2"
                sx={{ 
                  fontFamily: "monospace",
                  color: theme.palette.secondary[200],
                }}
              >
                {_id}
              </Typography>
            </Box>

            <Box sx={{ 
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}>
              <Inventory2Outlined sx={{ color: theme.palette.secondary[300] }} />
              <Typography color={theme.palette.secondary[200]}>
                Supply Left: <strong>{formatNumber(supply)}</strong> units
              </Typography>
            </Box>

            {stat && (
              <>
                <Divider sx={{ opacity: 0.2 }} />
                <Box>
                  <Typography 
                    variant="subtitle2" 
                    color={theme.palette.secondary[400]}
                    sx={{ mb: 1 }}
                  >
                    Yearly Statistics
                  </Typography>
                  <Stack spacing={1}>
                    <Typography variant="body2" color={theme.palette.secondary[200]}>
                      Total Sales: {formatCurrency(stat.yearlySalesTotal)}
                    </Typography>
                    <Typography variant="body2" color={theme.palette.secondary[200]}>
                      Units Sold: {formatNumber(stat.yearlyTotalSoldUnits)}
                    </Typography>
                  </Stack>
                </Box>
              </>
            )}
          </Stack>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Products = () => {
  const { data, isLoading, error } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();

  if (error) {
    return (
      <Box m="1.5rem 2.5rem">
        <Header title="PRODUCTS" subtitle="See your list of products." />
        <Box
          mt="20px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="50vh"
        >
          <Typography color="error" variant="h5">
            Error loading products. Please try again later.
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTS" subtitle="See your list of products." />
      {isLoading ? (
        <Box
          mt="20px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="50vh"
        >
          <CircularProgress
            size={60}
            thickness={2}
            sx={{ color: theme.palette.secondary[300] }}
          />
        </Box>
      ) : !data || data.length === 0 ? (
        <Box
          mt="20px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="50vh"
        >
          <Typography variant="h5" color={theme.palette.secondary[300]}>
            No products found.
          </Typography>
        </Box>
      ) : (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns={`repeat(${isNonMobile ? 4 : 1}, 1fr)`}
          gap="2rem"
          sx={{
            "& > div": { height: "100%" },
          }}
        >
          {data.map(
            ({
              _id,
              name,
              description,
              price,
              rating,
              category,
              supply,
              stat,
            }) => (
              <Product
                key={_id}
                _id={_id}
                name={name}
                description={description}
                price={price}
                rating={rating}
                category={category}
                supply={supply}
                stat={stat}
              />
            )
          )}
        </Box>
      )}
    </Box>
  );
};

export default Products;
