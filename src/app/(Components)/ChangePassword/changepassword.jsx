"use client";
import { Alert, Box, Button, Paper, TextField, Typography, IconButton, InputAdornment } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import {theme} from "@/theme/theme";
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import toast from "react-hot-toast";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { changePassword } from "@/app/redux/userSlice";

export default function ChangePassword() {

  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    password: Yup.string().required("password is required"),
    newPassword: Yup.string()
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 
      "Password must include capital, small letters, numbers and special characters")
      .required("New Password is required"),
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",   
    },
    onSubmit(values) {
      dispatch(changePassword(values))
      .then(res => {        
        if(res.payload.message === "success"){
            toast.success("Password changed correctly");
            router.push('/Login');
        }
        else{            
            toast.error("Incorrect Password");
        }
      })
      .catch(_ => {
        toast.error("Incorrect Password");
      } )
    },
    validationSchema
  });

  return (
    <Box component={"section"} sx={{mt:"100px"}}>
      <Paper
        elevation={3}
        sx={{
          width: {xs:"90%",md:"40%"},
          m: "70px auto",
          p: "25px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <form style={{ display: "flex", flexDirection: "column"}} onSubmit={formik.handleSubmit}>
          
          <Typography sx={{ mb: '10px' }} variant="h5" component="h2" color={theme.palette.primary.main}>
            Change Your Password
          </Typography>

          {/* Password */}
          <TextField
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            type={showPassword ? "text" : "password"}
            name="password"
            label="Password"
            variant="standard"
            sx={{ p: "10px" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          {formik.errors.password && formik.touched.password ? <Alert severity="error">{formik.errors.password}</Alert> : null}


          <TextField
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.newPassword}
            type={showPassword ? "text" : "password"}
            name="newPassword"
            label="New Password"
            variant="standard"
            sx={{ p: "10px" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          {formik.errors.newPassword && formik.touched.newPassword ? <Alert severity="error">{formik.errors.newPassword}</Alert> : null}


          {/* Submit */}
          <Button type="submit" variant="contained" sx={{ p: "7px", color:"#FFFFFF" }}>
            Change
          </Button>

        </form>
      </Paper>
    </Box>
  );
}
