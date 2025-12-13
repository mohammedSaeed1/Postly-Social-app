'use client'
import { useDispatch, useSelector } from 'react-redux'
import { getSinglePost } from '@/app/redux/postsSlice';
import { useParams } from 'next/navigation';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Link from 'next/link';
import { Box, Container, Grid } from '@mui/material';
import { getAllComments } from '@/app/redux/commentsSlice';
import CommentInput from '../../CommentInput/CommentInput';
import Comments from '../../Comments/Comments';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from "react";
import Loading from '@/app/Loading';


export default function SinglePost() {

  const {user} = jwtDecode(localStorage.getItem('token'));
  const {id} = useParams();
  const dispatch = useDispatch();
  const {post , isLoading} = useSelector(state => state.posts);
  
  
  useEffect(() => {
    dispatch(getSinglePost(id));
    dispatch(getAllComments(id));
  }, [id]);
  
  return ( 
    <Box sx={{ bgcolor: "#f9fafb", minHeight: "100vh"}}>
    {isLoading ? <Loading/> :  <Container maxWidth={"lg"} sx={{mt:"50px"}}>
      <Grid container>
        <Grid sx={{m:'10px auto' , mt:0}} size={{xs:12 ,md: 6}}>
    <Card sx={{
      my: "25px",
      bgcolor: "#ffffff",
      borderRadius: "12px",
      border: "1px solid #e5e7eb",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    }}>
      <CardHeader
        avatar={
            <Link href={'/Profile'}>
          <Avatar 
           alt={post?.user?.name} src={post?.user?.photo}
          >
          </Avatar>
            </Link>
        }
        title={
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#111827" }}>
            {post?.user?.name}
          </Typography>
        }
        subheader={
          <Typography variant="caption" sx={{ color: "#6b7280" }}>
            {post?.createdAt?.slice(0,10)}
          </Typography>
        }
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: '#4b5563', lineHeight: 1.6 }}>
          {post?.body}
        </Typography>
      </CardContent>
      {post?.image && 
      <CardMedia
        component="img"
        height="300px"
        width="100%"
        image={post?.image}
        alt="Post image"
        sx={{ objectFit: "cover" }}
      />
      }
      <CardActions sx={{
        display:'flex', 
        justifyContent: 'space-between',
        borderTop: "1px solid #f3f4f6",
        px: 2,
        py: 1,
      }}>
        <IconButton 
          aria-label="like" 
          sx={{
            display:'flex',
            alignItems: 'center',
            color: "#6b7280",
            "&:hover": { 
              bgcolor: "#f3f4f6",
              "& .MuiSvgIcon-root": { color: "#3b82f6" },
              "& .MuiTypography-root": { color: "#3b82f6" },
            },
          }}
        >
          <ThumbUpIcon sx={{ fontSize: 20 }} />
          <Typography variant="caption" sx={{ml:'5px', fontWeight: 500}}>Like</Typography>
        </IconButton>
         <IconButton 
          aria-label="comment"
          sx={{
            display:'flex',
            alignItems: 'center',
            color: "#6b7280",
            "&:hover": { 
              bgcolor: "#f3f4f6",
              "& .MuiSvgIcon-root": { color: "#3b82f6" },
              "& .MuiTypography-root": { color: "#3b82f6" },
            },
          }}
        >
          <CommentIcon sx={{ fontSize: 20 }} />
          <Typography variant="caption" sx={{ml:'5px', fontWeight: 500}}>Comment</Typography>
        </IconButton>
        <IconButton 
          aria-label="share"
          sx={{
            display:'flex',
            alignItems: 'center',
            color: "#6b7280",
            "&:hover": { 
              bgcolor: "#f3f4f6",
              "& .MuiSvgIcon-root": { color: "#3b82f6" },
              "& .MuiTypography-root": { color: "#3b82f6" },
            },
          }}
        >
          <ShareIcon sx={{ fontSize: 20 }} />
          <Typography variant="caption" sx={{ml:'5px', fontWeight: 500}}>Share</Typography>
        </IconButton>
      </CardActions>
     
      <Box sx={{
        width:"90%", 
        mx:"auto",
        borderTop: "1px solid #e5e7eb",
        pt: 2,
      }}>
      <CommentInput/>
      <Comments currentUserId={user} />
      </Box>
    </Card>
        </Grid>
      </Grid>
    </Container>
    }
    </Box>
  )
}