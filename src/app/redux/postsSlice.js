import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import ErrorIcon from '@mui/icons-material/Error';

const getHeaders = () => ({
  token: localStorage.getItem("token")
});


// Get all posts with pagination
export const getAllPosts = createAsyncThunk('postsSlice/getAllPosts', async (page) => {
  return await axios.get(`https://linked-posts.routemisr.com/posts?limit=40&page=${page}`, {
    headers: getHeaders()
  });
});

// Get single post
export const getSinglePost = createAsyncThunk('postsSlice/getSinglePost', async (postId) => {
  return await axios.get(`https://linked-posts.routemisr.com/posts/${postId}`, {
    headers: getHeaders()
  });
});

// Create post
export const createPost = createAsyncThunk('postsSlice/createPost', async ({ formData, userId,lastPage}, { dispatch }) => {
   console.log(lastPage);
  const response = await axios.post('https://linked-posts.routemisr.com/posts', formData, {
    headers: getHeaders()
  });

  if (response.data.message === "success") {
    dispatch(getUserPosts(userId));
    dispatch(getAllPosts(lastPage));
  }

  return response.data;
});

// Update post
export const updatePost = createAsyncThunk('postsSlice/updatePost', async ({ postId, formData }, { dispatch }) => {
  const response = await axios.put(`https://linked-posts.routemisr.com/posts/${postId}`, formData, {
    headers: getHeaders()
  });

  if (response.data.message === "success") {
    dispatch(getUserPosts(response.data.post.user));
  }

  return response.data;
});

// Delete post
export const deletePost = createAsyncThunk('postsSlice/deletePost', async (postId) => {
  return await axios.delete(`https://linked-posts.routemisr.com/posts/${postId}`, {
    headers: getHeaders()
  });
});

// Get all posts for a user
export const getUserPosts = createAsyncThunk('postsSlice/getUserPostsPost', async (userId) => {
  return await axios.get(`https://linked-posts.routemisr.com/users/${userId}/posts`, {
    headers: getHeaders()
  });
});

const initialState = {
  userPosts: [],
  allPosts: [],
  post: null,
  isLoading: false,
  lastPage: typeof window !== 'undefined' ? localStorage.getItem("lastPage") || 1 : 1,
  currentPage: 0
};

export const postsSlice = createSlice({
  name: "postsSlice",
  initialState,
  reducers: {
    clearUserPosts: (state) => {
      state.userPosts = [];
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {

    // --- Get All Posts ---
    builder.addCase(getAllPosts.fulfilled, (state, action) => {      
      const pagination = action.payload.data.paginationInfo;
      const pagePosts = action.payload.data.posts.reverse();
      state.currentPage = pagination.currentPage;
      state.lastPage = pagination.numberOfPages;

      localStorage.setItem("lastPage", pagination.numberOfPages);

      const newPosts = pagePosts.filter(
        post => !state.allPosts.some(p => p._id === post._id)
      );

      state.allPosts = [...state.allPosts, ...newPosts];
      state.isLoading = false;
    });
    builder.addCase(getAllPosts.pending, (state) => {
      state.isLoading = true;
    });


    // --- Get Single Post ---
    builder.addCase(getSinglePost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSinglePost.fulfilled, (state, action) => {
      state.post = action.payload.data?.post;
      state.isLoading = false;
    });

    // --- Create Post ---
    builder.addCase(createPost.fulfilled, _ => {
      toast.success("Your post is created successfully", { position: "bottom-right" });
    });
    builder.addCase(createPost.rejected, _ => {
      toast("Your post didn't create, Something wrong!", {
        position: "bottom-right",
        icon: <ErrorIcon sx={{ color: "red" }} />
      });
    });

    // --- Update Post ---
    builder.addCase(updatePost.fulfilled, _ => {
      toast.success("Post updated successfully", { position: "bottom-right" });
    });
    builder.addCase(updatePost.rejected, _ => {
      toast.error("Something went wrong, Post didn't update", { position: "bottom-right" });
    });

    // --- Delete Post ---
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.userPosts = state.userPosts.filter(post => post.id !== action.payload.data.post.id);
      toast.success("Post deleted successfully", { position: "bottom-right" });
    });
    builder.addCase(deletePost.rejected, _ => {
      toast.error("Something went wrong, Post didn't delete", { position: "bottom-right" });
    });

    // --- Get User Posts ---
    builder.addCase(getUserPosts.pending, (state) => {      
      state.isLoading = true;
    });
    builder.addCase(getUserPosts.fulfilled, (state, action) => {
      state.userPosts = action.payload.data?.posts.reverse();
      state.isLoading = false;
    });
  }
});

export const postsReducer = postsSlice.reducer;
export const { clearUserPosts, setCurrentPage } = postsSlice.actions;
