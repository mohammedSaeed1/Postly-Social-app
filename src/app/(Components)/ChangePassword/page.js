import ChangePassword from "./ChangePassword";

 export const metadata ={
  title: "Change Password",
  description : "User can change it's own password to another one.",
  keywords:['Change Password']
 }

export default function page() {
  return (
    <ChangePassword/>
  )
}
