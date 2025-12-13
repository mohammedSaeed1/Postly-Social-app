import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

const getHeaders = () => ({
    token: localStorage.getItem("token")
});


export const getAllComments = createAsyncThunk('commentsSlice/getAllComments', async (postId) => {
    return await axios.get(`https://linked-posts.routemisr.com/posts/${postId}/comments`, {
        headers: getHeaders()
    })
})
export const createComment = createAsyncThunk('commentsSlice/createComment', async ({ comment, postId }) => {
    const response = await axios.post(`https://linked-posts.routemisr.com/comments`, {
        content: comment,
        post: postId
    }, {
        headers: getHeaders()

    })
    return response.data;
})
export const updateComment = createAsyncThunk('commentsSlice/updateComment', async ({ commentId, content }) => {
    const response = await axios.put(`https://linked-posts.routemisr.com/comments/${commentId}`, {
        content
    }, { headers: getHeaders() })
    return response.data;
})

export const deleteComment = createAsyncThunk('commentsSlice/deleteComment', async (commentId) => {
    const response = await axios.delete(`https://linked-posts.routemisr.com/comments/${commentId}`, {
        headers: getHeaders()

    })
    return { response, commentId };
})

const initialState = {
    allComments: []
}


export const commentsSlice = createSlice({
    name: "commentsSlice",
    initialState,
    extraReducers: (builder) => {

        // get all comments
        builder.addCase(getAllComments.fulfilled, (state, action) => {
            state.allComments = action.payload.data?.comments;
        })

        // create comment
        builder.addCase(createComment.fulfilled, (state, action) => {
            state.allComments = action.payload.comments;
            toast.success("Comment created successfully",
                { position: "bottom-right" });
        })
        // update comment
        builder.addCase(updateComment.fulfilled, (state, action) => {
            state.allComments = state.allComments.map(comment => comment._id === action.payload.comment._id ? action.payload.comment : comment);
            toast.success("Comment updated successfully",
                { position: "bottom-right" });
        })
        // delete comment
        builder.addCase(deleteComment.fulfilled, (state, action) => {            
            state.allComments = state.allComments.filter(comment => comment.id !== action.payload.commentId);
            toast.success("Comment deleted successfully",
                { position: "bottom-right" });
        })
        
    }
});

export const commentsReducer = commentsSlice.reducer;