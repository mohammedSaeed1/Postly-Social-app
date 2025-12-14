import Login from '@/app/Login/page.js';
export default function ProtectedRoute(props) {

const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
   
    if(token){  
     return  props.children ;
    } 
    else{
     return <Login/>
    }
}
