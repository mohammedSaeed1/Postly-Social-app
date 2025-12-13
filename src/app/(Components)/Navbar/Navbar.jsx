"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { clearUserData, clearToken } from "@/app/redux/userSlice";
import { Avatar, Tooltip } from "@mui/material";
import { clearUserPosts } from "@/app/redux/postsSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { token, userData } = useSelector((state) => state.user);

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  function signOut() {
    localStorage.removeItem("token");
    dispatch(clearUserData());
    dispatch(clearToken());
    dispatch(clearUserPosts());
    router.push("/Login");
    setAnchorElUser(null);
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "#ffffff",
          color: "#111827",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            width: { xs: "90%", md: "55%" },
            margin: "auto",
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: "#3b82f6",
              fontWeight: 700,
              fontSize: "24px",
              "& a": {
                textDecoration: "none",
                color: "inherit",
              },
            }}
          >
            <Link href={"/"}>Postly</Link>
          </Typography>

          <Box sx={{ m: "10px", ml: "20px" }}>
            {token ? (
              <>
                <Link
                  href="/"
                  style={{
                    marginLeft: "30px",
                    color: "#6b7280",
                    textDecoration: "none",
                    fontWeight: 500,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#3b82f6")}
                  onMouseLeave={(e) => (e.target.style.color = "#6b7280")}
                >
                  Home
                </Link>
                <Link
                  href="/Profile"
                  style={{
                    marginLeft: "30px",
                    color: "#6b7280",
                    textDecoration: "none",
                    fontWeight: 500,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#3b82f6")}
                  onMouseLeave={(e) => (e.target.style.color = "#6b7280")}
                >
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/Login"
                  style={{
                    marginLeft: "30px",
                    color: "#6b7280",
                    textDecoration: "none",
                    fontWeight: 500,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#3b82f6")}
                  onMouseLeave={(e) => (e.target.style.color = "#6b7280")}
                >
                  Login
                </Link>
                <Link
                  href="/Signup"
                  style={{
                    marginLeft: "30px",
                    color: "#6b7280",
                    textDecoration: "none",
                    fontWeight: 500,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#3b82f6")}
                  onMouseLeave={(e) => (e.target.style.color = "#6b7280")}
                >
                  Signup
                </Link>
              </>
            )}
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {token && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{
                    p: 0,
                    "&:hover": {
                      opacity: 0.8,
                    },
                  }}
                >
                  <Avatar alt={userData?.name} src={userData?.photo} />
                </IconButton>
              </Tooltip>

              <Menu
                sx={{
                  mt: "45px",
                  "& .MuiPaper-root": {
                    bgcolor: "#ffffff",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  },
                }}
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  sx={{
                    color: "#111827",
                    "&:hover": {
                      bgcolor: "#f3f4f6",
                    },
                    "& a": {
                      textDecoration: "none",
                      color: "inherit",
                      width: "100%",
                      display: "block",
                    },
                  }}
                >
                  <Link href="/ChangePassword">Change Password</Link>
                </MenuItem>
                <MenuItem
                  onClick={signOut}
                  sx={{
                    color: "#ef4444",
                    fontWeight: 500,
                    "&:hover": {
                      bgcolor: "#fef2f2",
                    },
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
