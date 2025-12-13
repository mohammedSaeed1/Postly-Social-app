"use client";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  MenuItem,
  TextField,
  Button,
  Box,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  Collapse,
  ListItemIcon,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { jwtDecode } from "jwt-decode";
import { deletePost, updatePost } from "@/app/redux/postsSlice";
import { useDispatch } from "react-redux";

export default function PostCard({ postInfo }) {
  const dispatch = useDispatch();
  const { user } = jwtDecode(localStorage.getItem("token"));
  const router = useRouter();

  function handlePost(id) {
    router.push(`/SinglePost/${id}`);
  }

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [hover, setHover] = useState(false);

  const handleToggle = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
    if (editMode) setEditMode(false);
  };
  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
  };

  function handleForm(e) {
    e.preventDefault();
    let formData = new FormData();
    if (e.target.body.value)
       formData.append("body", e.target.body.value);
    if (e.target.image.files[0])
      formData.append("image", e.target.image.files[0]);
    dispatch(updatePost({ postId: postInfo._id, formData: formData }));
  }

  return (
    <Card
      sx={{
        width: { sm: "100%" },
        mx: "auto",
        mb: 2,
        mt: 3,
        bgcolor: "#ffffff",
        borderRadius: "12px",
        border: "1px solid #e5e7eb",
        transition: "box-shadow 0.3s",
        boxShadow: hover
          ? "0 4px 12px rgba(0,0,0,0.15)"
          : "0 1px 3px rgba(0,0,0,0.1)",
      }}
      onMouseEnter={() => !isMobile && setHover(true)}
      onMouseLeave={() => !isMobile && setHover(false)}
    >
      <CardHeader
        avatar={
          <Avatar
            alt={postInfo?.user?.name}
            src={postInfo?.user?.photo}
          ></Avatar>
        }
        action={
          postInfo?.user._id === user && (
            <>
              <IconButton
                onClick={handleToggle}
                aria-label="settings"
                sx={{ color: "#6b7280", "&:hover": { bgcolor: "#f3f4f6" } }}
              >
                <MoreVertIcon />
              </IconButton>
            </>
          )
        }
        title={
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 600, color: "#111827" }}
          >
            {postInfo?.user?.name}
          </Typography>
        }
        subheader={
          <Typography variant="caption" sx={{ color: "#6b7280" }}>
            {postInfo?.createdAt.slice(0, 10)}
          </Typography>
        }
      />

      {/* Dropdown with icons */}
      <Popper
        open={open}
        anchorEl={anchorEl}
        transition
        placement={isMobile ? "bottom-start" : "bottom-end"}
        style={{ zIndex: 1300, width: isMobile ? "90vw" : "auto" }}
      >
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: isMobile ? "left top" : "right top" }}
          >
            <Paper
              sx={{
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                borderRadius: 2,
                width: isMobile ? "100%" : "auto",
                bgcolor: "#ffffff",
                border: "1px solid #e5e7eb",
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <Box sx={{ p: 1, minWidth: 250 }}>
                  <MenuItem
                    onClick={() => setEditMode((prev) => !prev)}
                    sx={{
                      borderRadius: 1,
                      color: "#111827",
                      "&:hover": { bgcolor: "#f3f4f6" },
                    }}
                  >
                    <ListItemIcon>
                      <EditIcon fontSize="small" sx={{ color: "#3b82f6" }} />
                    </ListItemIcon>
                    <Typography variant="inherit">Update</Typography>
                  </MenuItem>

                  <MenuItem
                    onClick={() => dispatch(deletePost(postInfo._id))}
                    sx={{
                      color: "#ef4444",
                      borderRadius: 1,
                      "&:hover": { bgcolor: "#fef2f2" },
                    }}
                  >
                    <ListItemIcon>
                      <DeleteIcon fontSize="small" sx={{ color: "#ef4444" }} />
                    </ListItemIcon>
                    <Typography variant="inherit">Delete</Typography>
                  </MenuItem>

                  <Collapse in={editMode}>
                    <Box
                      sx={{
                        mt: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                      }}
                    >
                      <form onSubmit={handleForm}>
                        {/* Text update */}
                        <TextField
                          name="body"
                          fullWidth
                          multiline
                          minRows={3}
                          placeholder="Edit your post..."
                          variant="outlined"
                          defaultValue={postInfo?.body}
                          sx={{
                            "& .MuiOutlinedInput-root": {
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
                            "& .MuiInputBase-input": {
                              color: "#111827",
                            },
                          }}
                        />

                        {/* Image update */}
                        <Button
                          variant="outlined"
                          component="label"
                          sx={{
                            textTransform: "none",
                            borderColor: "#e5e7eb",
                            color: "#6b7280",
                            "&:hover": {
                              borderColor: "#3b82f6",
                              color: "#3b82f6",
                              bgcolor: "#f3f4f6",
                            },
                          }}
                        >
                          Upload Image
                          <input
                            type="file"
                            name="image"
                            accept=".png , .jpg , jpeg"
                            hidden
                          />
                        </Button>

                        {/* Save button */}
                        <Button
                          variant="contained"
                          type="submit"
                          fullWidth
                          sx={{
                            bgcolor: "#3b82f6",
                            color: "#ffffff",
                            fontWeight: 600,
                            "&:hover": { bgcolor: "#2563eb" },
                          }}
                          onClick={handleClose}
                        >
                          Save
                        </Button>
                      </form>
                    </Box>
                  </Collapse>
                </Box>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>

      <CardContent>
        <Typography variant="body2" sx={{ color: "#4b5563", lineHeight: 1.6 }}>
          {postInfo?.body}
        </Typography>
      </CardContent>
      {postInfo?.image && (
        <CardMedia
          component="img"
          height="300px"
          width="100%"
          image={postInfo?.image}
          alt="Post image"
          sx={{ objectFit: "cover" }}
        />
      )}
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #f3f4f6",
          px: 2,
          py: 1,
        }}
      >
        <IconButton
          aria-label="like"
          sx={{
            display: "flex",
            alignItems: "center",
            color: "#6b7280",
            "&:hover": {
              bgcolor: "#f3f4f6",
              "& .MuiSvgIcon-root": { color: "#3b82f6" },
              "& .MuiTypography-root": { color: "#3b82f6" },
            },
          }}
        >
          <ThumbUpIcon sx={{ fontSize: 20 }} />
          <Typography variant="caption" sx={{ ml: "5px", fontWeight: 500 }}>
            Like
          </Typography>
        </IconButton>
        <IconButton
          onClick={() => {
            handlePost(postInfo._id);
          }}
          aria-label="comment"
          sx={{
            display: "flex",
            alignItems: "center",
            color: "#6b7280",
            "&:hover": {
              bgcolor: "#f3f4f6",
              "& .MuiSvgIcon-root": { color: "#3b82f6" },
              "& .MuiTypography-root": { color: "#3b82f6" },
            },
          }}
        >
          <CommentIcon sx={{ fontSize: 20 }} />
          <Typography variant="caption" sx={{ ml: "5px", fontWeight: 500 }}>
            Comment
          </Typography>
        </IconButton>
        <IconButton
          aria-label="share"
          sx={{
            display: "flex",
            alignItems: "center",
            color: "#6b7280",
            "&:hover": {
              bgcolor: "#f3f4f6",
              "& .MuiSvgIcon-root": { color: "#3b82f6" },
              "& .MuiTypography-root": { color: "#3b82f6" },
            },
          }}
        >
          <ShareIcon sx={{ fontSize: 20 }} />
          <Typography variant="caption" sx={{ ml: "5px", fontWeight: 500 }}>
            Share
          </Typography>
        </IconButton>
      </CardActions>

      {postInfo?.comments[0] && (
        <CardHeader
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: "#f9fafb",
            borderTop: "1px solid #e5e7eb",
          }}
          avatar={
            <Avatar
              alt={postInfo?.comments[0]?.commentCreator?.name}
              src={postInfo?.comments[0]?.commentCreator?.photo}
            ></Avatar>
          }
          title={
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 600, color: "#111827" }}
            >
              {postInfo?.comments[0]?.commentCreator?.name}
            </Typography>
          }
          subheader={
            <Typography variant="body2" sx={{ color: "#4b5563" }}>
              {postInfo?.comments[0]?.content}
            </Typography>
          }
        />
      )}
    </Card>
  );
}
