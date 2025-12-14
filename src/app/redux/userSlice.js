'use client'
import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import DoneIcon from '@mui/icons-material/Done';
import {theme} from '@/theme/theme';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { getAllPosts } from './postsSlice';

const getHeaders = () => ({
  token: localStorage.getItem("token")
});

export const changePassword = createAsyncThunk('userSlice/changePassword',async (values)=>{  
  
    const response = await axios.patch(`https://linked-posts.routemisr.com/users/change-password`,values,{
      headers: getHeaders()
    });
    return response.data;
})

export const getUserData = createAsyncThunk('userSlice/getUserData',async _=>{  
  
    const response = await axios.get(`https://linked-posts.routemisr.com/users/profile-data`,{
      headers: getHeaders()
    });
    return response.data;
})

export const uploadPhoto = createAsyncThunk('userSlice/uploadPhoto',async (formData)=>{  
  
    const response = await axios.put(`https://linked-posts.routemisr.com/users/upload-photo`,formData,{
      headers: getHeaders()
    });
    return response.data;
})

export const login = createAsyncThunk('userSlice/login',async (values , {dispatch})=>{  
  
    const response = await axios.post(`https://linked-posts.routemisr.com/users/signin`,values);
    dispatch(getAllPosts());
    return response.data;
})
export const signup = createAsyncThunk('userSlice/signup',async (values)=>{  
    const response = await axios.post(`https://linked-posts.routemisr.com/users/signup`,values);
    return response.data;
})

let initialState ={
token : typeof window !== 'undefined' ? localStorage.getItem("token") || "" : "",
userData:null,
isLoading: false
}

const userSlice = createSlice({
   name : 'userSlice',
   initialState,
   reducers:{
    clearToken: (state) => {
    state.token = null;
  } ,
    clearUserData:(state)=>{
     state.userData = null;
    }
   },
   extraReducers:(builder)=>{

    // login
     builder.addCase(login.fulfilled , (state , action) =>{    
      state.token = action.payload.token;
     localStorage.setItem("token",action.payload.token);   
      state.isLoading = false; 
    })
    builder.addCase(login.pending ,(state) =>{
      state.isLoading = true;
    })
    builder.addCase(login.rejected ,(state) =>{
      state.isLoading = false;
    })

    // signup
     builder.addCase(signup.fulfilled , (state) =>{    
       state.isLoading = false;
      ;})
      builder.addCase(signup.pending , (state) => {
        state.isLoading = true;
      })
      builder.addCase(signup.rejected , (state) => {
        state.isLoading = false;
      })

    //upload photo
     builder.addCase(uploadPhoto.fulfilled , _ =>{      
          toast("Your profile photo updated successfully",{
            position:"bottom-right",
            icon: <DoneIcon sx={{color:theme.palette.primary.main}}/>
          });    
     })
     builder.addCase(uploadPhoto.pending , _ =>{
          toast("Your profile photo is updating , please wait",{
            icon : <HourglassTopIcon/>,
            position:"bottom-right"
          });    
     })
       builder.addCase(uploadPhoto.rejected , _ =>{
          toast("something wrong , please try again later",{
            icon : <ErrorOutlineIcon/>,
            position:"bottom-right"
          });    
     })

       // get User Data
     builder.addCase(getUserData.fulfilled , (state , action) =>{
      state.userData = action.payload.user;
     })
    }
})
export const userReducer = userSlice.reducer; 
export const {clearUserData , clearToken} = userSlice.actions;
