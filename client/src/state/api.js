import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL || "https://crud-backend-a70z.onrender.com",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().global?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Products",
    "Orders",
    "Enquiries",
    "Notifications",
    "ActiveUsers",
    "Visitors",
    "UserStatistics",
    "Geography",
  ],
  endpoints: (build) => ({
    // User endpoints
    getUser: build.query({
      query: (id) => `users/${id}`,
      providesTags: ["User"],
    }),
    getUsers: build.query({
      query: () => "users",
      providesTags: ["User"],
    }),
    createUser: build.mutation({
      query: (data) => ({
        url: "users",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: build.mutation({
      query: ({ id, ...data }) => ({
        url: `users/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    uploadPhoto: build.mutation({
      query: ({ id, photo }) => {
        const formData = new FormData();
        formData.append("photo", photo);
        return {
          url: `users/${id}/photo`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["User"],
    }),
    
    // Product endpoints
    getProducts: build.query({
      query: () => "products",
      providesTags: ["Products"],
    }),
    createProduct: build.mutation({
      query: (data) => ({
        url: "products",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: build.mutation({
      query: ({ id, ...data }) => ({
        url: `products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    
    // Order endpoints
    getOrders: build.query({
      query: () => "orders",
      providesTags: ["Orders"],
    }),
    createOrder: build.mutation({
      query: (order) => ({
        url: "orders",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["Orders"],
    }),
    
    // Enquiry endpoints
    getEnquiries: build.query({
      query: () => "enquiries",
      providesTags: ["Enquiries"],
    }),
    createEnquiry: build.mutation({
      query: (enquiry) => ({
        url: "enquiries",
        method: "POST",
        body: enquiry,
      }),
      invalidatesTags: ["Enquiries"],
    }),
    
    // Notification endpoints
    getNotifications: build.query({
      query: () => "notifications",
      providesTags: ["Notifications"],
      pollingInterval: 30000,
    }),
    createNotification: build.mutation({
      query: (data) => ({
        url: "notifications",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Notifications"],
    }),
    updateNotification: build.mutation({
      query: ({ id, ...data }) => ({
        url: `notifications/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Notifications"],
    }),
    
    // Active Users endpoints
    getActiveUsers: build.query({
      query: () => "active-users",
      providesTags: ["ActiveUsers"],
      pollingInterval: 30000,
    }),
    
    // Visitors endpoints
    getVisitors: build.query({
      query: () => "visitors",
      providesTags: ["Visitors"],
      pollingInterval: 30000,
    }),
    
    // User Statistics endpoints
    getUserStatistics: build.query({
      query: () => "user-statistics",
      providesTags: ["UserStatistics"],
      pollingInterval: 30000,
    }),
    
    // Geography endpoints
    getGeography: build.query({
      query: () => "geography/users",
      providesTags: ["Geography"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useUploadPhotoMutation,
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetOrdersQuery,
  useCreateOrderMutation,
  useGetEnquiriesQuery,
  useCreateEnquiryMutation,
  useGetNotificationsQuery,
  useCreateNotificationMutation,
  useUpdateNotificationMutation,
  useGetActiveUsersQuery,
  useGetVisitorsQuery,
  useGetUserStatisticsQuery,
  useGetGeographyQuery,
} = api;
