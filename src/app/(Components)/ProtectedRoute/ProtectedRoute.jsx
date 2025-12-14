"use client"
import { useRouter } from 'next/navigation';
export default function ProtectedRoute(props) {

    const router = useRouter();

const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
   
    if(token){  
     return  props.children ;
    } 
    else{
     return router.push('/Login');
    }
}
