import Login from '@/app/(Components)/Login/page.js';
export default function ProtectedRoute(props) {

const token = localStorage.getItem("token");
   
    if(token){  
     return  props.children ;
    } 
    else{
     return <Login/>
    }
}
