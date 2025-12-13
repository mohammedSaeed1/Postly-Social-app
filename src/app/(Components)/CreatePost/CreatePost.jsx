'use client'
import React, { useRef } from "react";
import { Box, Avatar, TextField, Button, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { createPost } from "@/app/redux/postsSlice";

 export default function CreatePost({lastPage}){
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const textRef =  useRef();
  const imageRef =  useRef();

  
   
  
  function addPost() {
    let formData = new FormData();
    let body = textRef.current.value;
    let image = imageRef.current.files[0];

    if(body)
    formData.append("body", body);
    if(image)
    formData.append("image", image);
    dispatch(createPost({formData , userId: userData?._id , lastPage}));
    textRef.current.value = "";    
    }
    
    
    return (
      <>
        <Box
          component="section"
          sx={{
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            p: 2,
            display: {xs: {width:"100%"} , md:{width:"75%"}},
            mt:"60px",
            mx: "auto",
            bgcolor: "#ffffff",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <Avatar alt={userData?.name} src={userData?.photo} />
            <TextField
              inputRef={textRef}
              label={`What's on your mind , ${userData?.name.split(" ")[0]}?`}
              fullWidth
              type="text"
              variant="outlined"
              minRows={2}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "20px",
                  "& fieldset": {
                    borderColor: "#e5e7eb",
                  },
                  "&:hover fieldset": {
                    borderColor: "#3b82f6",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#3b82f6",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#6b7280",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#3b82f6",
                },
                "& .MuiInputBase-input": {
                  color: "#111827",
                },
              }}
            />
          </Box>
  
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <IconButton 
              component="label"
              sx={{
                color: "#6b7280",
                "&:hover": {
                  bgcolor: "#f3f4f6",
                  color: "#3b82f6",
                },
              }}
            >
              <CloudUploadIcon />
              <input type="file" accept=".png,.jpg,.jpeg" hidden ref={imageRef} />
            </IconButton>
  
            <Button
              variant="contained"
              sx={{ 
                borderRadius: "20px",
                bgcolor: "#3b82f6",
                color: "#ffffff",
                fontWeight: 600,
                px: 3,
                "&:hover": {
                  bgcolor: "#2563eb",
                },
              }}
              onClick={addPost}
            >
              Post
            </Button>
          </Box>
        </Box> 
      </>
    );
  }