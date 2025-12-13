import {theme} from '@/theme/theme';
import { Box , Typography } from '@mui/material';

export default function Loading() {
  return (
      <Box>
        < Typography component={'h2'} sx={{textAlign:'center',fontSize:'32px',fontWeight:'700',color:theme.palette.primary.main, marginTop:{xs:"80%" ,sm:"40%",lg:"20%"}}}>Loading...</Typography>
      </Box>     
  );
}
