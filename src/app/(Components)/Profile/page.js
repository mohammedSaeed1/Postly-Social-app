import Profile from "./Profile";

 export const metadata ={
  title: "Profile",
  description: "Explore user profile, posts, and activity across our social app—connect, follow, and stay engaged.",
  keywords: ['profile', 'social', 'posts', 'activity']
}

export default function page() {
  return (
    <Profile/>
  )
}
