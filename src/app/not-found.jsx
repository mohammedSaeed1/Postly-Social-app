import { Box, Typography } from '@mui/material';

export default function NotFound() {
  return (
    <Box component={'section'}  sx = {{display: "flex" , justifyContent: "center" , alignItems:"center",position:"absolute" ,top:0,bottom:0 ,right:0 ,left:0}}>
        <Typography component={'h2'} sx={{color:"#3b82f6",fontSize:"30px",fontWeight:"700"}} >Error | This Page is not found</Typography>
    </Box>
  )
}
