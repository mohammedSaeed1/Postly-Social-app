"use client";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "./redux/postsSlice";
import { useEffect, useRef } from "react";
import Container from "@mui/material/Container";
import PostCard from "./PostCard/PostCard";
import { Grid } from "@mui/material";
import Loading from "./loading";
import CreatePost from "./CreatePost/CreatePost";
import { getUserData } from "./redux/userSlice";

export default function Home() {
  const dispatch = useDispatch();
  const { allPosts, isLoading, lastPage, currentPage } = useSelector(
    (state) => state.posts
  );

  const loaderRef = useRef(null);

  // First load: get user data and load last page
  useEffect(() => {    
    dispatch(getUserData());
    dispatch(getAllPosts(lastPage)); 
  }, [lastPage]);


  // Infinite Scroll Observer
  useEffect(() => {

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !isLoading) {
          const nextPage = currentPage - 1;

          if (nextPage >= 1) {
            dispatch(getAllPosts(nextPage));
          }
        }
      },
      { threshold: 1 }
    );

    const current = loaderRef.current;
    observer.observe(current);

    return () => observer.unobserve(current);
  }, [currentPage, isLoading]);

  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid sx={{ m: "10px auto" }} size={{ sm: 6 }}>
          <CreatePost lastPage={lastPage}/>

          {allPosts?.map((post) => (
            <PostCard postInfo={post} key={post._id} />
          ))}

          <div ref={loaderRef} style={{ height: "50px" }} />

          {isLoading && (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <Loading />
            </div>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
