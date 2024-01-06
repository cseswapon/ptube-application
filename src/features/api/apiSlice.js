import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000",
  }),
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => ({ url: "/videos", method: "GET" }),
      // auto matic data refetch unused data ver 5sec
      keepUnusedDataFor: 5,
    }),
    getVideo: builder.query({
      query: (videoId) => ({
        url: `/videos/${videoId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    getRelatedVideos: builder.query({
      query: ({ id, title }) => {
        const tags = title.split(" ");
        const likes = tags.map((tag) => `title_like=${tag}`);
        const queryString = `/videos?${likes.join("&")}&_limit=4`;
        return { url: queryString, method: "GET" };
      },
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetVideosQuery, useGetVideoQuery, useGetRelatedVideosQuery } =
  apiSlice;
