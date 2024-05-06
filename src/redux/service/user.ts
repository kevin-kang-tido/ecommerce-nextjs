import { ecommerceApi } from "../api";

// Define a service using a base URL from the "ecommerceApi" and injects endpoints to it
export const userApi = ecommerceApi.injectEndpoints({
    endpoints: (builder) => ({
        // get all products
        getUser: builder.query({
            query: () =>
                `/api/user/`,
        }),
    }),
});

// Export hooks for usage in components, which are
export const {
    useGetUserQuery,
} = userApi;