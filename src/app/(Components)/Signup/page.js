import Signup from './Signup';


 export const metadata = {
  title: "Register",
  description: "Create an account to start explore posts and discovering new content.",
  keywords: ['signup' , 'register']
 }

export default async function page() {
  return (
    <Signup/>
  )
}
