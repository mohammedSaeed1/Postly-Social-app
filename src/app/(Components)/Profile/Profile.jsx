'use client'
import { Box, Avatar, IconButton, Typography, Container, Grid, Card, CardContent, Divider, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import { CloudUpload as CloudUploadIcon, Email as EmailIcon, Badge as BadgeIcon, Male as MaleIcon, QueryBuilder as QueryBuilderIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getUserPosts } from "@/app/redux/postsSlice";
import { getUserData, uploadPhoto } from "@/app/redux/userSlice";
import { jwtDecode } from "jwt-decode";
import CreatePost from "../CreatePost/CreatePost";
import PostCard from "../PostCard/PostCard";
import Loading from "../../loading";
import { useEffect } from "react";

export default function Profile() {

  const dispatch = useDispatch();
  const { userPosts, isLoading } = useSelector((state) => state.posts);
  const { userData } = useSelector((state) => state.user);
  const { user } = jwtDecode(localStorage.getItem("token"));
  const joinedDate = new Date(userData?.createdAt).toDateString();


  function handlePhoto(e) {
    const formData = new FormData();
    formData.append("photo", e.target.files[0]);
    dispatch(uploadPhoto(formData));
  }

  // ================== Effects ==================
 useEffect(() => {
  if (user) {
    dispatch(getUserPosts(user));
    dispatch(getUserData());
  }
}, [user]);

  return (
    <>
      {/* ======================= PROFILE HEADER ======================= */}
      <Box
        sx={{
          maxWidth: "900px",
          mx: "auto",
          bgcolor: "#ffffff",
          borderRadius: 2,
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          overflow: "hidden",
          mb: 4,
        }}
      >
        {/* Cover */}
        <Box
          sx={{
            width: "100%",
            height: 230,
            background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
            position: "relative",
          }}
        >
          {/* Avatar */}
          <Avatar
            src={userData?.photo}
            alt={userData?.name}
            sx={{
              width: 140,
              height: 140,
              border: "5px solid #fff",
              position: "absolute",
              bottom: -70,
              left: 30,
            }}
          />

          {/* Upload Image */}
          <IconButton
            component="label"
            sx={{
              position: "absolute",
              bottom: 10,
              right: 20,
              bgcolor: "white",
              borderRadius: "50%",
              boxShadow: 2,
              "&:hover": { bgcolor: "#f3f4f6" },
            }}
          >
            <CloudUploadIcon sx={{ color: "#6b7280" }} />
            <input type="file" hidden accept="image/*" onChange={handlePhoto} />
          </IconButton>
        </Box>

        {/* Username */}
        <Box sx={{ p: 3, pt: 8 }}>
          <Typography variant="h5" fontWeight={600} sx={{ color: "#111827" }}>
            {userData?.name}
          </Typography>
        </Box>
      </Box>

      {/* ======================= PAGE CONTENT ======================= */}
      <Container sx={{ maxWidth: "900px !important", mx: "auto" }}>
        <Grid container spacing={3}>
          {/* ================= LEFT SIDE :: USER DETAILS ================= */}
          <Grid item size={{xs:12, md:5}}>
            <Card sx={{ borderRadius: 3, boxShadow: "0 1px 3px rgba(0,0,0,0.1)", bgcolor: "#ffffff" }}>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h6" fontWeight={600} mb={1} sx={{ color: "#111827" }}>
                  Personal Details
                </Typography>

                <Divider sx={{ mb: 2, borderColor: "#e5e7eb" }} />

                <List>
                  <ListItem>
                    <ListItemIcon>
                      <EmailIcon sx={{ color: "#6b7280" }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Email" 
                      secondary={userData?.email}
                      primaryTypographyProps={{ sx: { color: "#6b7280", fontSize: "0.875rem" } }}
                      secondaryTypographyProps={{ sx: { color: "#111827", fontWeight: 500 } }}
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemIcon>
                      <BadgeIcon sx={{ color: "#6b7280" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Birth of Date"
                      secondary={userData?.dateOfBirth}
                      primaryTypographyProps={{ sx: { color: "#6b7280", fontSize: "0.875rem" } }}
                      secondaryTypographyProps={{ sx: { color: "#111827", fontWeight: 500 } }}
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemIcon>
                      <MaleIcon sx={{ color: "#6b7280" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Gender"
                      secondary={userData?.gender}
                      primaryTypographyProps={{ sx: { color: "#6b7280", fontSize: "0.875rem" } }}
                      secondaryTypographyProps={{ sx: { color: "#111827", fontWeight: 500 } }}
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemIcon>
                      <QueryBuilderIcon sx={{ color: "#6b7280" }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Joined" 
                      secondary={joinedDate}
                      primaryTypographyProps={{ sx: { color: "#6b7280", fontSize: "0.875rem" } }}
                      secondaryTypographyProps={{ sx: { color: "#111827", fontWeight: 500 } }}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* ================= RIGHT SIDE :: POSTS ================= */}
          <Grid item size={{xs:12 , md:7}} sx={{mb:"100px"}}>
            <CreatePost />
            {isLoading ? (
              <Loading />
            ) : (
              userPosts?.map((post) => (
                <PostCard key={post._id} postInfo={post} />
              ))
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}