'use client';
import {Box,Avatar,Typography,Fade,TextField,IconButton} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { updateComment, deleteComment } from '../redux/commentsSlice';
import { useState } from "react";

export default function Comments({ currentUserId }) {

  const { allComments } = useSelector(state => state.comments);
  const dispatch = useDispatch();

  const [editingData, setEditingData] = useState({ id: null, text: "" });

  const startEditing = (comment) => {
    setEditingData({
      id: comment._id,
      text: comment.content
    });
  };

  const cancelEditing = () => {
    setEditingData({ id: null, text: "" });
  };

  const handleSave = () => {
    if (!editingData.text.trim()) return;

    dispatch(updateComment({
      commentId: editingData.id,
      content: editingData.text
    }));

    cancelEditing();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>

      {allComments?.map((comment) => {

        const isOwner = currentUserId === comment.commentCreator._id;
        const isEditing = editingData.id === comment._id;

        return (
          <Fade in timeout={400} key={comment._id}>
            <Box sx={{ display: "flex", gap: 1.5 }}>

              <Avatar
                src={comment.commentCreator?.photo}
                alt={comment.commentCreator?.name}
                sx={{ width: 40, height: 40 }}
              />

              <Box sx={{ flexGrow: 1 }}>

                {/* ---- Comment Bubble ---- */}
                <Box
                  sx={{
                    backgroundColor: "#f3f4f6",
                    borderRadius: "18px",
                    padding: "10px 14px",
                    maxWidth: "100%",
                    display: "inline-block"
                  }}
                >
                  {/* Name */}
                  <Typography sx={{ fontWeight: 600, fontSize: "14px", mb: "4px" }}>
                    {comment.commentCreator?.name}
                  </Typography>

                  {/* ---- Editing Mode ---- */}
                  {isEditing ? (
                    <TextField
                      autoFocus
                      fullWidth
                      multiline
                      maxRows={4}
                      variant="standard"
                      value={editingData.text}
                      onChange={(e) =>
                        setEditingData(prev => ({ ...prev, text: e.target.value }))
                      }
                      InputProps={{
                        disableUnderline: true,
                        style: {
                          fontSize: "14px",
                          lineHeight: "20px",
                          background: "#ffffff",
                          borderRadius: "8px",
                          padding: "8px 10px"
                        }
                      }}
                    />
                  ) : (
                    <Typography sx={{ fontSize: "14px", color: "#4b5563" }}>
                      {comment.content}
                    </Typography>
                  )}

                  {/* ---- Date Below comment ---- */}
                  <Typography
                    sx={{
                      fontSize: "11px",
                      color: "#6b7280",
                      mt: "6px"
                    }}
                  >
                    {comment.createdAt?.slice(0, 10)}
                  </Typography>

                </Box>

                {/* ---- Owner Actions ---- */}
                {isOwner && (
                  <Box sx={{ display: "flex", gap: 1, mt: 0.6, ml: 0.5 }}>
                    {!isEditing ? (
                      <>
                        <IconButton size="small" onClick={() => startEditing(comment)}>
                          <EditIcon sx={{ fontSize: "16px", color: "#6b7280" }} />
                        </IconButton>

                        <IconButton
                          size="small"
                          onClick={() => dispatch(deleteComment(comment._id))}
                        >
                          <DeleteIcon sx={{ fontSize: "16px", color: "#ef4444" }} />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <IconButton size="small" onClick={handleSave}>
                          <CheckIcon sx={{ fontSize: "18px", color: "#16a34a" }} />
                        </IconButton>

                        <IconButton size="small" onClick={cancelEditing}>
                          <CloseIcon sx={{ fontSize: "18px", color: "#dc2626" }} />
                        </IconButton>
                      </>
                    )}
                  </Box>
                )}

              </Box>

            </Box>
          </Fade>
        );
      })}
    </Box>
  );
}
