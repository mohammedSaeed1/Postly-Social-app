'use client'
import {Box,Avatar,TextField,IconButton,InputAdornment} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { createComment } from "@/app/redux/commentsSlice";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { getUserData } from "@/app/redux/userSlice";
import { useEffect } from "react";

export default function CommentInput() {

  const {userData} = useSelector(state => state.user);

  const {id} = useParams();  
  const dispatch = useDispatch();

  
  const formik = useFormik({
     initialValues :{
      content : ""
     },
     onSubmit : _ =>{
       dispatch(createComment({
        comment : formik.values.content,
        postId : id
       }));    
       formik.resetForm();

     }
  })

  useEffect(() => {
    dispatch(getUserData());
  }, [])
  
  return (
    <Box
      sx={{
        display: "flex",
        gap: "10px",
        alignItems: "center",
        width: "100%",
        mb: 2,
      }}
    >
      {/* Profile Picture */}
      <Avatar
        src= {userData?.photo}
        alt={userData?.name}
        sx={{ width: 40, height: 40 }}
      />

      {/* Comment Input */}
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: "#f3f4f6",
          borderRadius: "25px",
          padding: "6px 14px",
          border: "1px solid #e5e7eb",
          transition: "all 0.2s",
          "&:hover": {
            backgroundColor: "#ffffff",
            borderColor: "#3b82f6",
          },
          "&:focus-within": {
            backgroundColor: "#ffffff",
            borderColor: "#3b82f6",
            boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
          },
        }}
      >
        <TextField
          fullWidth
          placeholder="Add Comment ..."
          name="content"
          value={formik.values.content}
          variant="standard" 
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         onKeyDown={(e) => {
           if (e.key === "Enter" && !e.shiftKey) {
             e.preventDefault();
             formik.handleSubmit();
           }
         }}
          InputProps={{
            disableUnderline: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={formik.handleSubmit}
                  disabled={!formik.values.content.trim()}
                  sx={{
                    color: formik.values.content.trim() ? "#3b82f6" : "#9ca3af",
                    "&:hover": {
                      backgroundColor: formik.values.content.trim() ? "#eff6ff" : "transparent",
                    },
                    "&:disabled": {
                      color: "#9ca3af",
                    },
                  }}
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiInputBase-input": {
              padding: "6px 0",
              fontSize: "14px",
              color: "#111827",
              "&::placeholder": {
                color: "#9ca3af",
                opacity: 1,
              },
            },
          }}
        />
      </Box>
    </Box>
  );
}