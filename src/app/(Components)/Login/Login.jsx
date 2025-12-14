"use client";
import { Alert, Box, Button, Paper, TextField, Typography, IconButton, InputAdornment } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch} from "react-redux";
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import toast from "react-hot-toast";
import { login } from "@/app/redux/userSlice";
import { useEffect, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from "react-redux";

export default function Login() {

  const [showPassword, setShowPassword] = useState(false);
   const {isLoading} = useSelector(state => state.user);
 
  
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Incorrect E-mail").required("E-mail is required"),
    password: Yup.string().required("Password is required"),
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",   
    },
    onSubmit(values) {
      dispatch(login(values))
      .then(res => {
        if(res.payload?.message === "success"){
          console.log(res);
          toast.success("Login is successfully");
          router.push('/');          
        } else {
          toast.error("Incorrect email or password");
        }
      })
    },
    validationSchema
  });
  
  return (
    <Box component={"section"} sx={{ bgcolor: "#f9fafb", minHeight: "100vh", py: 4 }}>
      <Paper
        elevation={3}
        sx={{
           width : {xs: "75%", md: "35%"},
          mt: '80px',
          mx : {xs: 'auto'},
          p : {xs: '50px' , md: '30px'},
          py: {xs:"60px"},
          bgcolor: "#ffffff",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          borderRadius: 2
        }}
      >
        <form style={{ display: "flex", flexDirection: "column" }} onSubmit={formik.handleSubmit}>
          
          <Typography sx={{ mb: '20px', color: "#3b82f6" , fontWeight:700 }} variant="h5" component="h2">
            Login Now
          </Typography>

          {/* Email */}
          <TextField
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            type="email"
            name="email"
            label="Email"
            variant="standard"
            sx={{ 
              p: "10px",
              '& .MuiInput-underline:before': { borderBottomColor: '#e5e7eb' },
              '& .MuiInput-underline:after': { borderBottomColor: '#3b82f6' },
              '& .MuiInputLabel-root': { color: '#6b7280' },
              '& .MuiInputLabel-root.Mui-focused': { color: '#3b82f6' },
              '& .MuiInputBase-input': { color: '#111827' }
            }}
          />
          {formik.errors.email && formik.touched.email ? <Alert severity="error">{formik.errors.email}</Alert> : null}

          {/* Password */}
          <TextField
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            type={showPassword ? "text" : "password"}
            name="password"
            label="Password"
            variant="standard"
            sx={{ 
              p: "10px",
              '& .MuiInput-underline:before': { borderBottomColor: '#e5e7eb' },
              '& .MuiInput-underline:after': { borderBottomColor: '#3b82f6' },
              '& .MuiInputLabel-root': { color: '#6b7280' },
              '& .MuiInputLabel-root.Mui-focused': { color: '#3b82f6' },
              '& .MuiInputBase-input': { color: '#111827' }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} sx={{ color: '#6b7280' }}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          {formik.errors.password && formik.touched.password ? <Alert severity="error">{formik.errors.password}</Alert> : null}

          {/* Submit */}
          <Button 
            type="submit" 
            variant="contained" 
            sx={{ 
              p: "10px",
              mt: "10px",
              bgcolor: "#3b82f6",
              color: "#ffffff",
              fontWeight: 600,
              '&:hover': { bgcolor: '#2563eb' },
              '&:disabled': { bgcolor: '#93c5fd' }
            }}
          >
            {isLoading ? <CircularProgress sx={{ color: "#ffffff" }} size={25} /> : "Login" }
          </Button>

        </form>
      </Paper>
    </Box>
  );
}