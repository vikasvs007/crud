import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL || "http://localhost:5001/api",
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
    updateUser: build.mutation({
      query: ({ userId, ...data }) => ({
        url: `users/${userId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    uploadPhoto: build.mutation({
      query: ({ userId, photo }) => {
        const formData = new FormData();
        formData.append("photo", photo);
        return {
          url: `users/${userId}/photo`,
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
      query: (product) => ({
        url: "products",
        method: "POST",
        body: product,
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
    }),
    
    // Active Users endpoints
    getActiveUsers: build.query({
      query: () => "active-users",
      providesTags: ["ActiveUsers"],
    }),
    
    // Visitors endpoints
    getVisitors: build.query({
      query: () => "visitors",
      providesTags: ["Visitors"],
    }),
    
    // User Statistics endpoints
    getUserStatistics: build.query({
      query: () => "user-statistics",
      providesTags: ["UserStatistics"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetUsersQuery,
  useUpdateUserMutation,
  useUploadPhotoMutation,
  useGetProductsQuery,
  useCreateProductMutation,
  useGetOrdersQuery,
  useCreateOrderMutation,
  useGetEnquiriesQuery,
  useCreateEnquiryMutation,
  useGetNotificationsQuery,
  useGetActiveUsersQuery,
  useGetVisitorsQuery,
  useGetUserStatisticsQuery,
} = api;
