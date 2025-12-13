import SinglePost from "./SinglePost";

export const metadata = {
  title: "Post",
  description: "Read this post and see comments, and related content on our social app.",
  keywords: ['social', 'posts', 'activity']
};

export default function page() {  
  return (
    <SinglePost/>
  )
}
