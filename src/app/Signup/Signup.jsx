"use client";
import { Alert, Box, Button, Paper, TextField, Typography, IconButton, InputAdornment } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/navigation';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import * as Yup from 'yup';
import toast from "react-hot-toast";
import { signup } from "@/app/redux/userSlice";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CircularProgress from '@mui/material/CircularProgress';


export default function Signup() {

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const {isLoading} = useSelector(state => state.user);

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(2, "Name must be at least 2 chars").required("Name is required"),
    email: Yup.string().email("Incorrect E-mail").required("E-mail is required"),
    password: Yup.string()
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 
      "Password must include capital, small letters, numbers and special characters")
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref('password')], "rePassword must match password")
      .required("rePassword is required"),
    dateOfBirth: Yup.string().required("Date Of Birth is required"),
    gender: Yup.string().oneOf(["male", "female"]).required("Gender is required")
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
      rePassword: "",
      email: "",
      dateOfBirth: "",
      gender: "male"    
    },
    onSubmit(values) {
      dispatch(signup(values))
      .then(res => {
        if(res.payload?.data?.message === "success"){
          toast.success("Account has created successfully");
          router.push('/Login');
        } else {
          toast.error(res.payload?.response?.data?.error);
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
          width : {xs: "70%", md: "35%"},
          mt: '50px',
          mx : {xs: 'auto'},
          p : {xs: '50px' , md: '30px'},
          bgcolor: "#ffffff",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          borderRadius: 2
        }}
      >
        <form style={{ display: "flex", flexDirection: "column" }} onSubmit={formik.handleSubmit}>
          
          <Typography sx={{ mb: '10px', color: "#3b82f6" , fontWeight:700 }} variant="h5" component="h2">
            Register Now
          </Typography>

          {/* Name */}
          <TextField
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            type="text"
            name="name"
            label="Name"
            variant="standard"
            sx={{ 
              p: "10px",
              '& .MuiInput-underline:before': { borderBottomColor: '#e5e7eb' },
              '& .MuiInput-underline:after': { borderBottomColor: '#3b82f6' },
              '& .MuiInputLabel-root': { color: '#6b7280' },
              '& .MuiInputLabel-root.Mui-focused': { color: '#3b82f6' }
            }}
          />
          {formik.errors.name && formik.touched.name ? <Alert severity="error">{formik.errors.name}</Alert> : null}

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
              '& .MuiInputLabel-root.Mui-focused': { color: '#3b82f6' }
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
              '& .MuiInputLabel-root.Mui-focused': { color: '#3b82f6' }
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

          {/* Confirm Password */}
          <TextField
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rePassword}
            type={showRePassword ? "text" : "password"}
            name="rePassword"
            label="Confirm Password"
            variant="standard"
            sx={{ 
              p: "10px",
              '& .MuiInput-underline:before': { borderBottomColor: '#e5e7eb' },
              '& .MuiInput-underline:after': { borderBottomColor: '#3b82f6' },
              '& .MuiInputLabel-root': { color: '#6b7280' },
              '& .MuiInputLabel-root.Mui-focused': { color: '#3b82f6' }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowRePassword(!showRePassword)} sx={{ color: '#6b7280' }}>
                    {showRePassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          {formik.errors.rePassword && formik.touched.rePassword ? <Alert severity="error">{formik.errors.rePassword}</Alert> : null}

          {/* Date of Birth */}
          <TextField
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dateOfBirth}
            type="date"
            name="dateOfBirth"
            variant="standard"
            label="Date Of Birth"
            sx={{ 
              p: "10px",
              '& .MuiInput-underline:before': { borderBottomColor: '#e5e7eb' },
              '& .MuiInput-underline:after': { borderBottomColor: '#3b82f6' },
              '& .MuiInputLabel-root': { color: '#6b7280' },
              '& .MuiInputLabel-root.Mui-focused': { color: '#3b82f6' }
            }}
            InputLabelProps={{ shrink: true }}
          />
          {formik.errors.dateOfBirth && formik.touched.dateOfBirth ? <Alert severity="error">{formik.errors.dateOfBirth}</Alert> : null}

          {/* Gender */}
          <FormControl sx={{ p: "10px" }}>
            <FormLabel required sx={{ color: '#6b7280', '&.Mui-focused': { color: '#3b82f6' } }}>
              Gender
            </FormLabel>

            <RadioGroup
              row
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
            >
              <FormControlLabel 
                value="male" 
                control={<Radio sx={{ color: '#6b7280', '&.Mui-checked': { color: '#3b82f6' } }} />} 
                label="Male"
                sx={{ '& .MuiFormControlLabel-label': { color: '#111827' } }}
              />
              <FormControlLabel 
                value="female" 
                control={<Radio sx={{ color: '#6b7280', '&.Mui-checked': { color: '#3b82f6' } }} />} 
                label="Female"
                sx={{ '& .MuiFormControlLabel-label': { color: '#111827' } }}
              />
            </RadioGroup>
          </FormControl>
          {formik.errors.gender && <Alert severity="error">{formik.errors.gender}</Alert>}

          {/* Submit */}
          <Button 
            type="submit" 
            variant="contained" 
            sx={{ 
              p: "10px", 
              bgcolor: "#3b82f6",
              color: "#ffffff",
              fontWeight: 600,
              '&:hover': { bgcolor: '#2563eb' },
              '&:disabled': { bgcolor: '#93c5fd' }
            }}
          >
            {isLoading ? <CircularProgress sx={{ color: "#ffffff" }} size={25}/> : "Sign up" }
          </Button>

        </form>
      </Paper>
    </Box>
  );
}