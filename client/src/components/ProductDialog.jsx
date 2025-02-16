import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from '@mui/material';

const ProductDialog = ({ open, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock_quantity: '',
    image_url: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        price: initialData.price || '',
        stock_quantity: initialData.stock_quantity || '',
        image_url: initialData.image_url || '',
      });
    } else {
      // Reset form when adding new product
      setFormData({
        name: '',
        description: '',
        price: '',
        stock_quantity: '',
        image_url: '',
      });
    }
  }, [initialData, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert numeric fields
    const submissionData = {
      ...formData,
      price: Number(formData.price),
      stock_quantity: Number(formData.stock_quantity),
    };
    onSubmit(submissionData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initialData ? 'Edit Product' : 'Add New Product'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              name="name"
              label="Product Name"
              value={formData.name}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              name="description"
              label="Description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
            />
            <TextField
              name="price"
              label="Price"
              value={formData.price}
              onChange={handleChange}
              required
              fullWidth
              type="number"
              inputProps={{ min: 0, step: 0.01 }}
            />
            <TextField
              name="stock_quantity"
              label="Stock Quantity"
              value={formData.stock_quantity}
              onChange={handleChange}
              required
              fullWidth
              type="number"
              inputProps={{ min: 0 }}
            />
            <TextField
              name="image_url"
              label="Image URL"
              value={formData.image_url}
              onChange={handleChange}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {initialData ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ProductDialog;
